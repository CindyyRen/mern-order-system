import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

const MOCK_USER = {
  username: 'staff',
  password: '123456',
  role: 'cashier',
};

// 登录接口
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (
    username === MOCK_USER.username &&
    password === MOCK_USER.password
  ) {
    // ✅ 用 jwt 签发 token
    const token = jwt.sign(
      {
        username: MOCK_USER.username,
        role: MOCK_USER.role,
      },
      process.env.JWT_SECRET, // 从 .env 中读取密钥
      { expiresIn: '2h' } // 设置有效期
    );

    return res.status(200).json({
      token,
      user: {
        username: MOCK_USER.username,
        role: MOCK_USER.role,
      },
    });
  }

  return res.status(401).json({ message: '用户名或密码错误' });
});

export default router;
