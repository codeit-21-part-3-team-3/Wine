import { cn } from '@/utils/cn';
import Input from '../ui/Input';
import Label from '../ui/Label';

interface FormFieldProps extends React.ComponentPropsWithRef<typeof Input> {
  label?: string;
  error?: string;
}

const FormField = ({ label, ref, error, id, className, ...props }: FormFieldProps) => {
  const inputStatus = error ? 'error' : (props.status ?? 'default');
  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input ref={ref} id={id} status={inputStatus} {...props} />
      {error && (
        <p className="ml-1 text-xs text-destructive" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
