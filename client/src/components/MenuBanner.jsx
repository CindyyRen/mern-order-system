import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import buns from '../assets/resized_buns.png';

export default function MenuBanner() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-200 py-6 pl-4 rounded">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-6">
        {/* 左侧文字和按钮 */}
        <div className="text-left space-y-4 w-1/2">
          <h2 className="text-2xl font-bold text-gray-800">开始点餐</h2>
          <p>Craving something tasty?</p>
          <Button
            onClick={() => navigate('/menu')}
            className="bg-yellow-400 text-black hover:bg-yellow-300"
          >
            Start an Order
          </Button>
        </div>

        {/* 右侧图片，左侧完整显示，右侧超出隐藏 */}
        <div className="w-1/2 h-40 overflow-hidden">
          <img
            src={buns}
            alt="buns"
            className="h-full object-cover object-left"
            style={{ transform: 'scale(1.25)', transformOrigin: 'left center' }}
          />
        </div>
      </div>
    </div>
  );
}
