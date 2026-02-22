import emptyIcon from '@/assets/images/empty.png';
import { cn } from '@/utils/cn';
import Image from 'next/image';

interface EmptyStateProps {
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col flex-1 items-center justify-center py-20 text-center',
        className
      )}
    >
      <Image src={emptyIcon} alt="" aria-hidden width={136} height={136} className="mb-4" />
      <p className="text-2xl font-semibold text-muted-foreground mb-3">{title}</p>
      {description && <div className="text-lg text-gray-300">{description}</div>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
