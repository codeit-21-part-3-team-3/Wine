import Image from 'next/image';
import Label from '@/components/common/ui/Label';
import Input from '@/components/common/ui/Input';
import ErrorIcon from '@/assets/icon/icon-input-error.svg';

export default function Inputpage() {
  return (
    <div className="flex flex-col mx-auto w-[400px] mt-10">
      <h1 className="text-[20px] font-bold mb-5">공통 input 테스트 페이지</h1>

      <form className="flex flex-col gap-5">
        <div>
          <Label htmlFor="user-email">이메일 주소</Label>
          <Input id="user-email" type="text" placeholder="Whyne@gmail.com" autoComplete="email" />
        </div>

        <div>
          <Label htmlFor="content">내용</Label>
          <Input id="content" type="text" placeholder="내용을 입력하세요" />
        </div>

        <div>
          <Label htmlFor="user-nickname">닉네임</Label>
          <div className="relative flex items-center">
            <Input
              id="user-nickname"
              type="text"
              placeholder="닉네임을 입력하세요"
              autoComplete="off"
              className="border-[#FF6B6B]"
            />
            <div className="absolute right-4 flex items-center pointer-events-none">
              <Image src={ErrorIcon} alt="" width={24} height={24} aria-hidden="true" />
            </div>
          </div>
          <p className="text-[#FF4242] text-[12px] mt-1">에러 메시지를 입력해주세요</p>
        </div>

        <div>
          <Label htmlFor="user-password">비밀번호</Label>
          <Input
            id="user-password"
            type="password"
            placeholder="8자리 이상 입력"
            autoComplete="new-password"
          />
        </div>
      </form>
    </div>
  );
}
