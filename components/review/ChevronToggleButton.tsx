import IconButton from '../common/ui/IconButton';

interface ChevronToggleButtonProps {
  open: boolean;
  onToggle?: () => void;
}

export default function ChevronToggleButton({ open, onToggle }: ChevronToggleButtonProps) {
  return (
    <IconButton
      icon="chevron-down"
      onClick={onToggle}
      className={`transition-transform ${open ? 'rotate-180' : ''}`}
    />
  );
}
