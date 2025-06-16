import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  return (
    <div>
      CategoryPage
      <div>你选中了分类：{categorySlug}</div>
    </div>
  );
};

export default CategoryPage;
