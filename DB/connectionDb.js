import mongoose from 'mongoose';

export const connectionDB = async () => {
    const connect = mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log("fialed to connect to MongoDB"));
}