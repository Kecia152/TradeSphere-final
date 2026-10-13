import Transaction from "../models/Transaction.js";





export const createTransaction = async(req,res)=>{


    try{


        const {

            symbol,

            companyName,

            type,

            quantity,

            price


        } = req.body;


        if(!symbol || !type || !quantity || quantity <= 0 || !price){

            return res.status(400).json({

                message:"symbol, type, a positive quantity and price are required"

            });

        }


        if(type === "SELL"){

            const pastTransactions = await Transaction.find({
                user:req.user.id,
                symbol:symbol.toUpperCase()
            });

            let ownedQuantity = 0;

            pastTransactions.forEach((item)=>{
                if(item.type === "BUY") ownedQuantity += item.quantity;
                if(item.type === "SELL") ownedQuantity -= item.quantity;
            });

            if(quantity > ownedQuantity){

                return res.status(400).json({

                    message:"Insufficient quantity to sell"

                });

            }

        }



        const transaction =

        await Transaction.create({

            user:req.user.id,

            symbol,

            companyName,

            type,

            quantity,

            price


        });





        res.status(201).json({

            success:true,

            transaction

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};









export const getTransactions = async(req,res)=>{


    try{


        const transactions =

        await Transaction.find({

            user:req.user.id

        })

        .sort({

            createdAt:-1

        });





        res.json({

            success:true,

            transactions

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};