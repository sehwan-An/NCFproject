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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    orderaddress: {
      type: String,
      required: true,
    },
    orderproducts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    ordercount: {
      type: String,
      required: true,
      default: 1,
    }
  },
  { timestamps: true },
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
