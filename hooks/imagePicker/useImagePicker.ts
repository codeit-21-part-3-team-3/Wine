import { toast } from '@/components/common/ui/Toast';
import { uploadImage } from '@/lib/api/infra/image';
import { ImageValidation, ValidationRule } from '@/utils/imagePicker/ImageValidation';
import { useCallback, useEffect, useRef, useState } from 'react';

interface useImagePickerOptions {
  rules: ValidationRule[];
  onUploaded: (url: string) => void;
}

function normalizeFileName(file: File): File {
  const ext = file.type.split('/')[1] || file.name.split('.').pop() || 'png';
  const safeName = `${Date.now()}.${ext}`;
  return new File([file], safeName, { type: file.type });
}

export function useImagePicker({ rules, onUploaded }: useImagePickerOptions) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const urlRef = useRef<string | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (uploading) return;

      const validationError = ImageValidation(file, rules);
      if (validationError) {
        setError(validationError);
        return;
      }

      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      const localUrl = URL.createObjectURL(file);
      urlRef.current = localUrl;
      setPreview(localUrl);
      setError(null);

      const safeFile = normalizeFileName(file);

      try {
        setUploading(true);
        const res = await uploadImage(safeFile);
        onUploaded(res.url);
      } catch (err) {
        console.error('이미지 업로드 실패', err);
        setError('이미지 업로드 실패했습니다.');
        toast.error('이미지 업로드 실패했습니다.');
      } finally {
        setUploading(false);
      }
    },
    [rules, onUploaded]
  );

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  return { preview, error, uploading, handleFile };
}
