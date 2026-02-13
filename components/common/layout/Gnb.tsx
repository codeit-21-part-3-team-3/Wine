import Link from 'next/link';
import logo from '@/assets/logo/logo.png';
import Image from 'next/image';
import AuthButton from '@/components/auth/AuthButton';

export default function Gnb() {
  return (
    <header className="max-w-300 rounded-sm bg-primary md:mt-7 md:mx-5 lg:m-auto lg:mt-10">
      <div className="h-12 flex items-center justify-between mx-5 md:mx-10 md:h-17">
        <Link href="/">
          <Image src={logo} alt="logo" width={52} height={15} />
        </Link>
        <AuthButton />
      </div>
    </header>
  );
}
