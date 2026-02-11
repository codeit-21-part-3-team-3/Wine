import { AROMA_META } from '@/constants/aromaMap';

interface AromaBadgeProps {
  type: keyof typeof AROMA_META;
}

export default function AromaBadge({ type }: AromaBadgeProps) {
  const { label, icon } = AROMA_META[type];

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <img src={icon.src} alt="" aria-hidden className="w-6 h-6" />
      <span className="text-gray-400">{label}</span>
    </div>
  );
}
