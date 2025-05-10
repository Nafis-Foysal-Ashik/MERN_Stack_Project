import express from 'express';
import {addProduct,listProducts,removeProduct,singleProduct} from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();
//here adminAuth is a middleware so only the admin can access those route where we use adminAuth
//normal user can not access those route
//here upload.fields() is a middleware which is used to upload multiple files
//upload.fields() is used to upload multiple files with different field names
//maxCount is used to specify the maximum number of files that can be uploaded
productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct);
productRouter.post('/remove',adminAuth,removeProduct);
productRouter.post('/single',singleProduct);
productRouter.get('/list',listProducts);

export default productRouter;