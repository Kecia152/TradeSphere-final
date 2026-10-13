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

function Dashboard() {
    const [portfolio, setPortfolio] = useState([]);
    const [summary, setSummary] = useState({
        totalInvested: 0,
        totalCurrentValue: 0,
        totalProfitLoss: 0,
        totalTodayProfitLoss: 0
    });

    const [loading, setLoading] = useState(true);
    const [priceFlash, setPriceFlash] = useState(false);

    const fetchDashboard = async (
        initialLoad = false
    ) => {
        try {
            if (initialLoad) {
                setLoading(true);
            }

            const response = await API.get(
                `/portfolio?_t=${Date.now()}`
            );

            const updatedPortfolio =
                response.data.portfolio || [];

            const updatedSummary =
                response.data.summary || {};

            setPortfolio((previousPortfolio) => {
                const changed =
                    updatedPortfolio.some(
                        (stock) => {
                            const previous =
                                previousPortfolio.find(
                                    (item) =>
                                        item.symbol ===
                                        stock.symbol
                                );

                            return (
                                previous &&
                                Number(
                                    previous.currentPrice
                                ) !==
                                    Number(
                                        stock.currentPrice
                                    )
                            );
                        }
                    );

                if (changed) {
                    setPriceFlash(true);

                    setTimeout(() => {
                        setPriceFlash(false);
                    }, 700);
                }

                return updatedPortfolio;
            });

            setSummary({
                totalInvested:
                    Number(
                        updatedSummary.totalInvested
                    ) || 0,

                totalCurrentValue:
                    Number(
                        updatedSummary.totalCurrentValue
                    ) || 0,

                totalProfitLoss:
                    Number(
                        updatedSummary.totalProfitLoss
                    ) || 0,

                totalTodayProfitLoss:
                    Number(
                        updatedSummary.totalTodayProfitLoss
                    ) || 0
            });

        } catch (error) {
            console.log(
                "Unable to fetch dashboard:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard(true);

        const interval = setInterval(() => {
            fetchDashboard(false);
        }, 15000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const totalInvestment =
        Number(summary.totalInvested) || 0;

    const currentValue =
        Number(summary.totalCurrentValue) || 0;

    const profitLoss =
        Number(summary.totalProfitLoss) || 0;

    const todayPnL =
        Number(summary.totalTodayProfitLoss) || 0;

    return (
        <DashboardLayout>
            <h1
                style={{
                    fontSize: "34px",
                    marginBottom: "10px"
                }}
            >
                Dashboard
            </h1>

            <p
                style={{
                    color: "#94A3B8",
                    marginBottom: "30px"
                }}
            >
                Welcome back to TradeSphere.
            </p>

            {loading ? (
                <h3>
                    Loading dashboard...
                </h3>
            ) : (
                <>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(3,1fr)",
                            gap: "20px"
                        }}
                    >
                        <div
                            style={{
                                background: "#111827",
                                padding: "25px",
                                borderRadius: "18px",
                                border:
                                    "1px solid #1E293B"
                            }}
                        >
                            <p>
                                Invested Amount
                            </p>

                            <h2>
                                ₹
                                {totalInvestment.toFixed(
                                    2
                                )}
                            </h2>
                        </div>

                        <div
                            style={{
                                background: "#111827",
                                padding: "25px",
                                borderRadius: "18px",
                                border:
                                    "1px solid #1E293B",
                                opacity:
                                    priceFlash
                                        ? 0.5
                                        : 1,
                                transition:
                                    "opacity 0.15s ease"
                            }}
                        >
                            <p>
                                Current Value
                            </p>

                            <h2>
                                ₹
                                {currentValue.toFixed(
                                    2
                                )}
                            </h2>
                        </div>

                        <div
                            style={{
                                background: "#111827",
                                padding: "25px",
                                borderRadius: "18px",
                                border:
                                    "1px solid #1E293B",
                                opacity:
                                    priceFlash
                                        ? 0.5
                                        : 1,
                                transition:
                                    "opacity 0.15s ease"
                            }}
                        >
                            <p>
                                Profit / Loss
                            </p>

                            <h2
                                style={{
                                    color:
                                        profitLoss > 0
                                            ? "#22C55E"
                                            : profitLoss < 0
                                            ? "#EF4444"
                                            : "#94A3B8"
                                }}
                            >
                                {formatPnL(
                                    profitLoss
                                )}
                            </h2>

                            <p
                                style={{
                                    marginTop: "6px",
                                    marginBottom: 0,
                                    fontSize: "13px",
                                    color:
                                        todayPnL > 0
                                            ? "#22C55E"
                                            : todayPnL < 0
                                            ? "#EF4444"
                                            : "#94A3B8",
                                    fontWeight: "600"
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
                            marginTop: "30px",
                            background: "#111827",
                            padding: "25px",
                            borderRadius: "18px"
                        }}
                    >
                        <h2>
                            Your Holdings
                        </h2>

                        {portfolio.length ===
                        0 ? (
                            <p
                                style={{
                                    color: "#94A3B8"
                                }}
                            >
                                No stocks purchased yet.
                            </p>
                        ) : (
                            portfolio.map(
                                (stock) => (
                                    <div
                                        key={
                                            stock.symbol
                                        }
                                        style={{
                                            display:
                                                "flex",
                                            justifyContent:
                                                "space-between",
                                            padding:
                                                "15px 0",
                                            borderBottom:
                                                "1px solid #1E293B"
                                        }}
                                    >
                                        <span>
                                            {
                                                stock.symbol
                                            }
                                        </span>

                                        <span
                                            style={{
                                                opacity:
                                                    priceFlash
                                                        ? 0.5
                                                        : 1,
                                                transition:
                                                    "opacity 0.15s ease"
                                            }}
                                        >
                                            ₹
                                            {Number(
                                                stock.currentValue
                                            ).toFixed(
                                                2
                                            )}
                                        </span>
                                    </div>
                                )
                            )
                        )}
                    </div>
                </>
            )}
        </DashboardLayout>
    );
}

export default Dashboard;