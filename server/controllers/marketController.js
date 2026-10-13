import {

    getStockPrice,

    getHistoricalData,

    searchStocks,

    getPopularStocks

} from "../services/marketService.js";





export const fetchStockPrice = async(req,res)=>{


    try{


        const {symbol}=req.params;



        const stock =

        await getStockPrice(

            symbol.toUpperCase()

        );



        res.json({

            success:true,

            stock

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







export const fetchHistoricalData = async(req,res)=>{


    try{


        const {symbol}=req.params;



        const data=

        await getHistoricalData(

            symbol.toUpperCase()

        );



        res.json({

            success:true,

            data

        });


    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







export const searchStockList = async(req,res)=>{


    try{


        const stocks=

        await searchStocks(

            req.params.query

        );



        res.json({

            success:true,

            stocks

        });


    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};








export const fetchPopularStocks = async(req,res)=>{


    try{


        const stocks=

        await getPopularStocks();



        res.json({

            success:true,

            stocks

        });


    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};