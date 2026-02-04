interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md';
}

const variants = {
  primary: 'bg-[#1a1918] text-[#fafafa] hover:bg-[#31302f]',
  ghost: 'bg-white border border-[#d1d1d1] text-[#31302f] hover:bg-[#fafafa]',
} as const;

const sizes = {
  sm: 'h-[42px] px-3',
  md: 'h-[50px] px-4',
} as const;

const base =
  'font-bold tracking-[-0.3px] leading-[20px] flex items-center justify-center w-full rounded-sm transition-colors';

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = [base, variants[variant], sizes[size], className].join(' ');
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
