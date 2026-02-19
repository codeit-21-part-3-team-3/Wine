import { useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import MyReviewsPanel from './MyReviewsPanel';
import { mockMyReviews } from '@/mock/review.my.mock';
import MyWinesPanel from './MyWinesPanel';
import { mockWineData } from '@/mock/wine.mock';
import MyProfileLayout from './MyProfileLayout';
import MyProfileTabs from './MyProfileTabs';

type Tab = 'reviews' | 'wines';

const mockUser = {
  image: null,
  nickname: '주말와인',
};

export default function MyProfilePage() {
  const [tab, setTab] = useState<Tab>('wines');
  const [nickname, setNickname] = useState(mockUser.nickname);

  return (
    <MyProfileLayout
      sidebar={
        <ProfileSidebar
          user={mockUser}
          nickname={nickname}
          onNicknameChange={setNickname}
          onSubmit={() => console.log('변경할 닉네임:', nickname)} // 임시
        />
      }
      content={
        <>
          <MyProfileTabs value={tab} onChange={setTab} />
          {tab === 'reviews' && <MyReviewsPanel reviews={mockMyReviews} />}
          {tab === 'wines' && <MyWinesPanel wines={mockWineData.list} />}
        </>
      }
    />
  );
}
