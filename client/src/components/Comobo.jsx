import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import combo from '../assets/combo.png';

export default function ComboBanner() {
  const navigate = useNavigate();

  return (
    // <div className="w-full bg-gradient-to-r from-green-200 via-green-100 to-green-50 py-6 pl-4 rounded mt-4">
    <div className="w-full bg-gradient-to-r from-neutral-100 via-amber-50 to-white py-6 pl-4 rounded mt-4">
      {/* <div className="w-full bg-gradient-to-r from-yellow-100 via-orange-50 to-white py-6 pl-4 rounded mt-4"> */}
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-6">
        {/* 左侧文字和按钮 */}
        <div className="text-left space-y-4 w-1/2">
          <h2 className="text-2xl font-bold text-gray-800">新品套餐</h2>
          <p>New Meal Deal</p>
          <Button
            onClick={() => navigate('/menu')}
            className="bg-yellow-400 text-black hover:bg-yellow-300"
          >
            Start an Order
          </Button>
        </div>

        {/* 右侧图片，左侧完整显示，右侧超出隐藏 */}
        <div className="w-2/3 h-40 overflow-hidden">
          <img
            src={combo}
            alt="combo"
            className="h-full object-cover object-left"
            style={{ transform: 'scale(1.25)', transformOrigin: 'left center' }}
          />
        </div>
      </div>
    </div>
  );
}
