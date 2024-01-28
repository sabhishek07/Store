import express from 'express';
import ConnectionMongo from './mongodbConnection.js';
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import dotenv from 'dotenv'
import path from 'path';


dotenv.config();

const app=express();
const port=process.env.port
app.use(express.json());

ConnectionMongo();

app.use('/api/v1/user',userRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)


app.listen(port,()=>{
    console.log(`running on port ${port}`)
})