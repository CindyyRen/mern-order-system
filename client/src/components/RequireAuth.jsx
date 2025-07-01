// components/RequireAuth.jsx
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const user = useSelector((state) => state.auth.user); // 你也可以用 token 判断
  const location = useLocation();

  if (!user) {
    // 未登录，重定向到登录页，并记下原路径
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
