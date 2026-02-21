import { UserInReview } from '@/types/domain/review';
import { formatTimeAgo } from '@/utils/formatTimeAgo';

interface ReviewUserProps {
  user: UserInReview;
  createdAt: string | Date;
}

export default function ReviewUser({ user, createdAt }: ReviewUserProps) {
  const date = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;

  return (
    <div className="flex items-center gap-4 text-gray-500">
      <img src={user.image ?? undefined} className="w-16 h-16 rounded-full object-cover" />
      <div className="flex flex-col items-start">
        <span className="font-semibold text-muted-foreground text-lg">{user.nickname}</span>
        <span className="text-gray-400">{formatTimeAgo(date)}</span>
      </div>
    </div>
  );
}
