import { useEffect, useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import MyReviewsPanel from './MyReviewsPanel';
import MyWinesPanel from './MyWinesPanel';
import MyProfileLayout from './MyProfileLayout';
import MyProfileTabs from './MyProfileTabs';
import { useProfileEditor } from '@/hooks/myprofile/userProfileEditor';
import type { ApiReview, UpdateReviewRequest } from '@/lib/api/review/review.types';
import type { WineListItem } from '@/lib/api/wine/wine.types';
import type { ApiUser } from '@/lib/api/user/user.types';
import type { Wine } from '@/types/domain/wine';

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
  onDeleteWine: (id: number) => void;
  onUpdateWineLocal: (id: number, wine: Wine) => void;
  onDeleteReview: (id: number) => Promise<void> | void;
  onUpdateReview: (id: number, data: UpdateReviewRequest) => Promise<void>;
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
  onDeleteWine,
  onUpdateWineLocal,
  onDeleteReview,
  onUpdateReview,
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
    <>
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
            {tab === 'reviews' && (
              <MyReviewsPanel
                reviews={reviews}
                loading={loadingReviews}
                onUpdateReview={onUpdateReview}
                onDeleteReview={onDeleteReview}
              />
            )}
            {tab === 'wines' && (
              <MyWinesPanel
                wines={wines}
                loading={loadingWines}
                onDeleteWine={onDeleteWine}
                onUpdateWineLocal={onUpdateWineLocal}
              />
            )}
          </>
        }
      />
    </>
  );
}
