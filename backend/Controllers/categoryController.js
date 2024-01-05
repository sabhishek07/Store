import  Express  from "express"
import { CategoryModel } from "../models/categorymodel.js";


export const CategoryController=async(req,res)=>{

    try {

        const{name}=req.body;
        if(!name){
            return res.status(400).send({
                success:false,
                message:"Something Missing"
            })
        }
       const checkName=await CategoryModel.findOne({name});
       if(checkName){
        return res.status(400).send({
            success:false,
            message:"Category already registered"
        })
       }
       const categorydetails=await new CategoryModel({
        name
       }).save();

       return res.status(201).send({
        success:true,
        message:"Category created successfully",
        categorydetails
       })

      
    } catch (error) {
        
        console.log(error)
        
    }

}

export const UpdateCategoryController=async(req,res)=>{

    try {
        const{name}=req.body;
        const{id}=req.params

        const category=await CategoryModel.findByIdAndUpdate(id,{name},{new:true})

        return res.status(200).send({
            success:true,
            message:"Category Update Successfully",
            category
        })





        
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Something Went wrong"
        })

        
        
    }

}

//get all category

export const GetAllCategoryController=async(req,res)=>{

    try {

        const getallcategory=await CategoryModel.find({})
        if(!getallcategory){
            return res.status(400).send({
                success:false,
                message:"No Category"
            })
        }
        return res.status(200).send({
            success:true,
            message:"All category",
            getallcategory
        })
        
    } catch (error) {

        console.log(error)
        
    }

}

//get single category

export const GetSingleCategoryController=async(req,res)=>{

    try {

        const{id}=req.params;
        const singlecategory=await CategoryModel.findById(id);
        if(!singlecategory){
            return res.status(200).send({
                success:false,
                message:"No Category Found"
            })
        }
        return res.status(201).send({
            success:true,
            message:"Single Category",
            singlecategory
        })
        
    } catch (error) {

        console.log(error)
        
    }

}

//delete category

export const DeleteCategoryController=async(req,res)=>{
    try {

        const {id}=req.params;
       const deletecategory= await CategoryModel.findByIdAndDelete(id)

       if(!deletecategory){
        return res.status(200).send({
            success:false,
            message:"No Category Found"
       })
       }
       return res.status(201).send({
        success:true,
        message:"Category deleted"
       })



        
    } catch (error) {

        return res.status(500).send({
            success:false,
            message:"Error In System"
        })
        console.log(error)
        
    }

}