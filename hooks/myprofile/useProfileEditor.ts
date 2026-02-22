import { ApiUser } from '@/lib/api/user/user.types';
import { useEffect, useMemo, useState } from 'react';
import { useImagePicker } from '../imagePicker/useImagePicker';
import { isImage, maxSize } from '@/utils/imagePicker/ImageValidation';
import { updateMe } from '@/lib/api/user/user';
import { useAuth } from '@/providers/Auth/AuthProvider';
import { toast } from '@/components/common/ui/Toast';

type UserProfile = Pick<ApiUser, 'image' | 'nickname'>;

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function useProfileEditor(user: UserProfile) {
  const { updateUser } = useAuth();
  const [nickname, setNickname] = useState(() => user.nickname);

  const picker = useImagePicker({
    rules: [isImage, maxSize(MAX_FILE_SIZE)],
    onUploaded: async url => {
      try {
        const updated = await updateMe({
          image: url,
        });
        updateUser(updated);
      } catch {
        toast.error('프로필 이미지 업데이트 실패');
      }
    },
  });

  const derived = useMemo(() => {
    const nextNickname = nickname.trim();

    const isNicknameChange = nextNickname !== user.nickname;
    const isDirty = isNicknameChange;

    const isDisabled = !isDirty || !nextNickname || picker.uploading || !!picker.error;

    return {
      nextNickname,
      isDirty,
      isDisabled,
    };
  }, [nickname, user.nickname, picker.uploading, picker.error]);

  return {
    nickname,
    setNickname,
    picker,
    derived,
  };
}
