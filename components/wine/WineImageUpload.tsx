import { useImagePicker } from '@/hooks/imagePicker/useImagePicker';
import { isImage, maxSize } from '@/utils/imagePicker/ImageValidation';
import { ImagePicker } from '../common/ui/ImagePicker';
import IconButton from '../common/ui/IconButton';

interface WineImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  error?: string | null;
}

const RULES = [isImage, maxSize(5 * 1024 * 1024)];

export default function WineImageUpload({ value, onChange, error }: WineImageUploadProps) {
  const {
    preview,
    error: imagePickerError,
    uploading,
    handleFile,
  } = useImagePicker({
    rules: RULES,
    onUploaded: onChange,
  });
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">와인 사진</span>
      <ImagePicker
        preview={preview || value || null}
        error={imagePickerError ?? error}
        uploading={uploading}
        onSelect={handleFile}
        placeholder={<IconButton icon="camera" size={24} className="pointer-events-none" />}
      />
    </div>
  );
}
