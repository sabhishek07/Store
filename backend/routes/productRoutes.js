import express, { Router } from 'express'
import { AdminVerifyMiddleware, Requireverifuser } from '../middlewares/authmiddleware.js';
import { CreateProductController, GetAllProductsController, GetSingleProduct, ProductFilterController, UpdateProductController, brainTreePaymentController, braintreeTokenController, deleteProductController, productPhotoController } from '../Controllers/productController.js';
import formidable from 'express-formidable';

const app=express();

const router=Router();

router.post('/create-product',Requireverifuser,AdminVerifyMiddleware,formidable(),CreateProductController)

//get all products

router.get('/get-all-products',GetAllProductsController)

//get single product

router.get('/get-single-product/:id',GetSingleProduct)

//get photo product

router.get('/get-photo/:photoid',productPhotoController)

//delete product

router.delete('/delete-product/:id',deleteProductController)

//update product

router.put('/get-update-product/:id',formidable(),UpdateProductController)

//filter product

router.post('/get-filter-products',ProductFilterController)

router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", Requireverifuser, brainTreePaymentController);



export default router;