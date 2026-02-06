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
          <button className="h-11 w-11">
            <Avatar>
              {userImage && <AvatarImage src={userImage} alt="userImage" />}
              <AvatarFallback>
                <Image src={defaultUserImage} alt="defaultUserImage" />
              </AvatarFallback>
            </Avatar>
          </button>
        )}
      </div>
    </header>
  );
}
