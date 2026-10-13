import Transaction from "../models/Transaction.js";
import { getStockPrice } from "../services/marketService.js";

export const getPortfolio = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user.id
        }).sort({ createdAt: 1 });

        const holdings = {};

        let totalRealizedProfitLoss = 0;
        let totalTodayProfitLoss = 0;

        transactions.forEach((item) => {
            const symbol = item.symbol;

            if (!holdings[symbol]) {
                holdings[symbol] = {
                    symbol,
                    companyName: item.companyName || symbol,
                    quantity: 0,
                    invested: 0,
                    realizedProfitLoss: 0
                };
            }

            if (item.type === "BUY") {
                const quantity = Number(item.quantity);
                const price = Number(item.price);

                holdings[symbol].quantity += quantity;

                holdings[symbol].invested +=
                    quantity * price;
            }

            if (item.type === "SELL") {
                const soldQuantity = Number(item.quantity);
                const sellPrice = Number(item.price);

                const currentQuantity =
                    holdings[symbol].quantity;

                const averageCost =
                    currentQuantity > 0
                        ? holdings[symbol].invested /
                          currentQuantity
                        : 0;

                const costOfSoldShares =
                    averageCost * soldQuantity;

                const saleValue =
                    sellPrice * soldQuantity;

                const realizedProfitLoss =
                    saleValue - costOfSoldShares;

                holdings[symbol].realizedProfitLoss +=
                    realizedProfitLoss;

                totalRealizedProfitLoss +=
                    realizedProfitLoss;

                holdings[symbol].quantity -=
                    soldQuantity;

                holdings[symbol].invested -=
                    costOfSoldShares;

                if (holdings[symbol].quantity <= 0) {
                    holdings[symbol].quantity = 0;
                    holdings[symbol].invested = 0;
                }
            }
        });

        const activeHoldings = Object.values(
            holdings
        ).filter(
            (stock) => stock.quantity > 0
        );

        const portfolio = await Promise.all(
            activeHoldings.map(async (stock) => {
                const averageBuyPrice =
                    stock.quantity > 0
                        ? stock.invested /
                          stock.quantity
                        : 0;

                let currentPrice =
                    averageBuyPrice;

                let todayChange = 0;
                let todayChangePercent = 0;

                try {
                    const live = await getStockPrice(
                        stock.symbol
                    );

                    if (
                        live &&
                        Number.isFinite(
                            Number(live.price)
                        )
                    ) {
                        currentPrice =
                            Number(live.price);
                    }

                    if (
                        live &&
                        Number.isFinite(
                            Number(live.change)
                        )
                    ) {
                        todayChange =
                            Number(live.change);
                    }

                    if (live?.percent !== undefined) {
                        todayChangePercent =
                            parseFloat(
                                String(
                                    live.percent
                                ).replace("%", "")
                            ) || 0;
                    }
                } catch (error) {
                    console.log(
                        `Live price unavailable for ${stock.symbol}:`,
                        error.message
                    );
                }

                const currentValue =
                    currentPrice *
                    stock.quantity;

                const unrealizedProfitLoss =
                    currentValue -
                    stock.invested;

                const profitLoss =
                    unrealizedProfitLoss +
                    stock.realizedProfitLoss;

                const profitLossPercent =
                    stock.invested > 0
                        ? (unrealizedProfitLoss /
                              stock.invested) *
                          100
                        : 0;

                const todayProfitLoss =
                    todayChange *
                    stock.quantity;

                totalTodayProfitLoss +=
                    todayProfitLoss;

                return {
                    symbol: stock.symbol,
                    companyName: stock.companyName,

                    quantity: stock.quantity,

                    invested: stock.invested,

                    buyPrice: averageBuyPrice,

                    currentPrice,
                    currentValue,

                    realizedProfitLoss:
                        stock.realizedProfitLoss,

                    unrealizedProfitLoss,

                    profitLoss,
                    profitLossPercent,

                    todayChange,
                    todayChangePercent,
                    todayProfitLoss
                };
            })
        );

        const totalInvested = portfolio.reduce(
            (total, stock) =>
                total + Number(stock.invested),
            0
        );

        const totalCurrentValue = portfolio.reduce(
            (total, stock) =>
                total + Number(stock.currentValue),
            0
        );

        const totalUnrealizedProfitLoss =
            portfolio.reduce(
                (total, stock) =>
                    total +
                    Number(
                        stock.unrealizedProfitLoss
                    ),
                0
            );

        const totalProfitLoss =
            totalRealizedProfitLoss +
            totalUnrealizedProfitLoss;

        res.set("Cache-Control", "no-store");

        res.status(200).json({
            success: true,

            portfolio,

            summary: {
                totalInvested,
                totalCurrentValue,

                totalRealizedProfitLoss,
                totalUnrealizedProfitLoss,

                totalProfitLoss,
                totalTodayProfitLoss
            }
        });
    } catch (error) {
        console.error(
            "Portfolio error:",
            error
        );

        res.status(500).json({
            message: error.message
        });
    }
};