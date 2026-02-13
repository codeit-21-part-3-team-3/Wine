import AuthLayout from '@/components/common/layout/AuthLayout';
import FormField from '@/components/common/form/FormField';
import Button from '@/components/common/ui/Button';
import Link from 'next/link';

export default function SignIn() {
  return (
    <AuthLayout>
      <form className="flex flex-col">
        <div className="flex flex-col gap-6 mb-10">
          <FormField id="email" label="이메일" placeholder="이메일을 입력해주세요" type="text" />

          <FormField
            id="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            type="password"
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
