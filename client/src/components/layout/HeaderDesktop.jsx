import { ShoppingCart, User, LogIn, LogOut } from 'lucide-react';
import Link from '../Link';
import { desktopNavLinks } from '@/constants/desktopNavLinks';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '@/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const HeaderDesktop = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.token);
  const cart = useSelector((state) => state.cart.items); // 假设你用 Redux 管理购物车
  const itemCount = cart.length; // 购物车里商品数量
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(itemCount);

  const handleLogout = () => {
    dispatch(logout());
    // 可选：清空 localStorage 里的 token，或其他清理操作
    navigate('/login'); // 或者跳首页
  };
  return (
    <header className="hidden md:block sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">里弄餐厅</span>
        </Link>
        <nav className="flex items-center gap-6">
          {desktopNavLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium transition-colors hover:text-orange-500 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-orange-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ShoppingCart />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-medium text-white">
              {itemCount}
            </span>
            <span className="sr-only">购物车</span>
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <User />
                <span className="sr-only">用户中心</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                title="退出登录"
                type="button"
              >
                <LogOut />
                <span className="sr-only">退出登录</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              title="登录"
            >
              <LogIn />
              <span className="sr-only">登录</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderDesktop;
