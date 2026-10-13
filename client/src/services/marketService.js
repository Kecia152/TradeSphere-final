import API from "./api";


export const getMarketData = async () => {


    const stocks = [

        {
            symbol: "IBM",
            price: "213.00",
            change: "0.33",
            changePercent: "0.15%"
        },


        {
            symbol: "AAPL",
            price: "225.50",
            change: "1.20",
            changePercent: "0.53%"
        },


        {
            symbol: "MSFT",
            price: "510.20",
            change: "-2.10",
            changePercent: "-0.41%"
        },


        {
            symbol: "TSLA",
            price: "330.40",
            change: "5.20",
            changePercent: "1.60%"
        }

    ];


    return stocks;


};