import mongoose from "mongoose";



const portfolioSchema = new mongoose.Schema({


    user:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true

    },


    symbol:{

        type:String,

        required:true

    },


    companyName:{

        type:String,

        default:""

    },


    quantity:{

        type:Number,

        required:true

    },


    buyPrice:{

        type:Number,

        required:true

    },


    createdAt:{

        type:Date,

        default:Date.now

    }


});





export default mongoose.model(

    "Portfolio",

    portfolioSchema

);