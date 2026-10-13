import React, { useEffect, useState } from "react";

import {
    Line
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from "chart.js";

import API from "../services/api";


ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);


function StockChart({ symbol = "TCS" }) {

    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        let mounted = true;


        const fetchHistory = async () => {

            try {

                setLoading(true);
                setError("");
                setHistory([]);


                const response =
                    await API.get(
                        `/market/history/${symbol}`
                    );


                const data =
                    response.data?.data || [];


                if (!data.length) {

                    throw new Error(
                        "No historical data available"
                    );

                }


                /*
                 * Keep the chart readable by showing
                 * the latest 30 trading sessions.
                 *
                 * The backend still receives real
                 * historical data from Yahoo Finance.
                 */

                const latestData =
                    data.slice(-30);


                if (mounted) {

                    setHistory(latestData);

                }

            }

            catch (error) {

                console.error(
                    "Stock chart error:",
                    error
                );


                if (mounted) {

                    setHistory([]);

                    setError(
                        "Unable to load market data."
                    );

                }

            }

            finally {

                if (mounted) {

                    setLoading(false);

                }

            }

        };


        fetchHistory();


        return () => {

            mounted = false;

        };


    }, [symbol]);


    const chartData = {

        labels: history.map((item) => {

            const date =
                new Date(item.time);

            return date.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short"
                }
            );

        }),


        datasets: [

            {

                label: `${symbol} Price`,

                data: history.map(
                    (item) => item.close
                ),

                borderWidth: 2,

                borderColor: "#FFFFFF",

                pointBackgroundColor: "#FFFFFF",

                tension: 0.3

            }

        ]

    };


    return (

        <div
            style={{
                background: "#111827",
                padding: "25px",
                borderRadius: "18px",
                marginTop: "25px"
            }}
        >

            <h3>
                {symbol} Price History
            </h3>


            {loading && (

                <p>
                    Loading chart...
                </p>

            )}


            {!loading && error && (

                <p
                    style={{
                        color: "#EF4444"
                    }}
                >
                    {error}
                </p>

            )}


            {!loading &&
                !error &&
                history.length > 0 && (

                    <Line
                        data={chartData}
                        options={{
                            responsive: true,

                            maintainAspectRatio: true,

                            plugins: {
                                legend: {
                                    display: true
                                }
                            },

                            scales: {

                                x: {
                                    ticks: {
                                        color: "#94A3B8"
                                    }
                                },

                                y: {
                                    ticks: {
                                        color: "#94A3B8"
                                    }
                                }

                            }
                        }}
                    />

                )}

        </div>

    );

}


export default StockChart;