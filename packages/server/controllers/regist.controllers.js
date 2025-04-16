import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import ContactModel from '../models/UserContact.js';
import { jwtDecode } from 'jwt-decode';

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
      userpwd: bcrypt.hashSync(userpwd, 10),
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

const createContact = async (req, res) => {
  const { contact_title, contact_type, contact_content, contact_status } = req.body;
  console.log(req);
  const authorization = req.headers.authorization.split(' ')[1];
  if (!authorization) {
    return res.status(401).json({ message: '권한이없습니다.' });
  }
  const decode = jwtDecode(authorization);
  console.log(decode);
  try {
    const contact = await ContactModel.create({
      contact_title,
      contact_type,
      contact_content,
      contact_status,
      userid: decode.id,
      author: decode._id,
    });
    console.log(ContactModel);
    res.status(201).json({
      message: '문의가 등록되었습니다.',
      data: contact,
    });
  } catch (err) {
    console.log(err);
  }
};

const readContact = async (req, res) => {
  try {
    const contacts = await ContactModel.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    if (!contacts) {
      return res.status(500).json({
        message: 'contacts가 없습니다.',
      });
    }
    console.log(contacts);

    res.status(201).json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: '저장실패',
    });
  }
};

// function convertDate(date){
//   if (!date) return '날짜 없음';
//   const d = new Date(date);
//   if (isNaN(d)) return '유효하지 않음';

//   return d.toLocaleDateString('ko-KR', {
//       year: '2-digit',
//       month: '2-digit',
//       day: '2-digit',
//   }).replaceAll(',','').replaceAll(' ','-');
// }

const signin = async (req, res) => {
  const { userid, userpwd } = req.body;
  console.log(userid, userpwd);
  try {
    const user = await User.findOne({ userid });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        message: '아이디를 다시 확인하세요',
      });
    }
    const isMatch = bcrypt.compareSync(userpwd, user.userpwd);
    if (!isMatch) {
      return res.status(400).json({ message: '잘못된 비밀번호 입니다.' });
    }

    const userInfo = {
      name: user.username,
      id: user.userid,
      role: user.role,
      _id: user._id,
    };
    const token = jwt.sign(userInfo, process.env.JWT_SECRET);
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
    console.error(err);
    return res.status(404).json({
      message: '회원정보가 존재하지 않습니다.',
    });
  }
};

export default { regist, signin, createContact, readContact };
