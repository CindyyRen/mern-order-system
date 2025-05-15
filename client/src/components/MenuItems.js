import { useSelector, useDispatch } from 'react-redux';
import { fetchMenu } from '../features/menu/menuSlice';
import { useEffect } from 'react';

export default function MenuList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  return (
    <div>
      {loading && <p>加载中...</p>}
      {error && <p>错误: {error}</p>}
      {items.map((item) => (
        <div key={item._id}>
          {item.name} - ${item.price}
        </div>
      ))}
    </div>
  );
}
