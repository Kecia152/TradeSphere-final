import mongoose from "mongoose";



const transactionSchema = new mongoose.Schema(

    {

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        stock: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Stock"

        },


        type: {

            type: String,

            enum: [
                "BUY",
                "SELL"
            ],

            required: true

        },


        symbol: {

            type: String,

            required: true,

            uppercase: true

        },


        companyName: {

            type: String,

            required: true

        },


        quantity: {

            type: Number,

            required: true

        },


        price: {

            type: Number,

            required: true

        }

    },

    {

        timestamps: true

    }

);



const Transaction = mongoose.model(
    "Transaction",
    transactionSchema
);



export default Transaction;