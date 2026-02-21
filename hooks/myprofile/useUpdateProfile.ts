import { uploadImage } from '@/lib/api/infra/image';
import { updateMe } from '@/lib/api/user/user';
import { useAuth } from '@/providers/Auth/AuthProvider';
import { useState } from 'react';

export function useUpdateProfile() {
  const { user, updateUser } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (nickname: string, file?: File | null) => {
    if (!user) return;
    if (!file && nickname === user.nickname) return;

    try {
      setIsUpdating(true);

      let imageUrl = user.image;

      if (file) {
        const res = await uploadImage(file);
        imageUrl = res.url;
      }

      const updatedUser = await updateMe({
        nickname,
        image: imageUrl,
      });

      updateUser(updatedUser);
    } catch {
      setError('프로필 수정에 실패했습니다.');
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateProfile, isUpdating, error };
}
