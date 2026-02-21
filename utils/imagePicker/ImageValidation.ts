export type ValidationRule = (file: File) => string | null;

export const isImage: ValidationRule = file =>
  file.type.startsWith('image/') ? null : '이미지 파일만 업로드 가능해요';

export const maxSize =
  (bytes: number): ValidationRule =>
  file =>
    file.size <= bytes ? null : `파일은 ${bytes / 1024 / 1024}MB 이하만 가능해요`;

export function ImageValidation(file: File, rules: ValidationRule[]) {
  for (const rule of rules) {
    const error = rule(file);
    if (error) return error;
  }
  return null;
}
