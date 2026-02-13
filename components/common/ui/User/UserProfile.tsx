import { Avatar, AvatarFallback, AvatarImage } from '../Avatar';
import type { User } from '@/types/auth/auth';
import defaultUserImage from '@/assets/images/default-user-image.png';

type UserProfile = Pick<User, 'nickname' | 'image'>;

interface UserProfileProps {
  user: UserProfile;
  className?: string;
}

export default function UserProfile({ user, className }: UserProfileProps) {
  const imageSrc = user.image || defaultUserImage.src;
  const fallback = user.nickname?.[0] ?? '?';

  return (
    <div>
      <Avatar className="w-5 h-5 md:w-10 md:h-10">
        <AvatarImage src={imageSrc} alt={user.nickname} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    </div>
  );
}
