import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('w-full mx-auto max-w-300 box-border', 'px-4 lg:px-0 sm:px-6', className)}>
      {children}
    </div>
  );
}
