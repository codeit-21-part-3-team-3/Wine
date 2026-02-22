import { ApiUser } from '@/lib/api/user/user.types';
import { useEffect, useMemo, useState } from 'react';
import { useImagePicker } from '../imagePicker/useImagePicker';
import { isImage, maxSize } from '@/utils/imagePicker/ImageValidation';

type UserProfile = Pick<ApiUser, 'image' | 'nickname'>;

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function useProfileEditor(user: UserProfile) {
  const [nickname, setNickname] = useState(() => user.nickname);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const picker = useImagePicker({
    rules: [isImage, maxSize(MAX_FILE_SIZE)],
    onUploaded: url => setUploadedImageUrl(url),
  });

  const derived = useMemo(() => {
    const nextNickname = nickname.trim();
    const nextImage = uploadedImageUrl ?? user.image;

    const isNicknameChange = nextNickname !== user.nickname;
    const isImageChanged = nextImage !== user.image;

    const isDirty = isNicknameChange || isImageChanged;
    const isDisabled = !isDirty || !nextNickname || picker.uploading || !!picker.error;

    return {
      nextNickname,
      nextImage,
      isDirty,
      isDisabled,
    };
  }, [nickname, uploadedImageUrl, user.nickname, user.image, picker.uploading, picker.error]);

  const resetUploadedImage = () => setUploadedImageUrl(null);

  return {
    nickname,
    setNickname,
    uploadedImageUrl,
    setUploadedImageUrl,
    resetUploadedImage,
    picker,
    derived,
  };
}
