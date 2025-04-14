import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        orderuser: {
            type: String,
            ref: 'User',
            required: true
        },
        orderphone: {
            type: String,
            required: true
        },
        destination: {
            type: String,
            required: true
        },
        orderproduct: {
            type: String,
            ref: 'Product',
            required: true
        },
        orderquantity: {
            type: String,
            required: true
        },
        orderprice: {
            type: String,
            required: true
        },
        ordercolor: {
            type: String
        }
    }
)