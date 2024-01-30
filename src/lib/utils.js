import mongoose from "mongoose";

export const connectToDb = async () => {
    console.log("Connecting to DB");
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");
    } catch (error) {
        console.error("Error connecting to DB:", error);
    }
}
