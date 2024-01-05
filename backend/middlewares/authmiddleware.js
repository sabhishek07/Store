import jwt from 'jsonwebtoken';
import { User } from '../models/usersModel.js';


export const Requireverifuser=async(req,res,next)=>{
    try {
        const verifyUser=jwt.verify(req.headers.authorization,process.env.jwttoken)
        req.checkloginuser=verifyUser;
        next();
        
    } catch (error) {

        console.log(error)
        
    }

}


//admin middlelware

export const AdminVerifyMiddleware=async(req,res,next)=>{
    try {
        const user=req.checkloginuser;
        const confirmuser=await User.findById(user.id)
        if(confirmuser.role!==1){
            return res.status(400).send({
                success:false,
                message:"Access Denied"
            })
        }
        next();
        
         
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something Went Wrong"
        })
        
    }

     

}