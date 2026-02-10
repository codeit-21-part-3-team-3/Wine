import { UserInReview } from '@/types/domain/review';
import { formatTimeAgo } from '@/utils/formatTimeAgo';

interface ReviewUserProps {
  user: UserInReview;
  createdAt: Date;
}

export default function ReviewUser({ user, createdAt }: ReviewUserProps) {
  return (
    <div className="flex items-center gap-4 text-gray-500">
      <img src={user.image} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
      <div className="flex flex-col items-start">
        <span className="font-semibold text-muted-foreground text-lg">{user.name}</span>
        <span className="text-gray-400">{formatTimeAgo(createdAt)}</span>
      </div>
    </div>
  );
}
