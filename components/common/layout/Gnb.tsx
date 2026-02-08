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
      </div>
    </header>
  );
}

/**
 * @todo(auth, @jaywai-lee, 2026-02-06)
 *
 * Gnb는 레이아웃 전용 컴포넌트로 유지합니다.
 * 인증 상태/유저 데이터는 해당 컴포넌트가 직접 관리하지 않으며,
 * 로그인 기능 구현 후(로그인 상태를 관리할 수 있을 때)
 * - 우측 영역에 <AuthButton /> 추가하여
 * - AuthButton 내부에서 로그인/프로필 분기 처리 할 예정입니다.
 */
