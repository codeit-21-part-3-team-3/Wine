import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md';
}

const variants = {
  primary: 'bg-primary text-primary-foreground hover:opacity-90',
  ghost:
    'bg-primary-foreground border border-border text-black hover:bg-secondary hover:text-secondary-foreground',
} as const;

const sizes = {
  sm: 'h-[42px] px-3',
  md: 'h-[50px] px-4',
} as const;

const base =
  'font-bold flex cursor-pointer items-center justify-center w-full rounded-sm transition-colors';

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
