import { cn } from '@/utils/cn';

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  selected?: boolean;
}

export default function Chip({ label, selected = false, className, ...props }: ChipProps) {
  const baseStyle =
    'px-[12px] py-[9px] text-sm md:px-[18px] md:py-3 md:text-base flex items-center justify-center w-fit rounded-full border font-medium transition-all cursor-pointer';

  const variantStyle = selected
    ? 'bg-primary text-primary-foreground border-primary'
    : 'bg-white text-[#31302F] border-[#F2F2F2]';

  return (
    <button type="button" className={cn(baseStyle, variantStyle, className)} {...props}>
      {label}
    </button>
  );
}
