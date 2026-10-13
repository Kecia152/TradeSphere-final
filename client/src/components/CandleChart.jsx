import React, {
    useEffect,
    useRef,
    useState
} from "react";

import {
    createChart,
    CandlestickSeries
} from "lightweight-charts";

import API from "../services/api";


function CandleChart({ symbol = "TCS" }) {

    const chartRef = useRef(null);

    const chartInstance = useRef(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        let mounted = true;


        const loadChart = async () => {

            try {

                setLoading(true);
                setError("");


                const response = await API.get(
                    `/market/history/${symbol}`
                );


                const data =
                    response.data?.data || [];


                if (!data.length) {

                    throw new Error(
                        "No historical data available"
                    );

                }


                if (!mounted) return;


                if (!chartRef.current) {

                    throw new Error(
                        "Chart container is not available"
                    );

                }


                if (chartInstance.current) {

                    chartInstance.current.remove();

                    chartInstance.current = null;

                }


                const chart = createChart(
                    chartRef.current,
                    {
                        width: 700,
                        height: 400,

                        layout: {
                            background: {
                                color: "#111827"
                            },

                            textColor: "#94A3B8"
                        },

                        grid: {
                            vertLines: {
                                color: "#1E293B"
                            },

                            horzLines: {
                                color: "#1E293B"
                            }
                        }
                    }
                );


                chartInstance.current = chart;


                const candleSeries =
                    chart.addSeries(
                        CandlestickSeries
                    );


                const latestData =
                    data.slice(-60);


                const candles = latestData
                    .map((item) => {

                        const date =
                            new Date(item.time);


                        return {

                            time: date
                                .toISOString()
                                .split("T")[0],

                            open: Number(item.open),

                            high: Number(item.high),

                            low: Number(item.low),

                            close: Number(item.close)

                        };

                    });


                candleSeries.setData(candles);


                chart.timeScale()
                    .fitContent();


                if (mounted) {

                    setLoading(false);

                }

            }

            catch (error) {

                console.error(
                    "Candle chart error:",
                    error
                );


                if (mounted) {

                    setError(
                        "Unable to load market data."
                    );

                    setLoading(false);

                }

            }

        };


        loadChart();


        return () => {

            mounted = false;


            if (chartInstance.current) {

                chartInstance.current.remove();

                chartInstance.current = null;

            }

        };

    }, [symbol]);


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
                {symbol} Candlestick Chart
            </h3>


            <div
                ref={chartRef}
                style={{
                    marginTop: "20px",
                    display:
                        loading || error
                            ? "none"
                            : "block"
                }}
            />


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

        </div>

    );

}


export default CandleChart;