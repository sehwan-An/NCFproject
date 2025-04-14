import Product from '../models/Product.js';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length < 1) {
      res.status(500).json({
        message: '데이터가 없습니다.',
      });
    }
    res.status(201).json(products);
  } catch (e) {
    console.log(e);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({productid: req.params.id})
    if(!product) {
      res.status(401).json({
        status: 'fail',
        message: '잘못된 요청입니다.'
      })
    }
    res.status(201).json(product)
  } catch (e) {
    console.log(e);
  }
};
export const modifyProduct = async (req, res) => {
  const {productid, productname, productprice, productcolor, productsize} = req.body
  console.log(req.body)
  const uuid = req.params.id
  const token = req.headers.authorization.split(' ')[1];
  try {
    const modifyProduct = await Product.findOne({productid: uuid})
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(modifyProduct)
    if(!modifyProduct) {
      return res.status(401).json({
        message: '올바른 요청이 아닙니다.'
      })
    }
    modifyProduct.productname = productname;
    modifyProduct.productprice = productprice;
    modifyProduct.productcolor = productcolor;
    modifyProduct.productsize = productsize;
    await modifyProduct.save();
    res.status(201).json({
      message: '업데이트가 완료되었습니다.'
    })
  } catch (e) {
    console.log(e);
  }
};

export const createProduct = async (req, res) => {
  const { productname, productprice, productcolor, productsize } = req.body;
  console.log(req);
  try {
    const newProduct = new Product({
      productname,
      productprice,
      productcolor,
      productsize,
    });
    await newProduct.save();
    res.status(201).json({
      status: 'succes',
      message: '등록완료',
    });
  } catch (err) {
    console.log('에러 내역', err);
  }
};

export const deleteProduct = async (req, res) => {
  console.log(req)
  const id = req.params.id;
  try {
    const product = await Product.deleteOne({productid: id});
    if (!product) {
      return res.status(404).json({
        message: '해당 제품이 존재하지 않습니다.',
      });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
