import Link from 'next/link';
import logo from '@/assets/logo/logo.png';
import Image from 'next/image';

export default function Gnb() {
  return (
    <header className="max-w-300 rounded-sm border-b border-border bg-primary md:mt-7 md:mx-5 lg:m-auto lg:mt-10">
      <div className="h-12 flex items-center justify-between mx-5 md:mx-10 md:h-17">
        <Link href="/">
          <Image src={logo} alt="logo" width={52} height={15} />
        </Link>

        <Link href="/login" className="font-normal text-primary-foreground">
          로그인
        </Link>
        {/**
         * @todo AuthButton - 로그인 상태에 따른 분기
         * @todo UserProfile - 단순 userimage 렌더 컴포넌트
         */}
      </div>
    </header>
  );
}
