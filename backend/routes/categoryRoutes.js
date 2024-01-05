import express,{ Router } from "express";
import { AdminVerifyMiddleware, Requireverifuser } from "../middlewares/authmiddleware.js";
import { CategoryController, DeleteCategoryController, GetAllCategoryController, GetSingleCategoryController, UpdateCategoryController } from "../Controllers/categoryController.js";
const app=express();

const router=Router();

router.post('/create-category',Requireverifuser,AdminVerifyMiddleware,CategoryController);

//update category

router.put('/update-category/:id',Requireverifuser,AdminVerifyMiddleware,UpdateCategoryController)

//get all category

router.get('/get-all-category',GetAllCategoryController)

//get single category

router.get('/get-single-category/:id',GetSingleCategoryController)

//delete category

router.delete('/delete-category/:id',Requireverifuser,AdminVerifyMiddleware,DeleteCategoryController)


export default router
