// Connect MongoDB
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const DB_CONNECT = process.env.DATABASE_SERVER + ""

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(DB_CONNECT);
        console.log(`\n MongoDB connected!!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('MONGO connection error:', error);
    }
};

export default connectDB;