import { useRef, useState, useCallback } from 'react';
import type { SubmitEvent } from 'react';
import type { useFormProps, Field, RegisterOptions, FieldErrors } from './types';
import { getErrorMessage } from './utils';

function useForm<TFieldValues extends Record<string, unknown> = Record<string, unknown>>({
  mode = 'onSubmit',
}: useFormProps = {}) {
  const [errors, setErrors] = useState<FieldErrors<TFieldValues>>({});
  const errorsRef = useRef(errors);
  const fieldsRef = useRef<Partial<Record<keyof TFieldValues, Field<TFieldValues>>>>({});

  const getValues = useCallback((): TFieldValues => {
    const values = {} as TFieldValues;

    Object.entries(fieldsRef.current).forEach(([key, field]) => {
      const name = key as keyof TFieldValues;
      const validElements = field!.elements.filter(
        (el): el is HTMLInputElement | HTMLTextAreaElement => el !== null && el.isConnected
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

  const isFieldAlive = useCallback((name: keyof TFieldValues) => {
    const field = fieldsRef.current[name];
    if (!field) return false;
    return field.elements.some(el => el && el.isConnected);
  }, []);

  const clearError = useCallback((name: keyof TFieldValues) => {
    setErrors(prev => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      errorsRef.current = next;
      return next;
    });
  }, []);

  const validateField = useCallback(
    (name: keyof TFieldValues, isTriggered = false) => {
      function run(targetName: keyof TFieldValues, triggered: boolean) {
        const field = fieldsRef.current[targetName];
        if (!field) return;

        if (!isFieldAlive(targetName)) {
          clearError(targetName);
          return;
        }

        const values = getValues();
        const errorMessage = getErrorMessage(field.rules, values[targetName], values);

        setErrors(prev => {
          if (prev[targetName] === errorMessage) return prev;
          const next = { ...prev };
          if (errorMessage) next[targetName] = errorMessage;
          else delete next[targetName];
          errorsRef.current = next;
          return next;
        });

        if (!triggered && field.rules.deps) {
          field.rules.deps.forEach(depName => {
            const depField = fieldsRef.current[depName];
            if (!depField) return;

            if ((mode === 'onTouched' || mode === 'onBlur') && !depField.isTouched) {
              return;
            }

            run(depName, true);
          });
        }
      }
      run(name, isTriggered);
    },
    [getValues, isFieldAlive, clearError, mode]
  );

  const register = useCallback(
    <TFieldName extends keyof TFieldValues>(
      name: TFieldName,
      rules: RegisterOptions<TFieldValues, TFieldName> = {}
    ) => {
      let lastEl: HTMLInputElement | HTMLTextAreaElement | null = null;
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
          const field = fieldsRef.current[name];
          if (!field) return;

          if (element === null) {
            if (lastEl) {
              field.elements = field.elements.filter(el => el !== lastEl);
              lastEl = null;
            }
            return;
          }

          lastEl = element;
          if (!field.elements.includes(element)) field.elements.push(element);
        },
        onBlur: () => {
          fieldsRef.current[name]!.isTouched = true;
          if (mode === 'onBlur' || mode === 'onTouched') {
            validateField(name);
          }
        },
        onChange: () => {
          if (
            errorsRef.current[name] &&
            mode === 'onTouched' &&
            fieldsRef.current[name]!.isTouched
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
      onInvalid?: (errors: FieldErrors<TFieldValues>) => void | Promise<void>
    ) =>
      async (e?: SubmitEvent) => {
        if (e) e.preventDefault();

        const values = getValues();
        const nextErrors: FieldErrors<TFieldValues> = {};
        let isValid = true;

        Object.entries(fieldsRef.current).forEach(([key, field]) => {
          const name = key as keyof TFieldValues;
          const typedField = field as Field<TFieldValues>;

          if (!isFieldAlive(name)) {
            clearError(name);
            return;
          }

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
    [getValues, isFieldAlive, clearError]
  );

  return {
    register,
    getValues,
    handleSubmit,
    errors,
  };
}

export { useForm };
