import AuthLayout from '@/components/common/layout/AuthLayout';
import FormField from '@/components/common/form/FormField';
import Button from '@/components/common/ui/Button';
import Link from 'next/link';
import { useForm } from '@/hooks/useForm/useForm';
import type { FieldErrors } from '@/hooks/useForm';

import { useRouter } from 'next/router';
import { useAuth } from '@/providers/Auth/AuthProvider';
import { toast } from '@/components/common/ui/Toast';

type SignInValues = {
  email: string;
  password: string;
};

import { getAuthUrl } from '@/utils/auth';

export default function SignIn() {
  const router = useRouter();
  const { login } = useAuth();
  const { register, handleSubmit, errors } = useForm<SignInValues>({ mode: 'onSubmit' });

  const valid = async (data: SignInValues) => {
    try {
      await login(data);

      const referrer = document.referrer;
      const host = window.location.host;

      if (referrer && referrer.includes(host) && !referrer.includes('/auth/')) {
        router.push(referrer);
      } else {
        router.push('/');
      }
    } catch {
      toast.error('이메일 또는 비밀번호를 확인해주세요.', {
        title: '로그인 실패',
      });
    }
  };

  const handleLogin = (provider: 'google' | 'kakao' | 'naver') => {
    window.location.href = getAuthUrl(provider);
  };

  const Invalid = (errors: FieldErrors<SignInValues>) => {
    const firstError = Object.values(errors)[0];
    if (!firstError) return;
    toast.error(firstError, {
      title: '로그인 실패',
    });
  };

  return (
    <AuthLayout>
      <form className="flex flex-col" onSubmit={handleSubmit(valid, Invalid)}>
        <div className="flex flex-col gap-6 mb-10">
          <FormField
            id="email"
            label="이메일"
            placeholder="이메일을 입력해주세요"
            type="text"
            {...register('email', {
              required: '이메일을 입력해주세요',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '올바른 이메일 형식이 아닙니다',
              },
            })}
            error={errors.email}
          />

          <FormField
            id="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            {...register('password', {
              required: '비밀번호를 입력해주세요',
            })}
            error={errors.password}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button type="submit" className="h-[50px]">
            로그인
          </Button>

          <Button
            type="button"
            className="flex items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 active:bg-gray-100"
            onClick={() => handleLogin('google')}
          >
            구글 로그인
          </Button>
          <Button
            type="button"
            className="flex items-center justify-center gap-3 rounded-lg bg-[#FEE500] py-3 text-sm font-semibold text-[#191919] transition-opacity hover:opacity-90 active:opacity-100"
            onClick={() => handleLogin('kakao')}
          >
            카카오 로그인
          </Button>
          <Button
            type="button"
            className="flex items-center justify-center gap-3 rounded-lg bg-[#03C75A] py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 active:opacity-100"
            onClick={() => handleLogin('naver')}
          >
            네이버 로그인
          </Button>

          <div className="flex justify-center items-center gap-2 text-sm">
            <span className="text-muted-foreground">계정이 없으신가요?</span>
            <Link href="/auth/signup" className="text-primary underline font-medium">
              회원가입하기
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}
