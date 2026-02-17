import { useRef, useState, useCallback, useEffect } from 'react';
import type { FormEvent } from 'react';
import type { useFormProps, Field, RegisterOptions } from './types';
import { getErrorMessage } from './utils';

function useForm<TFieldValues extends Record<string, unknown> = Record<string, unknown>>({
  mode = 'onSubmit',
}: useFormProps = {}) {
  const [errors, setErrors] = useState<Partial<Record<keyof TFieldValues, string>>>({});
  const errorsRef = useRef(errors);
  const fieldsRef = useRef<Partial<Record<keyof TFieldValues, Field<TFieldValues>>>>({});

  useEffect(() => {
    errorsRef.current = errors;
  }, [errors]);

  const getValues = useCallback((): TFieldValues => {
    const values = {} as TFieldValues;

    Object.entries(fieldsRef.current).forEach(([key, field]) => {
      const name = key as keyof TFieldValues;
      const validElements = field!.elements.filter(
        (el): el is HTMLInputElement | HTMLTextAreaElement => el !== null
      );

      if (validElements.length === 0) return;

      const firstEl = validElements[0];

      if (firstEl instanceof HTMLInputElement) {
        const { type, multiple } = firstEl;

        if (type === 'checkbox') {
          if (validElements.length > 1) {
            values[name] = validElements
              .filter(el => (el as HTMLInputElement).checked)
              .map(el => el.value) as TFieldValues[keyof TFieldValues];
          } else {
            values[name] = firstEl.checked as TFieldValues[keyof TFieldValues];
          }
        } else if (type === 'radio') {
          const checkedEl = validElements.find(el => (el as HTMLInputElement).checked);
          values[name] = checkedEl?.value as TFieldValues[keyof TFieldValues];
        } else if (type === 'file') {
          if (multiple) {
            values[name] = Array.from(firstEl.files || []) as TFieldValues[keyof TFieldValues];
          } else {
            values[name] = (firstEl.files?.[0] || null) as TFieldValues[keyof TFieldValues];
          }
        } else {
          values[name] = firstEl.value as TFieldValues[keyof TFieldValues];
        }
      } else {
        values[name] = firstEl.value as TFieldValues[keyof TFieldValues];
      }
    });

    return values;
  }, []);

  const validateField = useCallback(
    (name: keyof TFieldValues, isTriggered = false) => {
      function run(targetName: keyof TFieldValues, triggered: boolean) {
        const field = fieldsRef.current[targetName];
        if (!field) return;

        const values = getValues();
        const errorMessage = getErrorMessage(field.rules, values[targetName], values);

        setErrors(prev => {
          if (prev[targetName] === errorMessage) return prev;
          const next = { ...prev };
          if (errorMessage) next[targetName] = errorMessage;
          else delete next[targetName];
          return next;
        });

        if (!triggered && field.rules.deps) {
          field.rules.deps.forEach(depName => run(depName, true));
        }
      }
      run(name, isTriggered);
    },
    [getValues]
  );

  const register = useCallback(
    <TFieldName extends keyof TFieldValues>(
      name: TFieldName,
      rules: RegisterOptions<TFieldValues, TFieldName> = {}
    ) => {
      if (!fieldsRef.current[name]) {
        fieldsRef.current[name] = {
          elements: [],
          rules: rules as RegisterOptions<TFieldValues>,
          isTouched: false,
        };
      } else {
        fieldsRef.current[name]!.rules = rules as RegisterOptions<TFieldValues>;
      }

      return {
        name,
        ref: (element: HTMLInputElement | HTMLTextAreaElement | null) => {
          if (!element) {
            if (fieldsRef.current[name]) {
              fieldsRef.current[name]!.elements = fieldsRef.current[name]!.elements.filter(
                el => el !== null && el !== element
              );
            }
            return;
          }
          if (!fieldsRef.current[name]!.elements.includes(element)) {
            fieldsRef.current[name]!.elements.push(element);
          }
        },
        onBlur: () => {
          fieldsRef.current[name]!.isTouched = true;
          if (mode === 'onBlur' || mode === 'onTouched') {
            validateField(name);
          }
        },
        onChange: () => {
          if (
            errorsRef.current[name] ||
            (mode === 'onTouched' && fieldsRef.current[name]!.isTouched)
          ) {
            validateField(name);
          }
        },
      };
    },
    [validateField, mode]
  );

  const handleSubmit = useCallback(
    (
      onValid: (data: TFieldValues) => void | Promise<void>,
      onInvalid?: (errors: Partial<Record<keyof TFieldValues, string>>) => void | Promise<void>
    ) =>
      async (e?: FormEvent) => {
        if (e) e.preventDefault();

        const values = getValues();
        const nextErrors: Partial<Record<keyof TFieldValues, string>> = {};
        let isValid = true;

        Object.entries(fieldsRef.current).forEach(([key, field]) => {
          const name = key as keyof TFieldValues;
          const typedField = field as Field<TFieldValues>;
          const errorMessage = getErrorMessage(typedField.rules, values[name], values);
          if (errorMessage) {
            nextErrors[name] = errorMessage;
            isValid = false;
          }
        });

        setErrors(nextErrors);

        if (isValid) {
          await onValid(values);
        } else {
          await onInvalid?.(nextErrors);
        }
      },
    [getValues]
  );

  return {
    register,
    getValues,
    handleSubmit,
    errors,
  };
}

export { useForm };
