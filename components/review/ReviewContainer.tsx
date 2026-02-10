import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

interface ReviewContainerProps {
  header?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function ReviewContainer({ header, children, className }: ReviewContainerProps) {
  return (
    <article className={cn('flex flex-col gap-3 rounded-xl bg-white p-5', className)}>
      {header && <div>{header}</div>}
      {children}
    </article>
  );
}
