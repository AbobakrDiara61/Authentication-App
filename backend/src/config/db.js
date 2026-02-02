import mongoose from "mongoose";

const connectDB = async () => {
    try {
        /* await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected Successfully"); */
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Database Connection Failed", error);
        process.exit(1); // 1 is failure 0 status code success
    }
}

export default connectDB