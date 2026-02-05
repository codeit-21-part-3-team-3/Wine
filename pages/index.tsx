import { Avatar, AvatarImage, AvatarFallback } from '@/components/common/ui/Avatar';

export default function Home() {
  const name = '테스트';

  return (
    <div>
      <h1>안녕하세요 {name}</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <p>
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
            <AvatarFallback>테스트</AvatarFallback>
          </Avatar>
        </p>

        <p>
          <Avatar>
            <AvatarImage src="https://localhost" />
            <AvatarFallback>이미지 없을때 폴백</AvatarFallback>
          </Avatar>
        </p>
      </div>
    </div>
  );
}
