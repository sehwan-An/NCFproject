import mongoose from "mongoose";
import { v4 as uuidv4} from 'uuid'

const usercontactSchema = mongoose.Schema(
    {
uuid:{
    type:String,
    default:uuidv4,
    unique:true,
    required:true
},
contact_type:{
    type:String,
    required:true,
    enum:['제품문의','반품','교환','환불','기타']
},
contact_title:{
    type:String,
    required:true
},

contact_content:{
    type:String,
    required:true
},
guest:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
}


    }
)
usercontactSchema.pre('save', async function(next){
    next();
})

const Contact = mongoose.model('UserContact', usercontactSchema)

export default Contact;