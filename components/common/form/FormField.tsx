import Input from '@/components/common/ui/Input';
import Label from '@/components/common/ui/Label';
import { cn } from '@/utils/cn';

interface FormFieldProps extends React.ComponentPropsWithoutRef<typeof Input> {
  label?: string;
  error?: string;
  onSearch?: (value: string) => void;
}

const FormField = ({ label, error, onSearch, id, className, ...props }: FormFieldProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      e.preventDefault();
      onSearch(e.currentTarget.value);
    }
    props.onKeyDown?.(e);
  };

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input id={id} status={error ? 'error' : props.status} onKeyDown={handleKeyDown} {...props} />

      {error && <span className="text-xs text-destructive font-medium ml-1">{error}</span>}
    </div>
  );
};

export default FormField;
