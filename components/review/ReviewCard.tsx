import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

interface ReviewCardProps {
  header?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function ReviewCard({ header, children, className }: ReviewCardProps) {
  return (
    <article className={cn('flex flex-col gap-3 rounded-xl bg-white p-5', className)}>
      {header && <div>{header}</div>}
      {children}
    </article>
  );
}
