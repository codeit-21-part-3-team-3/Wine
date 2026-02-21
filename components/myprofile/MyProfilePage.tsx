import { useEffect, useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import MyReviewsPanel from './MyReviewsPanel';
import MyWinesPanel from './MyWinesPanel';
import MyProfileLayout from './MyProfileLayout';
import MyProfileTabs from './MyProfileTabs';
import { ApiReview } from '@/lib/api/review/review.types';
import { WineListItem } from '@/lib/api/wine/wine.types';
import { ApiUser } from '@/lib/api/user/user.types';
import { useProfileEditor } from '@/hooks/myprofile/userProfileEditor';

type Tab = 'reviews' | 'wines';

type UserProfile = Pick<ApiUser, 'image' | 'nickname'>;

interface MyProfileErrors {
  profile?: string | null;
  reviews?: string | null;
  wines?: string | null;
}

interface MyProfilePageProps {
  user: UserProfile;
  reviews: ApiReview[];
  wines: WineListItem[];
  loadingReviews: boolean;
  loadingWines: boolean;
  onFetchReviews: () => void;
  onFetchWines: () => void;
  onUpdateProfile: (nickname: string, imageUrl?: string | null) => void;
  isUpdating: boolean;
  error?: MyProfileErrors;
}

export default function MyProfilePage({
  user,
  reviews,
  wines,
  loadingReviews,
  loadingWines,
  onFetchReviews,
  onFetchWines,
  onUpdateProfile,
  isUpdating,
  error,
}: MyProfilePageProps) {
  const [tab, setTab] = useState<Tab>('reviews');
  const editor = useProfileEditor(user);

  useEffect(() => {
    if (tab === 'reviews') onFetchReviews();
    if (tab === 'wines') onFetchWines();
  }, [tab, onFetchReviews, onFetchWines]);

  const handleSubmit = () => {
    onUpdateProfile(editor.derived.nextNickname, editor.derived.nextImage);
    editor.resetUploadedImage();
  };

  return (
    <MyProfileLayout
      sidebar={
        <ProfileSidebar
          user={user}
          nickname={editor.nickname}
          onNicknameChange={editor.setNickname}
          avatarPreview={editor.picker.preview}
          avatarError={editor.picker.error}
          avatarUploading={editor.picker.uploading}
          onSelectAvatar={editor.picker.handleFile}
          onSubmit={handleSubmit}
          submitDisabled={editor.derived.isDisabled}
          isUpdating={isUpdating}
          error={error?.profile ?? undefined}
        />
      }
      content={
        <>
          <MyProfileTabs value={tab} onChange={setTab} />
          {tab === 'reviews' &&
            (loadingReviews ? (
              <div>리뷰 불러오는 중...</div>
            ) : reviews.length === 0 ? (
              <div>작성한 리뷰가 없습니다.</div>
            ) : (
              <MyReviewsPanel reviews={reviews} />
            ))}
          {tab === 'wines' &&
            (loadingWines ? (
              <div>와인 불러오는 중...</div>
            ) : wines.length === 0 ? (
              <div>등록한 와인이 없습니다.</div>
            ) : (
              <MyWinesPanel wines={wines} />
            ))}
        </>
      }
    />
  );
}
