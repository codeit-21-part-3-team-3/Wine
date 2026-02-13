import { cn } from '@/utils/cn';

type Size = 'sm' | 'lg';

const sizeMap = {
  sm: 'w-5 h-5',
  lg: 'w-20 h-20',
};

interface AvatarSkeletonProps {
  size?: Size;
  className?: string;
}

export default function AvatarSkeleton({ size = 'sm', className }: AvatarSkeletonProps) {
  return <div className={cn('rounded-full bg-gray-200 animate-pulse', sizeMap[size], className)} />;
}
