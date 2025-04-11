import mongoose from 'mongoose';
import { vs as uuidv4 } from 'uuid';

const productSchema = mongoose.Schema(
  {
    productid: {
      type: String,
      require: true,
      default: uuidv4,
      unique: true
    },
    productname: {
        type: String,
        require: true
    },
    productprice: {
        type: Number,
        require: true
    },
    productcolor: {
        type: String,
        require: true
    },
    productsize: {
        type:String,
        require: true
    },
    productcount: {
        type: Number,
        require: true
    }
  },
  { timestamps: true },
);

const Product = mongoose.model('Product', productSchema)

export default Product;