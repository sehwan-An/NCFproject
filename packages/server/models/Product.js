import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const productSchema = mongoose.Schema(
  {
    productid: {
      type: String,
      require: true,
      default: uuidv4,
      unique: true,
      trim: true
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
    }/* ,
    productcount: {
        type: Number,
        require: true
    },
    productimage: {
        data:Buffer,
        type:String
    } */
  },
  { timestamps: true },
);

const Product = mongoose.model('Product', productSchema)

export default Product;