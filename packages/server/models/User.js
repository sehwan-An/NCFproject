import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema(
  {
    userid: {
      type: String,
      rquierd: true,
      unique:true
    },
    userpwd: {
      type: String,
      requierd: true,
      length: 15
    },
    username: {
      type: String,
      requierd: true,
    },
    userphone: {
      type: String,
    },
    email: {
      type: String
    },
    role: {
      type: ['customer', 'admin']
    }

  },
  { timestamps: true }
);
userSchema.pre('save', async function(next){
  next();
})

const User = mongoose.model('User', userSchema);

export default User;
