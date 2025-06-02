import mongoose from 'mongoose';

export const connectDB=async()=>{
    try{
       const connectionInstance=await mongoose.connect(process.env.MONGODB_URI);
       console.log(`MongoDB connected successfully ${connectionInstance.connection.host}`)
    }catch(error){
       console.log("Error occurred while connecting to MongoDB")
    }
}

//22ml10ta877
//hj3v8nNaS0uTwu3U