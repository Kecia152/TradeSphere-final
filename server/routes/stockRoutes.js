import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
    addStock,
    getStocks,
    deleteStock,
    sellStock
} from "../controllers/stockController.js";



const router = express.Router();



router.get(
    "/",
    authMiddleware,
    getStocks
);



router.post(
    "/",
    authMiddleware,
    addStock
);



router.delete(
    "/:id",
    authMiddleware,
    deleteStock
);



router.put(
    "/sell/:id",
    authMiddleware,
    sellStock
);



export default router;