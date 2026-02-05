import Label from '@/components/common/ui/Label';
import Input from '@/components/common/ui/Input';
import { useState } from 'react';

export default function InputPage() {
  // 1. 상태 관리가 잘 되는지 테스트하기 위한 state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="max-w-[400px] mx-auto mt-20 px-4 py-10">
      <h1 className="text-2xl font-bold mb-10 text-foreground">컴포넌트 테스트</h1>

      <form className="flex flex-col gap-6">
        {/* CASE 1: 가장 기본적인 텍스트 입력 */}
        <div>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {/* CASE 2: 비밀번호 & 에러 상태 테스트 */}
        <div>
          <Label htmlFor="password">비밀번호 (에러 상태 고정)</Label>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={true} // 강제로 에러 상태 부여
          />
          <p className="mt-1 text-sm text-[#FF6B6B]">비밀번호가 일치하지 않습니다.</p>
        </div>

        {/* CASE 3: AddonBefore (검색 아이콘) 테스트 */}
        <div>
          <Label htmlFor="search">검색</Label>
          <Input
            id="search"
            placeholder="검색어를 입력해보세요"
            addonBefore={<SearchIcon />} // 돋보기 아이콘 주입
          />
        </div>

        {/* CASE 4: AddonBefore (텍스트) 테스트 */}
        <div>
          <Label htmlFor="url">웹사이트 (텍스트 Addon)</Label>
          <Input
            id="url"
            placeholder="google.com"
            addonBefore="https://" // 텍스트 주입
          />
        </div>
      </form>
    </div>
  );
}

// 테스트용 돋보기 아이콘 (SVG)
function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}
