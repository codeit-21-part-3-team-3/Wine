import defaultUserImage from '@/assets/images/default-user-image.png';
import { cn } from '@/utils/cn';
import { ImagePicker } from './ImagePicker';
import { Avatar, AvatarFallback, AvatarImage } from './Avatar/Avatar';
import Icon from './Icon';

interface AvatarPickerProps {
  nickname: string;
  currentImage?: string | null;
  preview: string | null;
  error?: string | null;
  uploading?: boolean;
  onSelect: (file: File) => void;
  className?: string;
}

export default function AvatarPicker({
  nickname,
  currentImage,
  preview,
  uploading,
  onSelect,
  className,
}: AvatarPickerProps) {
  const fallback = nickname?.[0] ?? '?';
  const imageSrc = preview || currentImage || defaultUserImage;

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <ImagePicker
        preview={null}
        error={undefined}
        uploading={uploading}
        onSelect={onSelect}
        className="border-0 p-0 w-auto h-auto"
        placeholder={
          <div
            className={cn(
              'relative rounded-full overflow-hidden group w-20 h-20 md:w-25 md:h-25 lg:w-41 lg:h-41',
              uploading && 'pointer-events-none opacity-80'
            )}
          >
            <Avatar className="w-full h-full">
              <AvatarImage src={imageSrc} alt={nickname} sizes="164px" />
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <Icon name="camera" size={40} />
            </div>
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white text-sm">
                업로드 중...
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}
