import { useRouter } from 'next/navigation';

import type { SubmitEvent } from 'react';

import Button from '@/components/common/ui/Button';
import Input from '@/components/common/ui/Input';

import { useAuth } from '@/providers/Auth/AuthProvider';

export default function SignUp() {
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get('email') as string;
    const nickname = formData.get('nickname') as string;
    const password = formData.get('password') as string;
    const passwordConfirmation = formData.get('passwordConfirmation') as string;

    const res = await fetch('/api/auth/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    });
    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    login(data);
    router.push('/');
  };
  return (
    <div>
      <form className="flex flex-col gap-2 max-w-[400px] mx-auto p-4" onSubmit={handleSubmit}>
        <Input type="text" name="email" placeholder="Email" />
        <Input type="text" name="nickname" placeholder="Nickname" />
        <Input type="password" name="password" placeholder="Password" />
        <Input type="password" name="passwordConfirmation" placeholder="Password Confirm" />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}
