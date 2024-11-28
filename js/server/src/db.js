// Connect MongoDB
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect("mongodb+srv://firmer:FirmerPa55w0rd@firmer-test.ym0ch.mongodb.net/test");
        console.log(`\n MongoDB connected!!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('MONGO connection error:', error);
    }
};

export default connectDB;