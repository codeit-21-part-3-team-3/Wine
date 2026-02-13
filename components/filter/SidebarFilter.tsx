import { ComponentProps } from 'react';
import FilterContent from './FilterContent';
import { cn } from '@/utils/cn';
import Button from '../common/ui/Button';

type FilterContentProps = ComponentProps<typeof FilterContent>;

interface SidebarFilterProps extends Omit<FilterContentProps, 'footer'> {
  onApply: () => void;
  className?: string;
}

export default function SidebarFilter({ onApply, className, ...props }: SidebarFilterProps) {
  return (
    <aside className={cn('fixed top-20 w-71 z-10', className)}>
      <FilterContent {...props} footer={<Button onClick={onApply}>필터 적용하기</Button>} />
    </aside>
  );
}
