import express from 'express';
import * as productController from '../controllers/product.controllers.js'
const router = express.Router();


router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct)
router.post('/product', productController.createProduct)
router.put('/product/:id', productController.modifyProduct)
router.delete('/product/:id', productController.deleteProduct)

router.delete('/cart/:id', productController.deleteFromCart)
router.get('/carts/:id', productController.getUserCart)
router.post('/cart', productController.cartProduct)
router.post('/cart/:id', productController.orderOneProduct)
router.post('/cart', productController.orderProducts)

export default router;
