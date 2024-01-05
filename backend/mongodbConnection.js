import  express  from "express";
import mongoose from "mongoose";

import dotenv from 'dotenv';

dotenv.config();


const ConnectionMongo=async()=>{
    try {

        const connect=await mongoose.connect(process.env.mongoUrl)
        console.log(`connection to database`)
        
    } catch (error) {
        console.log(`error in mongod ${error}`)
        
    }

}

export default ConnectionMongo;