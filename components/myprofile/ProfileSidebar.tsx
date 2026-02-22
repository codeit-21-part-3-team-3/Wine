import { User } from '@/types/auth/auth';
import Button from '../common/ui/Button';
import FormField from '../common/form/FormField';
import AvatarPicker from '../common/ui/AvatarPicker';
import Spinner from '../common/ui/Spinner';

type UserProfile = Pick<User, 'image' | 'nickname'>;

interface ProfileSidebarProps {
  user: UserProfile;
  nickname: string;
  onNicknameChange: (value: string) => void;
  avatarPreview: string | null;
  avatarError?: string | null;
  avatarUploading?: boolean;
  onSelectAvatar: (file: File) => void;
  onSubmit: () => void;
  submitDisabled?: boolean;
  isUpdating?: boolean;
  error?: string;
}

export default function ProfileSidebar({
  user,
  nickname,
  onNicknameChange,
  avatarPreview,
  avatarError,
  avatarUploading,
  onSelectAvatar,
  onSubmit,
  submitDisabled,
  isUpdating,
  error,
}: ProfileSidebarProps) {
  return (
    <div className="w-full flex flex-col mt-12 sticky top-10 items-center gap-5">
      <AvatarPicker
        nickname={user.nickname}
        currentImage={user.image}
        preview={avatarPreview}
        error={avatarError}
        uploading={avatarUploading}
        onSelect={onSelectAvatar}
      />
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
          disabled={submitDisabled || isUpdating}
          onClick={onSubmit}
        >
          {isUpdating && <Spinner size="xs" />}
          {isUpdating ? '' : '변경하기'}
        </Button>
      </div>
    </div>
  );
}
