import mongoose from "mongoose";
import { db_name } from "../contants.js";

const connectDB = async ()=>{
   try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${db_name}`);
       console.log("MongoDB is Connected !! DB HOST: " , connectionInstance.connection.host);
       
   } catch (error) {
       console.log("Database Connection Failed: ",error);
       throw error
       process.exit(1);
   }
};

export default connectDB;