import express from 'express';
import { User } from '../models/usersModel.js';
import { comparePassword, hashingfunction } from '../helper/userhelper.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const RegisterController=async(req,res)=>{
    try {
        const{name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).send({
                success:false,
                message:"All Fields Required"
            })
        }

        const userCheck=await User.findOne({email})
        if(userCheck){
            return res.status(200).send({
                success:false,
                message:"User Already Registered"
            })
        }
        const passwordfinal=await hashingfunction(password);

        const userdetails=await new User({name,email,password:passwordfinal}).save();

        res.status(201).send({
            success:true,
            message:"User Registration Successfully",
            userdetails
        })



        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in registration"
        })
        
    }

}

//login functionality

export const LoginController=async(req,res)=>{
try {

    const{email,password}=req.body;
    if(!email || !password){
        return res.status(400).send({
            success:false,
            message:"Please Fill All Fields"
        })
    } 
    const checkloginuser=await User.findOne({email})

    if(!checkloginuser){
        return res.status(200).send({
            success:false,
            message:"Invalid User"
        })

    }
    const hashedpassword=checkloginuser.password
    const passwordCheck=await comparePassword(password,hashedpassword);

    if(!passwordCheck){
        return res.status(200).send({
            success:false,
            message:"Invalid User"

        })
    }

   const token=jwt.sign({id:checkloginuser._id},process.env.jwttoken,{expiresIn:'2d'})

    return  res.status(201).send({
        success:true,
        message:"Login Successfully",
        checkloginuser,
        token

    })
     


    
} catch (error) {
    
}
   

}

//protected route

export const UserdasboardController=async(req,res)=>{
    try {

        return res.status(201).send({
            success:true,
            message:"welcome In store"
        })
        
    } catch (error) {
        console.log(error)
        
    }


}

//adminController controller

export const AdminController=async(req,res)=>{

    try {
        res.status(201).send({
            success:true,
            message:"Admin Dashboard Successfully"
        })
        
    } catch (error) {
        console.log(error)
        
    }

}
