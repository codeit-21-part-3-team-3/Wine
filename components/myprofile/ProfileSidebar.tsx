import { User } from '@/types/auth/auth';
import { Avatar, AvatarFallback, AvatarImage } from '../common/ui/Avatar';
import Button from '../common/ui/Button';
import FormField from '../common/form/FormField';
import Icon from '../common/ui/Icon';
import defaultUserImage from '@/assets/images/default-user-image.png';
import { useEffect, useState } from 'react';

type UserProfile = Pick<User, 'image' | 'nickname'>;

interface ProfileSidebarProps {
  user: UserProfile;
  nickname: string;
  onNicknameChange: (value: string) => void;
  onSubmit: () => void;
  onImageChange?: (file: File | null) => void;
  isUpdating?: boolean;
  error?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

function getProfileDerivedState(user: UserProfile, nickname: string, preview: string | null) {
  const imageSrc = preview || user.image || defaultUserImage;
  const isNicknameChanged = nickname.trim() !== user.nickname;
  const isImageChanged = !!preview;
  const isDirty = isNicknameChanged || isImageChanged;

  return {
    imageSrc,
    isDisabled: !isDirty || !nickname.trim(),
  };
}

export default function ProfileSidebar({
  user,
  nickname,
  onNicknameChange,
  onSubmit,
  onImageChange,
  isUpdating,
  error,
}: ProfileSidebarProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fallback = user.nickname?.[0] ?? '?';
  const fileInputId = 'profile-image-input';

  const { imageSrc, isDisabled } = getProfileDerivedState(user, nickname, preview);

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileError(null);

    if (!file.type.startsWith('image/')) {
      setFileError('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('파일 크기는 5MB 이하만 가능합니다.');
      return;
    }
    onImageChange?.(file);
    setPreview(prev => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    e.target.value = '';
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="w-full flex flex-col mt-12 sticky top-10 items-center gap-5">
      <label
        className="relative group cursor-pointer"
        htmlFor={fileInputId}
        aria-label="프로필 이미지 변경"
      >
        <Avatar className="lg:w-41 lg:h-41 md:w-25 md:h-25 w-20 h-20">
          <AvatarImage src={imageSrc} alt={user.nickname} sizes="164px" />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <Icon name="camera" size={40} />
        </div>
      </label>
      <input
        id={fileInputId}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleUploadFile}
      />
      {fileError && <p className="text-sm text-red-500">{fileError}</p>}
      <p className="text-2xl font-semibold mb-1">{user.nickname}</p>
      <div className="flex gap-4 lg:flex-col lg:items-center lg:justify-center">
        <div className="w-47.5 md:w-71.5 lg:w-60 lg:mb-3">
          <FormField
            id="nickname"
            label="닉네임"
            placeholder={user.nickname}
            value={nickname}
            onChange={e => onNicknameChange(e.target.value)}
            error={error}
          />
        </div>

        <Button
          className="self-end lg:self-center max-w-24.5"
          size="sm"
          disabled={isDisabled || isUpdating}
          onClick={onSubmit}
        >
          {isUpdating ? '처리 중...' : '변경하기'}
        </Button>
      </div>
    </div>
  );
}
