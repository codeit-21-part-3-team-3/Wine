import { useState } from 'react';
import { useRouter } from 'next/navigation';

import AuthLayout from '@/components/common/layout/AuthLayout';
import FormField from '@/components/common/form/FormField';
import Button from '@/components/common/ui/Button';
import Link from 'next/link';

import { useAuth } from '@/providers/Auth/AuthProvider';

export default function SignIn() {
  const router = useRouter();
  const { login } = useAuth();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = id => e => {
    setValues(prev => ({
      ...prev,
      [id]: e,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await login(values);
    if (res?.success) {
      router.push('/');
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col gap-6 mb-10">
          <FormField
            id="email"
            label="이메일"
            placeholder="이메일을 입력해주세요"
            type="text"
            onChange={handleChange('email')}
          />

          <FormField
            id="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            onChange={handleChange('password')}
          />
        </div>

        <div className="flex flex-col gap-8">
          <Button type="submit" className="h-[50px]">
            로그인
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
