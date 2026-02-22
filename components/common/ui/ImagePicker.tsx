import { cn } from '@/utils/cn';
import Image from 'next/image';
import { useId } from 'react';

interface ImagePickerProps {
  preview: string | null;
  error?: string | null;
  uploading?: boolean;
  onSelect: (file: File) => void;
  className?: string;
  placeholder?: React.ReactNode;
}

export function ImagePicker({
  preview,
  error,
  uploading,
  onSelect,
  className,
  placeholder,
}: ImagePickerProps) {
  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onSelect(file);
    e.target.value = '';
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={cn(
          'relative w-32 h-32 border flex items-center justify-center cursor-pointer overflow-hidden',
          error ? 'border-destructive' : 'border-input',
          className
        )}
      >
        {preview ? (
          <Image src={preview} fill className="object-cover" alt="미리보기 이미지" />
        ) : (
          (placeholder ?? <span className="text-sm text-muted-foreground">이미지 선택</span>)
        )}
        {uploading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm">
            업로드 중..
          </div>
        )}
      </label>
      <input id={id} type="file" hidden accept="image/*" onChange={handleChange} />
      {error && <p className="text-red-500 text-[12px]">{error}</p>}
    </div>
  );
}
