// import mongoose, { mongo } from "mongoose";

// const connectDB=async ()=>{
//     mongoose.connection.on('connected',()=>console.log("Database connected"))
//     await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
// }
// export default connectDB

import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);

        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        throw error;
    }
};

export default connectDB;
