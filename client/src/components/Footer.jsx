import React from 'react';
import Link from './Link';

const Footer = () => {
  return (
    <footer className="hidden md:block border-t py-6">
      <div className="container flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4 text-sm text-gray-500">
        <div>© 2025 里弄餐厅. 版权所有.</div>
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:underline">
            隐私政策
          </Link>
          <Link to="/terms" className="hover:underline">
            使用条款
          </Link>
          <Link to="/contact" className="hover:underline">
            联系我们
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
