import Label from '@/components/common/ui/Label';
import Input from '@/components/common/ui/Input';

export default function Inputpage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto', width: '400px' }}>
      <h1 style={{ fontSize: '20px', marginBottom: '20px' }}>공통 input 테스트 페이지</h1>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
          <Input
            id="user-nickname"
            type="text"
            placeholder="닉네임을 입력하세요"
            errorMessage="에러 메시지를 입력해주세요"
            autoComplete="off"
          />
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
