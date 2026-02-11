// components/common/layout/AuthLayout.tsx
import { ReactNode } from 'react';
import Image from 'next/image';
import logoImg from '@/assets/logo/logo.png';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center pt-24 sm:pt-40 px-4">
      <div className="w-full max-w-[500px] bg-white rounded-2xl py-12 px-5 sm:py-20 sm:px-12">
        <div className="flex flex-col items-center mb-10 sm:mb-16">
          <Image
            className="brightness-0"
            src={logoImg}
            alt="Codeit Wine 로고"
            width={104}
            height={30}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
