import mongoose from "mongoose";

const usercontactSchema = mongoose.Schema(
    {
// username:{
//     type:mongoose.userSchema.username,
//     ref:'User',
//     required: true
// },
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


    }
)
usercontactSchema.pre('save', async function(next){
    next();
})

const Contact = mongoose.model('UserContact', usercontactSchema)

export default Contact;