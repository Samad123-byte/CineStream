import mongoose from "mongoose";

const connectdb = async () =>  {

    try {

        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("DataBase is fully connected")

    } catch (error) {
        console.error("Error in connecting with Database")
        console.error(error.message)
        process.exit(1);
    }

};

export default connectdb;