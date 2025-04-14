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
    console.log('product 불러오기 한가지');
  } catch (e) {
    console.log(e);
  }
};
export const modifyProduct = async (req, res) => {
  const {name, price, color, size} = req.params.body
  const uuid = req.params.id
  const token = req.headers.authrization.spilt(' ')[1];
  try {
    const modifyProduct = await Product.findOne({productid: uuid})
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.role !== modifyProduct.role) {
      return res.status(401).json({
        status: 'fail',
        message: '관리자만 수정할 수 있습니다.'
      })
    }
    if(!modifyProduct) {
      return res.status(401).json({
        message: '올바른 요청이 아닙니다.'
      })
    }
    modifyProduct.productname = name;
    modifyProduct.productprice = price;
    modifyProduct.productcolor = color;
    modifyProduct.productsize = size;
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
  const { id } = req.params;
  try {
    const product = await Product.deleteOne(id);
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
