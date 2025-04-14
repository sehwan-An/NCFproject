import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const orderSchema = mongoose.Schema(
  {
    ordernumber: {
      type: String,
      required: true,
      default: uuidv4,
    },
    orderuser: {
      type: String,
      ref: 'User',
      required: true,
    },
    orderphone: {
      type: String,
      required: true,
    },
    orderaddress: {
      type: String,
      required: true,
    },
    orderproducts: {
      type: String,
      ref: 'Cart',
      required: true,
    },
    ordercount: {
      type: String,
      required: true,
    },
    orderprice: {
      type: String,
      required: true,
    },
    ordercolor: {
      type: String,
      required: true,
    },
    ordersize: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
