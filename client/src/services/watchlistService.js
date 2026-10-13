import API from "./api";

export const getWatchlist = async () => {
    const res = await API.get("/watchlist");

    return res.data;
};

export const addWatchlist = async (stock) => {
    const res = await API.post("/watchlist", {
        symbol: stock.symbol,
        companyName: stock.name || stock.companyName
    });

    return res.data;
};

export const removeWatchlist = async (id) => {
    return API.delete(`/watchlist/${id}`);
};