import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import OrdersPage from './pages/OrderPage';
import ZongziDetail from './pages/ZongziDetailPage';
import CategoryDetail from './pages/CategoryDetailPage';
import LoginPage from './pages/LoginPage';
import { Toaster } from 'react-hot-toast';
import RequireAuth from '@/components/RequireAuth';

function App() {
  return (
    <Router>
      <Toaster position="bottom-right" />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/categories/:categorySlug" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          {/* <Route path="/orders" element={<OrdersPage />} /> */}
          <Route
            path="/orders"
            element={
              <RequireAuth>
                <OrdersPage />
              </RequireAuth>
            }
          />
          <Route path="/zongzi" element={<ZongziDetail />} />
          <Route path="/categories" element={<CategoryDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
