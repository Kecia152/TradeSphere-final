import Transaction from "../models/Transaction.js";

import {
    getStockPrice
} from "../services/marketService.js";

import {
    generateAIInsight,
    generateAIChatResponse
} from "../services/aiService.js";


const buildPortfolio = async (userId) => {

    const transactions =
        await Transaction.find({
            user: userId
        }).sort({
            createdAt: 1
        });


    const holdings = {};


    transactions.forEach((item) => {

        const symbol = item.symbol;


        if (!holdings[symbol]) {

            holdings[symbol] = {

                symbol,

                companyName:
                    item.companyName || symbol,

                quantity: 0,

                invested: 0
            };

        }


        if (item.type === "BUY") {

            const quantity =
                Number(item.quantity);

            const price =
                Number(item.price);


            holdings[symbol].quantity +=
                quantity;

            holdings[symbol].invested +=
                quantity * price;

        }


        if (item.type === "SELL") {

            const soldQuantity =
                Number(item.quantity);

            const currentQuantity =
                holdings[symbol].quantity;


            const averageCost =
                currentQuantity > 0

                    ? holdings[symbol].invested /
                      currentQuantity

                    : 0;


            holdings[symbol].quantity -=
                soldQuantity;

            holdings[symbol].invested -=
                averageCost * soldQuantity;


            if (
                holdings[symbol].quantity <= 0
            ) {

                holdings[symbol].quantity = 0;

                holdings[symbol].invested = 0;

            }

        }

    });


    const activeHoldings =
        Object.values(holdings).filter(
            stock => stock.quantity > 0
        );


    const portfolio =
        await Promise.all(

            activeHoldings.map(
                async (stock) => {

                    const buyPrice =
                        stock.quantity > 0

                            ? stock.invested /
                              stock.quantity

                            : 0;


                    let currentPrice =
                        buyPrice;

                    let todayChange = 0;


                    try {

                        const live =
                            await getStockPrice(
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

                    } catch (error) {

                        console.log(
                            `Unable to fetch AI price for ${stock.symbol}:`,
                            error.message
                        );

                    }


                    const currentValue =
                        currentPrice *
                        stock.quantity;


                    const profitLoss =
                        currentValue -
                        stock.invested;


                    const profitLossPercent =
                        stock.invested > 0

                            ? (
                                profitLoss /
                                stock.invested
                            ) * 100

                            : 0;


                    const todayProfitLoss =
                        todayChange *
                        stock.quantity;


                    return {

                        symbol:
                            stock.symbol,

                        companyName:
                            stock.companyName,

                        quantity:
                            stock.quantity,

                        buyPrice,

                        currentPrice,

                        currentValue,

                        profitLoss,

                        profitLossPercent,

                        todayProfitLoss

                    };

                }
            )

        );


    return portfolio;

};


export const getAIInsight =
    async (req, res) => {

        try {

            const portfolio =
                await buildPortfolio(
                    req.user.id
                );


            const insight =
                await generateAIInsight(
                    portfolio
                );


            res.status(200).json({

                insight

            });


        } catch (error) {

            console.error(
                "AI insight error:",
                error
            );


            res.status(500).json({

                message:
                    "Unable to generate AI insight."

            });

        }

    };


export const chatWithAI =
    async (req, res) => {

        try {

            const {
                message
            } = req.body;


            if (
                !message ||
                !message.trim()
            ) {

                return res.status(400).json({

                    message:
                        "Message required"

                });

            }


            const portfolio =
                await buildPortfolio(
                    req.user.id
                );


            const answer =
                await generateAIChatResponse(
                    message,
                    portfolio
                );


            res.status(200).json({

                answer

            });


        } catch (error) {

            console.error(
                "AI chat error:",
                error
            );


            res.status(500).json({

                message:
                    "Unable to answer right now."

            });

        }

    };