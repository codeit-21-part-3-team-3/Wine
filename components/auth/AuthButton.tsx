import { useAuth } from '@/providers/Auth/AuthProvider';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../common/ui/Avatar';
import defaultUserImage from '@/assets/images/default-user-image.png';
import { Dropdown } from '../common/ui/Dropdown';

export default function AuthButton() {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return <div className="w-10 h-10" />;
  }

  if (!user) {
    return (
      <Link href="/login" className="font-normal text-primary-foreground">
        로그인
      </Link>
    );
  }

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Avatar>
          <AvatarImage src={user.image || defaultUserImage.src} alt={user.nickname} />
          <AvatarFallback>{user.nickname?.[0] ?? '?'}</AvatarFallback>
        </Avatar>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>
          <Link href="/mypage" className="block w-full">
            마이페이지
          </Link>
        </Dropdown.Item>
        <Dropdown.Item onClick={logout}>로그아웃</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
