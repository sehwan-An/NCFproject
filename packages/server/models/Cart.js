import mongoose from 'mongoose';

const cartSchema = mongoose.Schema(
  {
    orderuser: {
      type: String,
      ref: 'User',
      required: true,
    },
    orderproduct: {
      type: String,
      ref: 'Product',
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

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
