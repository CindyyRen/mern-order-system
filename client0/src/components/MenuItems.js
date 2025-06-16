import { useSelector, useDispatch } from 'react-redux';
import { fetchMenu } from '../features/menu/menuSlice';
import { fetchCategories } from '../features/category/categoriesSlice';
import { useEffect } from 'react';

export default function MenuList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.menu);
  const categories = useSelector((state) => state.categories.items);

  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>

      {loading && <p>加载中...</p>}
      {error && <p>错误: {error}</p>}
      {categories.map((item) => (
        <div key={item._id}>
          {item._id} - ${item.price}
        </div>
      ))}
      {items.map((item) => (
        <div key={item._id}>
          {item.name} - ${item.price}
        </div>
      ))}
    </div>
  );
}
