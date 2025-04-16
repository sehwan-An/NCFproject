import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Cart from '../models/Cart.js';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(500).json({
        message: '상품을 찾을 수 없음.',
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
  const { productname, productprice, productcolor, productsize, stock } = req.body;
  console.log(req.body);
  const uuid = req.params.id;
  try {
    const modifyProduct = await Product.findOne({ productid: uuid });
    if (!modifyProduct) {
      return res.status(401).json({
        message: '올바른 요청이 아닙니다.',
      });
    }
    modifyProduct.productname = productname;
    modifyProduct.productprice = productprice;
    modifyProduct.productcolor = productcolor;
    modifyProduct.productsize = productsize;
    modifyProduct.stock = stock;
    await modifyProduct.save();
    res.status(201).json({
      message: '업데이트가 완료되었습니다.',
    });
  } catch (e) {
    console.log(e);
  }
};

export const createProduct = async (req, res, next) => {
  const { productname, productprice, productcolor, productsize, stock } = req.body;
  const photo = req.file;
  try {
    const newProduct = new Product({
      productname,
      productprice,
      productcolor,
      productsize,
      stock,
      photo: photo.path,
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
        id: product.productid,
        name: product.productname,
        quantity: 1,
        price: product.productprice,
        color: product.productcolor,
        size: product.productsize,
      },
      photo: product.photo,
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
    const user = await User.findOne({ username: decoded.name });
    const dbProduct = await Product.findOne({ productid: product.productid });
    if (!dbProduct) {
      return res.status(404).json({
        message: '상품을 찾을 수 없습니다!',
      });
    }
    if (dbProduct.stock < 1) {
      return res.status(404).json({
        message: '재고가 부족합니다.',
      });
    }
    const newOrder = new Order({
      orderuser: user._id,
      orderphone: user.userphone,
      orderaddress: `${product.addressf} ${product.addressb}`,
      orderproducts: product._id,
      orderprice: product.productprice,
      ordercolor: product.productcolor,
      ordersize: product.productsize,
      photo: product.photo,
    });
    let leftStock = (dbProduct.stock -= 1);
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
export const cartOrder = async (req, res) => {
  const products = req.body;
  console.log(products);
  // const token = req.headers.authorization.split(' ')[1];
  // const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // const user = await User.findOne({ username: decoded.name });
  try {
    // const newOrder = new Order({
    //   orderuser: user._id
    //   orderphone: user.userphone,
    //   orderaddress: `${product.addressf} ${product.addressb}`,
    //   orderproducts: product.productname,
    //   ordercount: 1,
    //   orderprice: product.productprice,
    //   ordercolor: product.productcolor,
    //   ordersize: product.productsize,
    // });
    // await newOrder.save();
    // res.status(201).json({
    //   status: 'success',
    //   message: '주문이 완료되었습니다.',
    // });
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
    const user = await User.findOne({ _id: requser });
    const username = user.username;
    const usercart = await Cart.find({ orderuser: username });
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
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const cart = await Cart.deleteOne({ _id: itemid });
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

export const orderHistory = async (req, res) => {
  const requser = req.headers.userid;
  if (!requser) {
    return res.status(401).json({
      message: '잘못된 요청입니다.',
    });
  }
  try {
    const user = await User.findOne({ _id: requser });
    if (!user) {
      return res.status(404).json({
        message: '사용자를 찾을 수 없습니다.',
      });
    }
    const userid = user._id;

    const userorder = await Order.find().populate('orderuser', 'username');
    const filteredOrders = userorder.filter(
      (order) => order.orderuser._id.toString() === userid.toString(),
    );
    res.status(201).json(filteredOrders);
  } catch (e) {
    console.log(e);
  }
};

export const deleteOrder = async (req, res) => {
  const userid = req.headers.userid;
  const orderid = req.params.id;
  // console.log(orderid)
  try {
    const order = await Order.findOne({ _id: orderid });
    const productId = order.orderproducts._id;
    if (!productId) {
      return res.status(401).json({
        message: '주문한 상품정보를 찾을 수 없습니다.',
      });
    }
    // console.log("제품 아이디", productId, typeof productId)

    const product = await Product.findOne({ _id: productId });
    // console.log(product)

    const deleteOrder = await Order.deleteOne({ _id: orderid });
    if (!deleteOrder) {
      return res.status(401).json({
        status: 'fail',
        message: '요청 처리 실패',
      });
    }

    let leftStock = (product.stock += 1);
    await product.save();

    res.status(201).json({
      status: 'success',
      message: '삭제 요청 처리 성공',
    });
  } catch (e) {
    console.log(e);
  }
};

export const manageOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('orderuser', 'username userphone').populate('orderproducts');

    if (!orders) {
      return res.status(401).json({
        message: '잘못된 접근입니다.',
      });
    }
    res.status(201).json(orders);
  } catch (e) {
    console.log('에러 내역', e);
  }
};
