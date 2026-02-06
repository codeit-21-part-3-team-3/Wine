import Link from 'next/link';
import logo from '@/assets/logo/logo.png';
import Image from 'next/image';
import defaultUserImage from '@/assets/images/default-user-image.png';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';

interface NavProps {
  isLoggedIn: boolean;
  userImage?: string;
}

export default function Nav({ isLoggedIn, userImage }: NavProps) {
  return (
    <header className="max-w-300 rounded-sm border-b border-border bg-primary md:mt-7 md:mx-5 lg:m-auto lg:mt-10">
      <div className="h-12 flex items-center justify-between mx-5 md:mx-10 md:h-17">
        <Link href="/">
          <Image src={logo} alt="logo" width={52} height={15} />
        </Link>

        {!isLoggedIn ? (
          <Link href="/login" className="font-normal text-primary-foreground">
            로그인
          </Link>
        ) : (
          <button type="button" aria-label="로그인 메뉴" className="h-11 w-11 rounded-full">
            <Avatar>
              {userImage && (
                <AvatarImage
                  className="w-full h-full object-cover rounded-full"
                  src={userImage}
                  alt="사용자 프로필 이미지"
                />
              )}
              <AvatarFallback>
                <Image src={defaultUserImage} alt="기본 사용자 이미지" width={44} height={44} />
              </AvatarFallback>
            </Avatar>
          </button>
        )}
      </div>
    </header>
  );
}
