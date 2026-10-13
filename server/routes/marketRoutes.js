import express from "express";


import {

    fetchStockPrice,

    fetchHistoricalData,

    searchStockList,

    fetchPopularStocks

} from "../controllers/marketController.js";



const router = express.Router();





// Current price

router.get(

    "/price/:symbol",

    fetchStockPrice

);





// Historical chart data

router.get(

    "/history/:symbol",

    fetchHistoricalData

);





// Search any stock

router.get(

    "/search/:query",

    searchStockList

);





// Popular market stocks

router.get(

    "/popular",

    fetchPopularStocks

);





export default router;