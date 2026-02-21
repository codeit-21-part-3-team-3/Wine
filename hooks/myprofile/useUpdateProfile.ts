import { toast } from '@/components/common/ui/Toast';
import { updateMe } from '@/lib/api/user/user';
import { useAuth } from '@/providers/Auth/AuthProvider';
import { useState } from 'react';

export function useUpdateProfile() {
  const { user, updateUser } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (nickname: string, imageUrl?: string | null) => {
    if (!user) return;

    const nextNickname = nickname.trim();
    const nextImage = imageUrl ?? user.image;

    if (nextNickname === user.nickname && nextImage === user.image) return;

    try {
      setError(null);
      setIsUpdating(true);

      const body: { nickname: string; image?: string } = {
        nickname: nextNickname,
      };

      if (typeof nextImage === 'string' && nextImage.length > 0) {
        body.image = nextImage;
      }

      const updatedUser = await updateMe(body);

      updateUser(updatedUser);
      toast.success('프로필이 수정되었습니다.');
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('프로필 수정에 실패했습니다.');
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateProfile, isUpdating, error };
}
