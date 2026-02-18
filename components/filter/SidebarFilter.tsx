import { ComponentProps } from 'react';
import FilterContent from './FilterContent';
import { cn } from '@/utils/cn';
import Button from '../common/ui/Button';

type FilterContentProps = ComponentProps<typeof FilterContent>;

interface SidebarFilterProps extends Omit<FilterContentProps, 'actions'> {
  onApply: () => void;
  className?: string;
}

export default function SidebarFilter({ onApply, className, ...props }: SidebarFilterProps) {
  return (
    <aside className={cn('sticky top-20 w-full', className)}>
      <FilterContent {...props} actions={<Button onClick={onApply}>필터 적용하기</Button>} />
    </aside>
  );
}
