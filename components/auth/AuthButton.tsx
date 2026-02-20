import { useAuth } from '@/providers/Auth/AuthProvider';
import Link from 'next/link';
import { Dropdown } from '../common/ui/Dropdown';
import UserProfile from '../common/ui/User/UserProfile';
import AvatarSkeleton from '../common/ui/Avatar/AvatarSkeleton';

export default function AuthButton() {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return <AvatarSkeleton className="md:w-10 md:h-10" />;
  }

  if (!user) {
    return (
      <Link href="/auth/signin" className="font-normal text-primary-foreground">
        로그인
      </Link>
    );
  }

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <UserProfile user={user} />
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
