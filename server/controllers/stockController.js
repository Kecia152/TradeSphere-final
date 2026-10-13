import Stock from "../models/Stock.js";
import Transaction from "../models/Transaction.js";
import { getStockPrice } from "../services/marketService.js";

export const addStock = async (req, res) => {
    try {
        const {
            symbol,
            companyName,
            quantity,
            buyPrice
        } = req.body;

        const stock = await Stock.create({
            user: req.user.id,
            symbol,
            companyName,
            quantity,
            buyPrice,
            currentPrice: buyPrice
        });

        await Transaction.create({
            user: req.user.id,
            stock: stock._id,
            type: "BUY",
            symbol,
            companyName,
            quantity,
            price: buyPrice
        });

        res.status(201).json({
            message: "Stock added successfully",
            stock
        });

    } catch (error) {
        console.error("Add stock error:", error);

        res.status(500).json({
            message: error.message
        });
    }
};

export const getStocks = async (req, res) => {
    try {
        const stocks = await Stock.find({
            user: req.user.id
        });

        res.status(200).json(stocks);

    } catch (error) {
        console.error("Get stocks error:", error);

        res.status(500).json({
            message: error.message
        });
    }
};

export const deleteStock = async (req, res) => {
    try {
        const stock = await Stock.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!stock) {
            return res.status(404).json({
                message: "Stock not found"
            });
        }

        await stock.deleteOne();

        res.status(200).json({
            message: "Stock deleted successfully"
        });

    } catch (error) {
        console.error("Delete stock error:", error);

        res.status(500).json({
            message: error.message
        });
    }
};

export const sellStock = async (req, res) => {
    try {
        const quantity = Number(req.body.quantity);

        if (
            !Number.isFinite(quantity) ||
            quantity <= 0 ||
            !Number.isInteger(quantity)
        ) {
            return res.status(400).json({
                message: "Quantity must be a positive whole number"
            });
        }

        const stock = await Stock.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!stock) {
            return res.status(404).json({
                message: "Stock not found"
            });
        }

        if (quantity > stock.quantity) {
            return res.status(400).json({
                message: "Insufficient quantity"
            });
        }

        /*
         * Fetch the current market price at the
         * moment of selling.
         */
        let sellPrice = Number(stock.currentPrice);

        try {
            const liveStock = await getStockPrice(stock.symbol);

            if (
                liveStock &&
                Number.isFinite(Number(liveStock.price))
            ) {
                sellPrice = Number(liveStock.price);
            }
        } catch (priceError) {
            console.log(
                `Unable to fetch live sell price for ${stock.symbol}:`,
                priceError.message
            );
        }

        /*
         * Record the SELL transaction before
         * potentially deleting the holding.
         */
        await Transaction.create({
            user: req.user.id,
            stock: stock._id,
            type: "SELL",
            symbol: stock.symbol,
            companyName: stock.companyName,
            quantity,
            price: sellPrice
        });

        const remainingQuantity =
            stock.quantity - quantity;

        /*
         * If the user sold everything,
         * remove the holding completely.
         */
        if (remainingQuantity === 0) {
            await stock.deleteOne();

            return res.status(200).json({
                message: "Stock sold successfully",
                soldQuantity: quantity,
                remainingQuantity: 0,
                sellPrice
            });
        }

        /*
         * Otherwise update the remaining holding.
         */
        stock.quantity = remainingQuantity;
        stock.currentPrice = sellPrice;

        await stock.save();

        res.status(200).json({
            message: "Stock sold successfully",
            stock,
            soldQuantity: quantity,
            remainingQuantity,
            sellPrice
        });

    } catch (error) {
        console.error("Sell stock error:", error);

        res.status(500).json({
            message: error.message
        });
    }
};