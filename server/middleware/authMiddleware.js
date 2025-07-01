// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: '未授权访问（缺少 token）' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 把解析后的用户信息放到 req 上，后面能用
    next();
  } catch (err) {
    return res.status(401).json({ message: '无效的 token' });
  }
};
