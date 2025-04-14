import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Cart from '../models/Cart.js';
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
    const product = await Product.findOne({ productid: req.params.id });
    if (!product) {
      res.status(401).json({
        status: 'fail',
        message: '잘못된 요청입니다.',
      });
    }
    res.status(201).json(product);
  } catch (e) {
    console.log(e);
  }
};
export const modifyProduct = async (req, res) => {
  const { productid, productname, productprice, productcolor, productsize, stock } = req.body;
  console.log(req.body);
  const uuid = req.params.id;
  const token = req.headers.authorization.split(' ')[1];
  try {
    const modifyProduct = await Product.findOne({ productid: uuid });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(modifyProduct);
    if (!modifyProduct) {
      return res.status(401).json({
        message: '올바른 요청이 아닙니다.',
      });
    }
    modifyProduct.productname = productname;
    modifyProduct.productprice = productprice;
    modifyProduct.productcolor = productcolor;
    modifyProduct.productsize = productsize;
    modifyProduct.stock = stock
    await modifyProduct.save();
    res.status(201).json({
      message: '업데이트가 완료되었습니다.',
    });
  } catch (e) {
    console.log(e);
  }
};



export const createProduct = async (req, res) => {
  const { productname, productprice, productcolor, productsize, stock } = req.body;
  console.log(req);
  try {
    const newProduct = new Product({
      productname,
      productprice,
      productcolor,
      productsize,
      stock,
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
  console.log(req);
  const id = req.params.id;
  try {
    const product = await Product.deleteOne({ productid: id });
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

export const cartProduct = async (req, res) => {
  const product = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const customer = await User.findOne({ userid: decoded.id });
    const cart = new Cart({
      orderuser: customer.username,
      products: {
        name: product.productname,
        quantity: 1,
        price: product.productprice,
        color: product.productcolor,
        size: product.productsize,
      },
    });
    await cart.save();
    res.status(201).json({
      status: 'success',
      message: '장바구니 담기 성공',
    });
  } catch (e) {
    console.log(e);
  }
};

export const orderOneProduct = async (req, res) => {
  const product = req.body;
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(product);
    const user = await User.findOne({ username: decoded.name });
    const dbProduct = await Product.findOne({productid: product.productid});
    if(!dbProduct) {
      return res.status(404).json({
        message: '상품을 찾을 수 없습니다!',
      });
    }
    if(dbProduct.stock < 1) {
      return res.status(404).json({
        message: '재고가 부족합니다.',
      });
    }
    const newOrder = new Order({
      orderuser: user.username,
      orderphone: user.userphone,
      orderaddress: `${product.addressf} ${product.addressb}`,
      orderproducts: product.productname,
      orderprice: product.productprice,
      ordercolor: product.productcolor,
      ordersize: product.productsize,
    });
    let leftStock = dbProduct.stock -= 1;
    await dbProduct.save();
    await newOrder.save();
    res.status(201).json({
      status: 'success',
      message: '주문이 완료되었습니다.',
    });
  } catch (e) {
    console.log(e);
  }
};
export const orderProducts = async (req, res) => {
  const product = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(product);
  // console.log(decoded);
  const user = await User.findOne({ username: decoded.name });
  console.log(user);
  try {
    const newOrder = new Order({
      orderuser: user.username,
      orderphone: user.userphone,
      orderaddress: `${product.addressf} ${product.addressb}`,
      orderproducts: product.productname,
      ordercount: 1,
      orderprice: product.productprice,
      ordercolor: product.productcolor,
      ordersize: product.productsize,
    });
    // console.log(newOrder)
    await newOrder.save();
    res.status(201).json({
      status: 'success',
      message: '주문이 완료되었습니다.',
    });
  } catch (e) {
    console.log(e);
  }
};

export const getUserCart = async (req, res) => {
  const requser = req.headers.userid;
  if (!requser) {
    return res.status(401).json({
      message: '잘못된 유저 정보입니다.',
    });
  }
  try {

    const user = await User.findOne({_id: requser})
    const username = user.username
    const usercart = await Cart.find({ orderuser: username });
    // console.log(usercart);
    res.status(201).json({
      message: '장바구니 조회성공',
      data: usercart,
    });
  } catch (e) {
    console.log(e);
  }
};
export const deleteFromCart = async (req, res) => {
  const itemid = req.params.id;
  // console.log(id)
  // console.log(req.headers.authorization)
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const order = await Cart.findOne({ _id: itemid });
    // console.log(order)
    console.log(user);
    if (order.orderuser !== user.name) {
      return res.status(401).json({
        status: 'reject',
        message: '잘못된 접근입니다.',
      });
    }
    const cart = await Cart.deleteOne({ _id: id });
    if (!cart) {
      return res.status(404).json({
        message: '해당 제품이 존재하지 않습니다.',
      });
    }
    res.status(200).json({ message: '상품이 장바구니에서 제거되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
