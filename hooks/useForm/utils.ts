import type { RegisterOptions } from './types';

export const getErrorMessage = <
  TFieldValues extends Record<string, unknown>,
  TFieldName extends keyof TFieldValues,
>(
  rules: RegisterOptions<TFieldValues, TFieldName>,
  value: unknown,
  allValues: TFieldValues
): string | undefined => {
  if (rules.required) {
    const isEmpty =
      value == null ||
      (typeof value === 'string' && value.trim().length === 0) ||
      (Array.isArray(value) && value.length === 0) ||
      value === false;

    if (isEmpty) {
      return typeof rules.required === 'string' ? rules.required : '필수 입력 항목입니다.';
    }
  }

  if (rules.minLength && typeof value === 'string' && value.length < rules.minLength.value) {
    return rules.minLength.message || `${rules.minLength.value}자 이상 입력해주세요.`;
  }

  if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength.value) {
    return rules.maxLength.message || `${rules.maxLength.value}자 이하 입력해주세요.`;
  }

  if (rules.pattern && typeof value === 'string' && !rules.pattern.value.test(value)) {
    return rules.pattern.message || '형식이 올바르지 않습니다.';
  }

  if (rules.validate) {
    const result = rules.validate(value as TFieldValues[TFieldName], allValues);
    if (typeof result === 'string') return result;
  }

  return undefined;
};
