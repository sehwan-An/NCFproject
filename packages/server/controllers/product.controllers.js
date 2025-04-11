import Product from '../models/Product.js';
import { v4 as uuidv4 } from 'uuid';
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
      message: '등록완료'
    });
  } catch (err) {
    console.log('에러 내역', err)
  }
};

export const addPosts = async (req, res) => {
  try {
    const Products = await Product.find();
    res.status(201).json(Products);
  } catch (err) {
    console.error(err.message);
  }
};
