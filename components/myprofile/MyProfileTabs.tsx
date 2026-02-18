import { cn } from '@/utils/cn';

interface MyProfileTabsProps {
  value: 'reviews' | 'wines';
  onChange: (tab: 'reviews' | 'wines') => void;
}

export default function MyProfileTabs({ value, onChange }: MyProfileTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="마이페이지 탭"
      className="flex gap-8 lg:border-l border-gray-200 pl-2 md:pl-5 lg:pl-10 pt-8 pb-5"
    >
      <button
        type="button"
        role="tab"
        id="tab-reviews"
        aria-selected={value === 'reviews'}
        aria-controls="panel-reviews"
        onClick={() => onChange('reviews')}
        className={cn(
          value === 'reviews' ? 'text-black' : 'text-gray-300',
          'cursor-pointer font-bold text-xl'
        )}
      >
        내가 쓴 후기
      </button>
      <button
        type="button"
        role="tab"
        id="tab-wines"
        aria-selected={value === 'wines'}
        aria-controls="panel-wines"
        onClick={() => onChange('wines')}
        className={cn(
          value === 'wines' ? 'text-black' : 'text-gray-300',
          'cursor-pointer font-bold text-xl'
        )}
      >
        내가 등록한 와인
      </button>
    </div>
  );
}
