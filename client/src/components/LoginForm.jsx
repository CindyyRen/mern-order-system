import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';

export default function LoginForm() {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/orders';

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ username, password })).unwrap();

      // 登录成功，跳转首页
      // navigate('/');
      // 登录成功，跳转回原始页面 or 默认到 /orders
      navigate(from, { replace: true });
    } catch (err) {
      // 登录失败，处理错误
      console.error('登录失败:', err);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-4 border rounded"
    >
      <h2 className="text-xl mb-4 font-semibold text-center">员工登录</h2>

      <label className="block mb-2">
        用户名
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      <label className="block mb-4">
        密码
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {status === 'loading' ? '登录中...' : '登录'}
      </button>

      {status === 'failed' && (
        <p className="mt-4 text-red-600 text-center">{error}</p>
      )}
    </form>
  );
}
