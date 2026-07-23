import Review from "../models/Review.js";

export const addReview = async (req, res) => {

    try {

        const { movieId, rating, comment } = req.body;

        if (!movieId || !rating) {

            return res.status(400).json({
                message: "MovieId and Rating are required"
            })

        }

        const existingReview = await Review.findOne({

            user: req.user._id,

            movieId

        })

        if (existingReview) {

            existingReview.rating = rating;
                existingReview.comment = comment;

            await existingReview.save()

            return res.status(200).json({

                success: true,

                message: "Review Updated",

                review: existingReview

            });

        }

          const review = await Review.create({

                user: req.user._id,

                movieId,

                rating,

                comment

            })


        res.status(201).json({

            success: true,

            message: "Review Added",

            review

        });

    } catch (error) {


        res.status(500).json({

            message: error.message

        });

    }

}


export const getReviews = async (req, res) => {

    try {

        const { movieId } = req.params;

        const reviews = await Review.find({
            movieId
        }).populate("user", "name avatar")

        res.status(200).json({

            success: true,

            count: reviews.length,

            reviews

        });


    } catch (error) {

        res.status(500).json({

            message: error.message

        });


    }

}


export const deleteReview = async (req, res) => {

    try {

        const { movieId } = req.params;

        const review = await Review.findOneAndDelete({

            user: req.user._id,

            movieId

        });

        if (!review) {

            return res.status(404).json({

                message: "Review not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Review Deleted"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};