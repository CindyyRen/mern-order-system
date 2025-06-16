import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

const MobileCheckoutBar = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const hasItems = cart.items.length > 0;

  if (!isMobile || !hasItems) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffcc00',
        padding: '12px 16px',
        boxShadow: '0 -2px 6px rgba(0,0,0,0.15)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div style={{ fontWeight: 'bold' }}>
        购物车总价: ￥{cart.totalAmount.toFixed(2)}
      </div>
      <button
        onClick={() => navigate('/cart')}
        style={{
          backgroundColor: '#333',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        去结算
      </button>
    </div>
  );
};

export default MobileCheckoutBar;
