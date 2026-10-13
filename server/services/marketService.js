import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();


// Convert Indian stock symbols to Yahoo Finance format
const toYahooSymbol = (symbol) => {
    const cleanSymbol = symbol.toUpperCase().trim();

    if (cleanSymbol.endsWith(".NS") || cleanSymbol.endsWith(".BO")) {
        return cleanSymbol;
    }

    return `${cleanSymbol}.NS`;
};



// --------------------------------------------------
// Current stock price
// --------------------------------------------------

export const getStockPrice = async (symbol) => {

    try {

        const yahooSymbol = toYahooSymbol(symbol);

        const quote = await yahooFinance.quote(yahooSymbol);

        if (!quote || quote.regularMarketPrice == null) {
            throw new Error(`No price found for ${symbol}`);
        }

        return {

            symbol: symbol.toUpperCase(),

            name:
                quote.longName ||
                quote.shortName ||
                symbol.toUpperCase(),

            price:
                Number(quote.regularMarketPrice),

            change:
                quote.regularMarketChange != null
                    ? Number(quote.regularMarketChange)
                    : 0,

            percent:
                quote.regularMarketChangePercent != null
                    ? `${Number(
                        quote.regularMarketChangePercent
                    ).toFixed(2)}%`
                    : "0.00%"

        };

    }

    catch (error) {

        console.error(
            `Price error for ${symbol}:`,
            error.message
        );

        throw new Error(
            `Unable to fetch price for ${symbol}`
        );

    }

};



// --------------------------------------------------
// Historical chart / OHLC data
// --------------------------------------------------

export const getHistoricalData = async (
    symbol,
    period = "1y",
    interval = "1d"
) => {

    try {

        const yahooSymbol = toYahooSymbol(symbol);


        const periodDays = {

            "1d": 1,

            "5d": 5,

            "1mo": 30,

            "3mo": 90,

            "6mo": 180,

            "1y": 365,

            "5y": 1825,

            "max": 3650

        };


        const days =
            periodDays[period] || 365;


        const period1 = new Date(
            Date.now() -
            days * 24 * 60 * 60 * 1000
        );


        const result =
            await yahooFinance.chart(

                yahooSymbol,

                {

                    period1,

                    interval

                }

            );


        if (
            !result ||
            !result.quotes ||
            result.quotes.length === 0
        ) {

            throw new Error(
                `No historical data found for ${symbol}`
            );

        }


        return result.quotes

            .filter((item) =>

                item.open != null &&
                item.high != null &&
                item.low != null &&
                item.close != null

            )

            .map((item) => ({

                time: item.date,

                open: Number(item.open),

                high: Number(item.high),

                low: Number(item.low),

                close: Number(item.close),

                volume:
                    item.volume != null
                        ? Number(item.volume)
                        : 0

            }));

    }

    catch (error) {

        console.error(
            `Historical data error for ${symbol}:`,
            error.message
        );

        throw new Error(
            `Unable to fetch historical data for ${symbol}`
        );

    }

};



// --------------------------------------------------
// Search stocks
// --------------------------------------------------

export const searchStocks = async (query) => {

    try {

        const result =
            await yahooFinance.search(query);


        return (result.quotes || [])

            .filter((stock) =>

                stock.quoteType === "EQUITY"

            )

            .slice(0, 10)

            .map((stock) => ({

                symbol: stock.symbol,

                name:
                    stock.longname ||
                    stock.shortname ||
                    stock.symbol,

                region:
                    stock.exchange ||
                    ""

            }));

    }

    catch (error) {

        console.error(
            "Search error:",
            error.message
        );

        return [];

    }

};



// --------------------------------------------------
// Popular stocks
// --------------------------------------------------

export const getPopularStocks = async () => {

    const symbols = [

        "TCS.NS",

        "INFY.NS",

        "RELIANCE.NS",

        "HDFCBANK.NS",

        "ICICIBANK.NS",

        "SBIN.NS",

        "ITC.NS",

        "BHARTIARTL.NS"

    ];


    const results =
        await Promise.allSettled(

            symbols.map((symbol) =>
                getStockPrice(symbol)
            )

        );


    return results

        .filter(
            (result) =>
                result.status === "fulfilled"
        )

        .map(
            (result) =>
                result.value
        );

};