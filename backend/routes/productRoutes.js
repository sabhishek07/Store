import express, { Router } from 'express'
import { AdminVerifyMiddleware, Requireverifuser } from '../middlewares/authmiddleware.js';
import { CreateProductController, GetAllProductsController, deleteProductController, productPhotoController } from '../Controllers/productController.js';
import formidable from 'express-formidable';

const app=express();

const router=Router();

router.post('/create-product',Requireverifuser,AdminVerifyMiddleware,formidable(),CreateProductController)

//get all products

router.get('/get-all-products',GetAllProductsController)

//get photo product

router.get('/get-photo/:photoid',productPhotoController)

//delete product

router.delete('/delete-product/:id',deleteProductController)

//update product

router.put('/get-update-product/:id')


export default router;