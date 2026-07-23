import mongoose from "mongoose";

const watchListSchema = new mongoose.Schema(
    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        movieId: {
            type: Number,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

const WatchList = mongoose.model(
    "WatchList",
    watchListSchema
);

export default WatchList;