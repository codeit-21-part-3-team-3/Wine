import { AROMA_META, AromaType } from '@/constants/aromaMap';

interface AromaBadgeProps {
  type: string;
}

export default function AromaBadge({ type }: AromaBadgeProps) {
  const meta = AROMA_META[type.toUpperCase() as AromaType];

  if (!meta) return null;

  const { label, icon } = meta;

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      {icon?.src && <img src={icon.src} alt={label} aria-hidden className="w-6 h-6" />}
      <span className="text-gray-400">{label}</span>
    </div>
  );
}
