import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
    getAIInsight,
    chatWithAI
} from "../controllers/aiController.js";


const router = express.Router();



router.get(
    "/",
    authMiddleware,
    getAIInsight
);



router.post(
    "/chat",
    authMiddleware,
    chatWithAI
);



export default router;