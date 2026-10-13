import Watchlist from "../models/Watchlist.js";



export const getWatchlist = async (req, res) => {

    try {

        const watchlist = await Watchlist.find({
            user: req.user.id
        });


        res.status(200).json({

            watchlist

        });


    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};





export const addToWatchlist = async (req, res) => {

    try {

        const {
            symbol,
            companyName
        } = req.body;



        const existingStock = await Watchlist.findOne({

            user: req.user.id,

            symbol

        });



        if (existingStock) {

            return res.status(400).json({

                message: "Stock already in watchlist"

            });

        }




        const stock = await Watchlist.create({

            user: req.user.id,

            symbol,

            companyName

        });



        res.status(201).json(stock);



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};







export const removeFromWatchlist = async (req, res) => {

    try {


        await Watchlist.findOneAndDelete({

            _id: req.params.id,

            user: req.user.id

        });



        res.status(200).json({

            message: "Removed from watchlist"

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

};