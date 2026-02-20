import { useEffect, useState } from 'react';
import Image from 'next/image';
import camera from '@/assets/icons/camera.png';
import { cn } from '@/utils/cn';

interface WineImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  status?: 'default' | 'error';
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function WineImageUpload({ value, onChange, status }: WineImageUploadProps) {
  const [fileError, setFileError] = useState<string | null>(null);
  const preview = value ?? null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFileError('이미지 파일만 업로드할 수 있어요');
      e.target.value = '';
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('파일은 5MB 이하만 업로드 할 수 있어요');
      e.target.value = '';
      return;
    }
    setFileError(null);

    const url = URL.createObjectURL(file);
    onChange(url);
    e.target.value = '';
  };

  useEffect(() => {
    return () => {
      if (value?.startsWith('blob:')) {
        URL.revokeObjectURL(value);
      }
    };
  }, [value]);

  const isError = status === 'error' || !!fileError;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">와인 사진</span>

      <label
        htmlFor="wine-image"
        className={cn(
          'relative w-32 h-32 border border-input flex items-center justify-center cursor-pointer overflow-hidden',
          isError ? 'border-destructive' : 'border-input'
        )}
      >
        {preview ? (
          <Image src={preview} alt="preview" fill className="object-cover" />
        ) : (
          <Image src={camera} alt="사진 업로드" width={24} height={24} className="opacity-60" />
        )}
      </label>

      <input
        id="wine-image"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
      {fileError && <p className="text-red-500 text-[12px]">{fileError}</p>}
    </div>
  );
}
