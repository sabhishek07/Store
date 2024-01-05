import  express, { Router }  from "express";
import { AdminController, LoginController, RegisterController, UserdasboardController } from "../Controllers/userController.js";
import {  AdminVerifyMiddleware, Requireverifuser } from "../middlewares/authmiddleware.js";

const app=express();

const router=Router();

router.post('/register',RegisterController);
router.post('/login',LoginController);


//user dashboard
router.get('/user-dashboard',Requireverifuser,UserdasboardController);

//Admin dashboard

router.get('/admin-dashboard',Requireverifuser,AdminVerifyMiddleware,AdminController);



export default router;
