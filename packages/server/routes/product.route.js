import express from 'express';
import * as productController from '../controllers/product.controllers.js'
const router = express.Router();


router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct)
router.post('/product', productController.createProduct)

router.delete('/product/:id', productController.deleteProduct)
router.put('/product/:id', productController.modifyProduct)




export default router;
