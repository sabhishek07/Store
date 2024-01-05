
import mongoose from 'mongoose'

const ProductSchema=new mongoose.Schema({

   name:{
   type:String,
   required:true,
   unique:true

   },

   description:{
    type:String,
    required:true
   },

   image:{
    data:Buffer,
    contentType:String
   },

   price:{
    type:Number,
    required:true

   },
   quantity:{
     type:Number,
     required:true
   },

   category:{
    type:mongoose.ObjectId,
    ref:'CategoryModel',
    required:true
   },

   shipping:{
    type:Boolean,
   
   }
   
},{timestamps:true})


export const ProductModel=mongoose.model('ProductModel',ProductSchema)