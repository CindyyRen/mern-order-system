import React from 'react';
import LoginForm from '@/components/LoginForm'; // 把刚才那个 form 拆成独立组件

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
