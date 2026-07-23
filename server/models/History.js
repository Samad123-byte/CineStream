import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
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

        progress: {
            type: Number,
            default: 0,
        },

        duration: {
            type: Number,
            default: 0,
        },

    },
    {
        timestamps: true,
    }
);

const History = mongoose.model(
    "History",
    historySchema
);

export default History;