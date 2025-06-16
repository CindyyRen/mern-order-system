import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuCard from '@/components/MenuCard ';

function CategoryPage() {
  const { categorySlug } = useParams();
  const allItems = useSelector((state) => state.menu.items); // 确保取的是 items 数组
  const categories = useSelector((state) => state.category.items); // 同上

  // 如果还在加载中（或为空），可以先返回 loading 状态
  if (!categories.length || !allItems.length) {
    return <div>Loading...</div>;
  }

  // 构建 ID -> slug 的映射
  const categoryIdToSlugMap = {};
  categories.forEach((cat) => {
    categoryIdToSlugMap[cat._id] = cat.category_id;
  });

  // 根据 slug 过滤菜单
  const filteredItems = allItems.filter((item) => {
    const itemSlug = categoryIdToSlugMap[item.category];
    return itemSlug === categorySlug;
  });

  return (
    <div>
      <h2>{categorySlug} 分类下的菜单</h2>
      {filteredItems.length === 0 ? (
        <p>暂无该分类下的菜品</p>
      ) : (
        <ul>
          {filteredItems.map((item) => (
            // <li key={item._id}>{item.nameCn || item.name}</li>
            <MenuCard key={item._id} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryPage;
