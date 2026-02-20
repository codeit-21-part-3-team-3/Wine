import { useState } from 'react';
import Image from 'next/image';
import camera from '@/assets/icons/camera.png';

export default function WineImageUpload() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">와인 사진</span>

      <label
        htmlFor="wine-image"
        className="relative w-32 h-32 border border-input flex items-center justify-center cursor-pointer overflow-hidden"
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
    </div>
  );
}
