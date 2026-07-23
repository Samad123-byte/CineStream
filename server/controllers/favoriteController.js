import Favorite from "../models/Favorite.js";

export const addFavorite = async (req, res) => {

    try {

        const { movieId } = req.body;

        if (!movieId) {

            return res.status(400).json({
                message: "movieID is missing"
            })

        }

        const exists = await Favorite.findOne({ user: req.user._id, movieId })

        if (exists) {
            return res.status(400).json({
                message: "Movie is already in Favorite"
            })
        }

        const favorite = await Favorite.create({
    user: req.user._id,
    movieId
});

        res.status(201).json({

            success: true,

            favorite

        });


    } catch (error) {
        res.status(500).json({

            message: error.message

        });
    }

}


export const getFavorites = async (req, res) => {

    try {

        const favorites = await Favorite.find({
            user: req.user._id
        })

        res.status(201).json({
            success: true,
            count: favorites.length,
            favorites
        })

    } catch (error) {
        res.status(500).json({

            message: error.message

        });

    }

}


export const deleteFavorite = async (req, res) => {

    try {

        const { movieId } = req.params;

        const favorite = await Favorite.findOneAndDelete({

            user: req.user._id,
            movieId

        })

        if (!favorite) {

            return res.status(400).json({
                message: "MovieId is not Found"
            })

        }

        res.json(200).json({
            success: true,

            message: "Favorite removed"

        })

    } catch (error) {
        res.status(500).json({

            message: error.message

        });

    }

}