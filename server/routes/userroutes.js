import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import User from "../models/User.js";


const router = express.Router();



router.get(
    "/profile",
    authMiddleware,
    async (req,res)=>{

        try{

            const user = await User.findById(
                req.user.id
            ).select("-password");


            res.status(200).json(user);


        }catch(error){

            res.status(500).json({
                message:error.message
            });

        }

    }
);



router.put(
    "/profile",
    authMiddleware,
    async (req,res)=>{

        try{


            const user = await User.findByIdAndUpdate(

                req.user.id,

                req.body,

                {
                    new:true
                }

            ).select("-password");



            res.status(200).json(user);



        }catch(error){

            res.status(500).json({
                message:error.message
            });

        }

    }
);



export default router;