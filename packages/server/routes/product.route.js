import express from 'express';
import * as productController from '../controllers/product.controllers.js'
const router = express.Router();
import multer from 'multer'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+file.fieldname+'-'+file.originalname)
    }
})
const upload = multer({storage: storage})


router.post('/product', upload.single('photo'), productController.createProduct)
router.put('/product/:id', productController.modifyProduct)
router.delete('/product/:id', productController.deleteProduct)

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct)

router.post('/cart', productController.cartProduct)
router.delete('/cart/:id', productController.deleteFromCart)

router.get('/carts/:id', productController.getUserCart)

router.post('/cartorder', productController.cartOrder)

router.get('/order', productController.manageOrders)
router.get('/order/:id', productController.orderHistory)
router.post('/order/:id', productController.orderOneProduct)
router.delete('/order/:id', productController.deleteOrder)

router.delete('/manage/order/:id', productController.manageDeleteOrder)




export default router;
