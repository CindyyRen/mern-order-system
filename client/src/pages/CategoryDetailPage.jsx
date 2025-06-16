import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import CategoryMenu from '@/components/CategoryMenu';
import { fetchCategories } from '@/features/category/categorySlice';
import combo2 from '../assets/combo2.png';

const CategoryDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const {
    items: categories,
    loading: catLoading,
    error: catError,
  } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (category_id) => {
    setActiveCategory(category_id);
    navigate(`/categories/${category_id}`);
  };

  if (catLoading) {
    return <div>菜单加载中…</div>;
  }
  if (catError) {
    return <div>加载菜单出错：{catError.message || catError}</div>;
  }

  return (
    <div>

      {categories && (
        <CategoryMenu
          isMobile
          categories={categories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />
      )}
    </div>
  );
};

export default CategoryDetailPage;
