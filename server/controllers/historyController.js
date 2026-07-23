import History from "../models/History.js";


export const addHistory = async (req, res) => {

    try {

        const { movieId, progress, duration } = req.body;

        if (!movieId) {

            return res.status(400).json({
                message: "Movie ID is required"
            })

        }

        let history = await History.findOne({
            user: req.user._id,
            movieId
        })


        if (history) {

            history.progress = progress;
            history.duration = duration;

            await history.save()

            return res.status(200).json({

                success: true,

                message: "History Updated",

                history

            });


        }


        history = await History.create({

            user: req.user._id,

            movieId,

            progress,

            duration

        })

        res.status(201).json({

            success: true,

            message: "History Added",

            history

        });

    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }


}



export const getHistory = async (req, res) => {

    try {

        const history = await History.find({

            user: req.user._id

        }).sort({

            updatedAt: -1

        });

        res.status(200).json({

            success: true,

            count: history.length,

            history

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


export const deleteHistory = async (req, res) => {

    try {

        const { movieId } = req.params;

        const history = await History.findOneAndDelete({

            user: req.user._id,

            movieId

        });

        if (!history) {

            return res.status(404).json({

                message: "History not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "History removed"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};