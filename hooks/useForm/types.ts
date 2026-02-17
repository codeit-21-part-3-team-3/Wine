export type FormMode = 'onSubmit' | 'onBlur' | 'onTouched';

export interface ValidationRule<T> {
  value: T;
  message: string;
}

export interface RegisterOptions<
  TFieldValues extends Record<string, unknown> = Record<string, unknown>,
  TfieldName extends keyof TFieldValues = keyof TFieldValues,
> {
  required?: string | boolean;
  minLength?: ValidationRule<number>;
  maxLength?: ValidationRule<number>;
  pattern?: ValidationRule<RegExp>;
  validate?: (value: TFieldValues[TfieldName], values: TFieldValues) => string | undefined;

  deps?: (keyof TFieldValues)[];
}

export interface Field<TFieldValues extends Record<string, unknown> = Record<string, unknown>> {
  elements: (HTMLInputElement | HTMLTextAreaElement | null)[];
  rules: RegisterOptions<TFieldValues>;
  isTouched: boolean;
}

export interface useFormProps {
  mode?: FormMode;
}
