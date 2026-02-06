import { ComponentPropsWithRef, ReactNode, useId } from 'react';
import Image from 'next/image';
import iconInputError from '@/assets/icon/icon-input-error.svg';
import Input from '@/components/common/ui/Input';
import Label from '@/components/common/ui/Label';
import { cn } from '@/utils/cn';

interface FormFieldProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  addonBefore?: ReactNode;
  type?: 'text' | 'password';
}

const FormField = ({
  label,
  error,
  errorMessage,
  addonBefore,
  className,
  id,
  ...props
}: FormFieldProps) => {
  const uniqueId = useId();
  const inputId = id || uniqueId;

  return (
    <div className={cn('w-full flex flex-col gap-2', className)}>
      {label && <Label htmlFor={inputId}>{label}</Label>}

      <div className="relative">
        {addonBefore && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {addonBefore}
          </div>
        )}

        <Input id={inputId} error={error} className={addonBefore ? 'pl-11' : 'pl-4'} {...props} />

        {error && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Image src={iconInputError} alt="입력 에러" width={20} height={20} />
          </div>
        )}
      </div>

      {error && errorMessage && (
        <p className="text-sm text-destructive font-medium">{errorMessage}</p>
      )}
    </div>
  );
};

export default FormField;
