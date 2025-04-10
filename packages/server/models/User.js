import mongoose from 'mongoose';

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
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
