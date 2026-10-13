import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import API from "../services/api";

const formatPnL = (value) => {
    const number = Number(value);

    if (!Number.isFinite(number) || number === 0) {
        return "—";
    }

    return number > 0
        ? `+₹${number.toFixed(2)}`
        : `-₹${Math.abs(number).toFixed(2)}`;
};

function Portfolio() {
    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(true);
    const [priceFlash, setPriceFlash] = useState({});

    const fetchPortfolio = async (initialLoad = false) => {
        try {
            if (initialLoad) {
                setLoading(true);
            }

            const response = await API.get(
                `/portfolio?_t=${Date.now()}`
            );

            const updatedPortfolio =
                response.data.portfolio || [];

            setPortfolio((previousPortfolio) => {
                const flashes = {};

                updatedPortfolio.forEach(
                    (stock) => {
                        const previous =
                            previousPortfolio.find(
                                (item) =>
                                    item.symbol ===
                                    stock.symbol
                            );

                        if (
                            previous &&
                            Number(
                                previous.currentPrice
                            ) !==
                                Number(
                                    stock.currentPrice
                                )
                        ) {
                            flashes[
                                stock.symbol
                            ] =
                                Number(
                                    stock.currentPrice
                                ) >
                                Number(
                                    previous.currentPrice
                                )
                                    ? "up"
                                    : "down";
                        }
                    }
                );

                if (
                    Object.keys(flashes).length > 0
                ) {
                    setPriceFlash(flashes);

                    setTimeout(() => {
                        setPriceFlash({});
                    }, 700);
                }

                return updatedPortfolio;
            });
        } catch (error) {
            console.log(
                "Unable to fetch portfolio:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPortfolio(true);

        const interval = setInterval(() => {
            fetchPortfolio(false);
        }, 15000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <DashboardLayout>
            <h1
                style={{
                    fontSize: "34px",
                    marginBottom: "10px"
                }}
            >
                Portfolio
            </h1>

            <p
                style={{
                    color: "#94A3B8",
                    marginBottom: "30px"
                }}
            >
                Track your investments and profit/loss.
            </p>

            {loading ? (
                <h3>
                    Loading portfolio...
                </h3>
            ) : portfolio.length === 0 ? (
                <div
                    style={{
                        background: "#111827",
                        padding: "40px",
                        borderRadius: "18px",
                        border:
                            "1px solid #1E293B",
                        textAlign: "center"
                    }}
                >
                    <h2>
                        No Holdings Found
                    </h2>

                    <p
                        style={{
                            color: "#94A3B8"
                        }}
                    >
                        Buy stocks to see your portfolio here.
                    </p>
                </div>
            ) : (
                portfolio.map((stock) => {
                    const flash =
                        priceFlash[
                            stock.symbol
                        ];

                    const todayPnL =
                        Number(
                            stock.todayProfitLoss
                        );

                    const todayPositive =
                        todayPnL > 0;

                    return (
                        <div
                            key={stock.symbol}
                            style={{
                                background: "#111827",
                                padding: "25px",
                                borderRadius: "18px",
                                marginBottom: "20px",
                                border:
                                    "1px solid #1E293B"
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <div>
                                    <h2>
                                        {stock.symbol}
                                    </h2>

                                    <p
                                        style={{
                                            color: "#94A3B8"
                                        }}
                                    >
                                        {
                                            stock.companyName
                                        }
                                    </p>
                                </div>

                                <div
                                    style={{
                                        textAlign:
                                            "right",
                                        opacity:
                                            flash
                                                ? 0.35
                                                : 1,
                                        transition:
                                            "opacity 0.15s ease"
                                    }}
                                >
                                    <p
                                        style={{
                                            margin: 0,
                                            color: "#94A3B8",
                                            fontSize:
                                                "13px"
                                        }}
                                    >
                                        P&L
                                    </p>

                                    <h2
                                        style={{
                                            margin: 0,
                                            color:
                                                Number(
                                                    stock.profitLoss
                                                ) >= 0
                                                    ? "#22C55E"
                                                    : "#EF4444"
                                        }}
                                    >
                                        {formatPnL(
                                            stock.profitLoss
                                        )}
                                    </h2>

                                    <p
                                        style={{
                                            margin:
                                                "4px 0 0",
                                            color:
                                                todayPositive
                                                    ? "#22C55E"
                                                    : todayPnL < 0
                                                    ? "#EF4444"
                                                    : "#94A3B8",
                                            fontSize:
                                                "13px",
                                            fontWeight:
                                                "600"
                                        }}
                                    >
                                        Today{" "}
                                        {formatPnL(
                                            todayPnL
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "repeat(4,1fr)",
                                    gap: "20px",
                                    marginTop: "25px"
                                }}
                            >
                                <div>
                                    <p
                                        style={{
                                            color: "#94A3B8"
                                        }}
                                    >
                                        Quantity
                                    </p>

                                    <h3>
                                        {
                                            stock.quantity
                                        }
                                    </h3>
                                </div>

                                <div>
                                    <p
                                        style={{
                                            color: "#94A3B8"
                                        }}
                                    >
                                        Avg Buy Price
                                    </p>

                                    <h3>
                                        ₹
                                        {Number(
                                            stock.buyPrice
                                        ).toFixed(2)}
                                    </h3>
                                </div>

                                <div
                                    style={{
                                        opacity:
                                            flash
                                                ? 0.35
                                                : 1,
                                        transition:
                                            "opacity 0.15s ease"
                                    }}
                                >
                                    <p
                                        style={{
                                            color: "#94A3B8"
                                        }}
                                    >
                                        Current Price
                                    </p>

                                    <h3>
                                        ₹
                                        {Number(
                                            stock.currentPrice
                                        ).toFixed(2)}
                                    </h3>
                                </div>

                                <div
                                    style={{
                                        opacity:
                                            flash
                                                ? 0.35
                                                : 1,
                                        transition:
                                            "opacity 0.15s ease"
                                    }}
                                >
                                    <p
                                        style={{
                                            color: "#94A3B8"
                                        }}
                                    >
                                        Current Value
                                    </p>

                                    <h3>
                                        ₹
                                        {Number(
                                            stock.currentValue
                                        ).toFixed(2)}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </DashboardLayout>
    );
}

export default Portfolio;