import { cn } from '@/utils/cn';

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  selected?: boolean;
}

export default function Chip({ label, selected = false, className, ...props }: ChipProps) {
  const baseStyle =
    'flex items-center justify-center w-fit px-[18px] py-3 rounded-full border text-base font-medium transition-all cursor-pointer';

  return (
    <button
      type="button"
      className={cn(
        baseStyle,
        selected
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-white text-[#31302F] border-[#F2F2F2]',
        className
      )}
      {...props}
    >
      {label}
    </button>
  );
}
