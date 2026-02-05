import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType; // 선택: div | section | main 등
}

export default function Container({ children, className, as: Component = 'div' }: ContainerProps) {
  return (
    <Component
      className={cn('w-full mx-auto max-w-300 box-border', 'px-4 lg:px-0 sm:px-6', className)}
    >
      {children}
    </Component>
  );
}
