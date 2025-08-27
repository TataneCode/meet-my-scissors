import mongoose from 'mongoose';

let isConnected = false;

export const dbConnect = async () => {
    if (isConnected) return;

    const uri = process.env.MONGODB_URI as string;
    if (!uri) throw new Error('MONGODB_URI is not defined');

    try {
        await mongoose.connect(uri);
        isConnected = true;
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        throw error;
    }
};
