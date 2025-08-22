import mongoose from "mongoose";

let cached = global.mongoose || {conn : null, promise: null};

export default async function connectDB(){
    if(cached.conn) return cached.conn;
    if(!cached.promise){
       cached.promise = mongoose.connect(process.env.MONGODB_URI,{
           dbName: "zairo"
            }
       ).then((mongoose)=>mongoose);   
    }
    try {
        cached.conn = await cached.promise;
        global.mongoose = cached;
        console.log("MongoDB connected");
    } catch (error) {
        
        console.log("Error connecting to mogoDb",error);
        
    }
    return cached.conn
}