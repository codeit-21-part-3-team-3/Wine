import { useAuth } from '@/providers/Auth/AuthProvider';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/auth/signin');
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <div>인증 확인 중...</div>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
