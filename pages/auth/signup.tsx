import AuthLayout from '@/components/common/layout/AuthLayout';
import FormField from '@/components/common/form/FormField';
import Button from '@/components/common/ui/Button';
import Link from 'next/link';
import { useForm } from '@/hooks/useForm/useForm';
import { useRouter } from 'next/router';
import { useAuth } from '@/providers/Auth/AuthProvider';
import { toast } from '@/components/common/ui/Toast';

type SignUpValues = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

export default function SignUp() {
  const router = useRouter();
  const { signup } = useAuth();
  const { register, handleSubmit, errors } = useForm<SignUpValues>({ mode: 'onTouched' });

  const valid = async (data: SignUpValues) => {
    try {
      await signup(data);
      router.push('/');
    } catch (error) {
      const apiError = error as { data: { message: string } };
      toast.error(apiError.data.message, {
        title: '회원가입 실패',
      });
    }
  };

  return (
    <AuthLayout>
      <form className="flex flex-col" onSubmit={handleSubmit(valid)}>
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
            id="nickname"
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            type="text"
            {...register('nickname', {
              required: '닉네임을 입력해주세요',
              minLength: {
                value: 2,
                message: '닉네임은 2자 이상이어야 합니다',
              },
              maxLength: {
                value: 10,
                message: '닉네임은 10자 이하이어야 합니다',
              },
            })}
            error={errors.nickname}
          />

          <FormField
            id="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              minLength: {
                value: 8,
                message: '비밀번호는 8자 이상이어야 합니다',
              },
              pattern: {
                value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
                message: '비밀번호는 영문, 숫자, 특수문자(!@#$%^&*)만 사용 가능합니다',
              },
              deps: ['passwordConfirmation'],
            })}
            error={errors.password}
          />

          <FormField
            id="passwordConfirmation"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요"
            type="password"
            {...register('passwordConfirmation', {
              required: '비밀번호 확인을 입력해주세요',
              validate: (value, values) =>
                value === values.password ? undefined : '비밀번호가 일치하지 않습니다',
            })}
            error={errors.passwordConfirmation}
          />
        </div>

        <div className="flex flex-col gap-8">
          <Button type="submit" className="h-[50px]">
            가입하기
          </Button>

          <div className="flex justify-center items-center gap-2 text-sm">
            <span className="text-muted-foreground">계정이 있으신가요?</span>
            <Link href="/auth/signin" className="text-primary underline font-medium">
              로그인하기
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}
