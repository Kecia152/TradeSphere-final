import mongoose from "mongoose";



const stockSchema = new mongoose.Schema(

    {

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        symbol: {

            type: String,

            required: true,

            uppercase: true,

            trim: true

        },


        companyName: {

            type: String,

            required: true,

            trim: true

        },


        quantity: {

            type: Number,

            required: true,

            min: 1

        },


        buyPrice: {

            type: Number,

            required: true,

            min: 0

        },


        currentPrice: {

            type: Number,

            default: 0

        }

    },

    {

        timestamps: true

    }

);



const Stock = mongoose.model(
    "Stock",
    stockSchema
);



export default Stock;