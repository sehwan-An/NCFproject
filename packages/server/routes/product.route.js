import express from 'express';
import * as productController from '../controllers/product.controllers.js'
const router = express.Router();


router.get('/products', productController.getProducts);
router.post('/product', productController.createProduct)

export default router;
