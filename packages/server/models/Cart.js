import mongoose from 'mongoose';

const cartSchema = mongoose.Schema(
  {
    orderuser: {
      type: String,
      ref: 'User',
      required: true,
    },
    products: {
      name: {
        type: String,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true },
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
