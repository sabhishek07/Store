import express from 'express';
import fs from 'fs';
import { ProductModel } from '../models/productmodel.js';




//create product 

export const CreateProductController=async(req,res)=>{

    try {
        const{name,description,price,quantity,category,shipping}=req.fields;
        const{image}=req.files;

        if(!name|| !description || !price || !quantity || !category ){
            return res.status(400).send({
                success:false,
                message:"All Fields Required"
            })
        }
        else if(!image){
            return res.status(400).send({
                success:false,
                message:"Either Image Size is greater than 1mb Or Image Null"
        })
        }

        const products=await new ProductModel({...req.fields})
        products.image.data=fs.readFileSync(image.path)
        products.image.contentType=image.type

        products.save()
        return res.status(201).send({
            success:true,
            message:"Product Created Successfully",
            products
        })






        
        
    } catch (error) {

       return res.status(500).send({
        success:false,
        message:"Server Down"
       })
        
    }

}

//get All Products

export const GetAllProductsController=async(req,res)=>{

    try {

        const getproducts=await ProductModel.find({}).populate('category').select('-image').limit(12).sort({ createdAt: -1 });

        return res.status(201).send({
            success:true,
            message:"ALL Products",
            total_Products:getproducts.length,
            getproducts,
           
        })
        
    } catch (error) {
        return res.status(500).send({
            success:true,
            message:"Something Went Wrong",
            error
        })
        
    }

}


//get product controller

export const GetSingleProduct=async(req,res)=>{

    try {
        const{id}=req.params
        const singlproduct=await ProductModel.findById(id).select('-image').populate('category')
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            singlproduct,
          });
        
    } catch (error) {

        res.status(500).send({
            success: false,
            message: "Eror while getitng single product",
            error,
          });
        
    }

  

}


//get photo
export const productPhotoController = async (req, res) => {
    try {
        const{photoid}=req.params
      const product = await ProductModel.findById(photoid)
      if (product.image.data) {
        res.set("Content-type", product.image.contentType);
        return res.status(200).send(product.image.data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        error,
      });
    }
  };

  //delete product

  export const deleteProductController = async (req, res) => {
    try {
        const{id}=req.params
      await ProductModel.findByIdAndDelete(id)
      res.status(200).send({
        success: true,
        message: "Product Deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while deleting product",
        error,
      });
    }
  };


  //update products

  export const UpdateProductController=async(req,res)=>{

    try {
        const{id}=req.params;
       const{name,description,price,quantity,shipping,category}=req.fields;
        const{image} = req.files;

        if(!name|| !description || !price || !category || !quantity || !shipping){
            return res.status(400).send({
                success:false,
                message:"All fields required"

            })
        }

        if(!image){
            return res.status(400).send({
                success:false,
                message:"Image Issue"
            })
        }

        const updateProduct=await ProductModel.findByIdAndUpdate(id,{...req.fields},{new:true})
        if (image) {
            updateProduct.image.data = fs.readFileSync(image.path);
            updateProduct.image.contentType = image.type;
            
          }

          updateProduct.save();

          res.status(201).send({
            success:true,
            message:"Product Updated",
            updateProduct
          })
    } catch (error) {
        console.log(error)

        res.status(500).send({
            success:false,
            message:"Something went wrong"
        })
        
    }

  }
  
  export const ProductFilterController=async(req,res)=>{

    try {
      const{checked,radio}=req.body;
      let filterproducts={};  

      if(checked && checked.length>0){
        filterproducts.category={ $in: checked };

      }
      if(radio){
        filterproducts.price={
          $gte:radio[0],$lte:radio[1]
        }

      }

      const AllfilterProducts=await ProductModel.find(filterproducts)
      res.status(201).send({
        success:true,
        message:"Allfilter Products",
        AllfilterProducts
      })

  

      
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success:false,
        message:"Something Went Wrong"
      })
      
    }

  }

