import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import bcrypt from 'bcrypt'

const regist = async (req, res) => {
  const { username, userpwd, userid, userphone, email } = req.body;
  console.log(req.body);

  try {
    const existUser = await User.findOne({
      $or: [{ username }, { userphone }],
    });
    if (existUser) {
      return res.status(400).json({
        message: '해당 정보로 등록된 사용자가 이미 존재합니다.',
      });
    }

    const user = new User({
      username,
      userpwd:bcrypt.hashSync(userpwd,10),
      userid,
      userphone,
      email,
      role: 'customer',
    });
    await user.save();
    res.status(201).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    console.log('regist is failed :', err);
  }
};

const signin = async (req, res) => {
  const { userid, userpwd } = req.body;
  console.log(userid, userpwd)
  try {
    const user = await User.findOne({ userid });
    console.log(user)
    if (!user) {
      return res.status(400).json({
        message: '아이디를 다시 확인하세요',
      });
    }
    const isMatch = bcrypt.compareSync(userpwd, user.userpwd);
    if (!isMatch) {
      alert('잘못된 비밀번호 입니다.');
    }

    const userInfo = {
      name: user.username,
      id: user.userid,
      role: user.role
    };
    const token = jwt.sign(userInfo,process.env.JWT_SECRET );
    res.cookie('NCF', token, {
      httpOnly: false,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });
    console.log(res.getHeaders()['set-cookie']);
    res.status(200).json({
      message: '로그인 성공',
      data: userInfo,
    });
  } catch (err) {
    console.error(err)
    return res.status(404).json({
      message: '회원정보가 존재하지 않습니다.',
    });
  }
};
export default {regist, signin};
