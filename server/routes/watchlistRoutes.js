import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist
} from "../controllers/watchlistController.js";


const router = express.Router();



router.get(
    "/",
    authMiddleware,
    getWatchlist
);



router.post(
    "/",
    authMiddleware,
    addToWatchlist
);



router.delete(
    "/:id",
    authMiddleware,
    removeFromWatchlist
);



export default router;