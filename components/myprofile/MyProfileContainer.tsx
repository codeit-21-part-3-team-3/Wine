import { useAuth } from '@/providers/Auth/AuthProvider';
import MyProfilePage from './MyProfilePage';
import { useMyReviews, useMyWines, useUpdateProfile } from '@/hooks/myprofile';
import { deleteWine } from '@/lib/api/wine/wine';
import { toast } from '../common/ui/Toast';
import type { Wine } from '@/types/domain/wine';
import type { WineListItem } from '@/lib/api/wine/wine.types';

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

  const handleDeleteWine = async (id: number) => {
    try {
      await deleteWine(id);
      winesState.removeLocalWine(id);
      toast.success('와인이 삭제되었습니다.');
    } catch {
      toast.error('와인 삭제에 실패했습니다.');
    }
  };

  const handleUpdateWineLocal = (id: number, wine: Wine) => {
    const patch: Partial<WineListItem> = {
      name: wine.name,
      price: wine.price,
      region: wine.region,
      image: wine.image,
      type: wine.type,
    };
    winesState.updateLocalWine(id, patch);
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
      onDeleteWine={handleDeleteWine}
      onUpdateWineLocal={handleUpdateWineLocal}
      onUpdateProfile={profileState.updateProfile}
      isUpdating={profileState.isUpdating}
      error={errors}
    />
  );
}
