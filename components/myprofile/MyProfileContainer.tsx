import { useAuth } from '@/providers/Auth/AuthProvider';
import MyProfilePage from './MyProfilePage';
import { useMyReviews } from '@/hooks/myprofile/useMyReviews';
import { useMyWines } from '@/hooks/myprofile/useMyWines';
import { useUpdateProfile } from '@/hooks/myprofile/useUpdateProfile';

interface MyProfileErrors {
  profile?: string | null;
  reviews?: string | null;
  wines?: string | null;
}

export default function MyProfileContainer() {
  const { user } = useAuth();

  const reviewsState = useMyReviews();
  const winesState = useMyWines();
  const profileState = useUpdateProfile();

  const errors: MyProfileErrors = {
    profile: profileState.error,
    reviews: reviewsState.error,
    wines: winesState.error,
  };

  if (!user) return null;

  const profileUser = {
    nickname: user.nickname,
    image: user.image,
  };
  return (
    <MyProfilePage
      key={`${user.nickname}-${user.image}`}
      user={profileUser}
      reviews={reviewsState.reviews}
      wines={winesState.wines}
      loadingReviews={reviewsState.loading}
      loadingWines={winesState.loading}
      onFetchReviews={reviewsState.fetch}
      onFetchWines={winesState.fetch}
      onUpdateProfile={profileState.updateProfile}
      isUpdating={profileState.isUpdating}
      error={errors}
    />
  );
}
