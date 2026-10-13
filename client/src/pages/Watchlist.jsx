import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import API from "../services/api";

import {
    getWatchlist,
    addWatchlist,
    removeWatchlist
} from "../services/watchlistService";

import {
    addNotificationIfEnabled
} from "../services/notificationService";


function Watchlist() {

    const [query, setQuery] = useState("");

    const [results, setResults] = useState([]);

    const [watchlist, setWatchlist] = useState([]);


    useEffect(() => {

        const loadWatchlist = async () => {

            try {

                const response = await getWatchlist();

                setWatchlist(
                    response.watchlist || []
                );

            } catch (error) {

                console.log(
                    "Unable to load watchlist:",
                    error
                );

            }

        };


        loadWatchlist();

    }, []);


    const searchStocks = async () => {

        if (!query) {

            setResults([]);

            return;

        }


        try {

            const response =
                await API.get(
                    `/market/search/${query}`
                );


            setResults(
                response.data.stocks || []
            );


        } catch (error) {

            console.log(error);

        }

    };


    const addStock = async (stock) => {

        const exists =
            watchlist.find(
                item =>
                    item.symbol === stock.symbol
            );


        if (exists) {

            return;

        }


        try {

            const response =
                await addWatchlist(stock);


            setWatchlist([
                ...watchlist,
                response
            ]);


            // Create notification after successful add
            addNotificationIfEnabled({
                setting: "portfolioUpdates",
                title: "Added to Watchlist",
                message:
                    `${stock.symbol} was added to your watchlist.`,
                type: "watchlist"
            });


        } catch (error) {

            console.log(
                "Unable to add stock:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Unable to add stock."
            );

        }

    };


    const removeStock = async (id) => {

        // Find the stock before removing it
        const stock =
            watchlist.find(
                item =>
                    item._id === id
            );


        try {

            await removeWatchlist(id);


            setWatchlist(
                watchlist.filter(
                    item =>
                        item._id !== id
                )
            );


            // Create notification after successful removal
            if (stock) {

                addNotificationIfEnabled({
                    setting: "portfolioUpdates",
                    title: "Removed from Watchlist",
                    message:
                        `${stock.symbol} was removed from your watchlist.`,
                    type: "watchlist"
                });

            }


        } catch (error) {

            console.log(
                "Unable to remove stock:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Unable to remove stock."
            );

        }

    };


    return (

        <DashboardLayout>


            <h1
                style={{
                    fontSize: "34px"
                }}
            >

                Watchlist

            </h1>


            <p
                style={{
                    color: "#94A3B8",
                    marginBottom: "25px"
                }}
            >

                Track your favourite stocks.

            </p>


            <div
                style={{
                    display: "flex",
                    gap: "15px"
                }}
            >

                <input
                    placeholder="Search stocks to add..."
                    value={query}
                    onChange={(e) =>
                        setQuery(e.target.value)
                    }
                    style={{
                        flex: 1,
                        padding: "15px",
                        background: "#111827",
                        color: "white",
                        border:
                            "1px solid #334155",
                        borderRadius: "10px"
                    }}
                />


                <button
                    onClick={searchStocks}
                    style={{
                        background: "#2563EB",
                        color: "white",
                        padding: "15px 25px",
                        border: "none",
                        borderRadius: "10px"
                    }}
                >

                    Search

                </button>

            </div>


            <h2
                style={{
                    marginTop: "35px"
                }}
            >

                Search Results

            </h2>


            {

                results.map(stock => (

                    <div
                        key={stock.symbol}
                        style={{
                            background: "#111827",
                            padding: "20px",
                            borderRadius: "15px",
                            marginBottom: "15px",
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >

                        <div>

                            <h3>
                                {stock.symbol}
                            </h3>


                            <p
                                style={{
                                    color: "#94A3B8"
                                }}
                            >

                                {stock.name}

                            </p>

                        </div>


                        <button
                            onClick={() =>
                                addStock(stock)
                            }
                            style={{
                                background: "#22C55E",
                                color: "white",
                                border: "none",
                                borderRadius: "10px",
                                padding: "10px 20px"
                            }}
                        >

                            Add

                        </button>

                    </div>

                ))

            }


            <h2
                style={{
                    marginTop: "40px"
                }}
            >

                My Watchlist

            </h2>


            {

                watchlist.map(stock => (

                    <div
                        key={stock._id}
                        style={{
                            background: "#111827",
                            padding: "20px",
                            borderRadius: "15px",
                            marginBottom: "15px",
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >

                        <div>

                            <h3>
                                {stock.symbol}
                            </h3>


                            <p>
                                {stock.companyName}
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                removeStock(stock._id)
                            }
                            style={{
                                background: "#EF4444",
                                color: "white",
                                border: "none",
                                borderRadius: "10px"
                            }}
                        >

                            Remove

                        </button>

                    </div>

                ))

            }


        </DashboardLayout>

    );

}


export default Watchlist;