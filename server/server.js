import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "./config/db.js";
import "dotenv/config";


import authRoutes from "./routes/authRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import marketRoutes from "./routes/marketRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import watchlistRoutes from "./routes/WatchlistRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import userRoutes from "./routes/userroutes.js";






const app = express();



connectDB();



app.use(
    cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
})
);



app.use(
    helmet()
);



app.use(
    morgan("dev")
);



app.use(
    express.json()
);




app.get(
    "/",
    (req,res)=>{

        res.json({

            message:"TradeSphere API running"

        });

    }
);





app.use(
    "/api/auth",
    authRoutes
);



app.use(
    "/api/stocks",
    stockRoutes
);



app.use(
    "/api/portfolio",
    portfolioRoutes
);



app.use(
    "/api/market",
    marketRoutes
);



app.use(
    "/api/transactions",
    transactionRoutes
);



app.use(
    "/api/watchlist",
    watchlistRoutes
);



app.use(
    "/api/ai",
    aiRoutes
);



app.use(
    "/api/chatbot",
    chatbotRoutes
);



app.use(
    "/api/users",
    userRoutes
);






app.use(
    (err,req,res,next)=>{

        console.error(err.stack);


        res.status(500).json({

            message:"Server error"

        });

    }
);





const PORT =
    process.env.PORT || 8000;



app.listen(
    PORT,
    ()=>{

        console.log(
            `Server running on port ${PORT}`
        );

    }
);