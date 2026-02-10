interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function Chip({ label, selected = false, onClick }: ChipProps) {
  const baseStyle =
    'flex items-center justify-center w-fit px-[18px] py-3 rounded-full border text-sm transition-all cursor-pointer font-medium';

  const statusStyle = selected
    ? 'bg-[#484746] text-white border-[#484746]'
    : 'bg-white text-[#31302F] border-[#F2F2F2]';

  return (
    <button type="button" className={`${baseStyle} ${statusStyle}`} onClick={onClick}>
      {label}
    </button>
  );
}
