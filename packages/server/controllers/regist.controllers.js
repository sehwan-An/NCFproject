import User from '../models/User.js';

const regist = async (req, res) => {
  const { username, userpwd, userid, userphone } = req.body;
  console.log(req.body);

//   res.send('new user is created!!!!');

  try {
    const existUser = await User.findOne({
      $or: [ { username }, { userphone }],
    });
    if (existUser) {
      return res.status(400).json({
        message: '해당 정보로 등록된 사용자가 이미 존재합니다.',
      });
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).json({
        status: 'success',
        data: user
    })
  } catch (err) {
    console.log('regist is failed :', err);
  }
};
export default regist;
