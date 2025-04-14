import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
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
    orderproduct: {
      type: String,
      ref: 'Product',
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
    }
  },
  { timestamps: true },
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
