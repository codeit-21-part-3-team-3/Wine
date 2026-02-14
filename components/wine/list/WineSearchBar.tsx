import Input from '@/components/common/ui/Input';
import Image from 'next/image';
import searchIcon from '@/assets/icons/search.png';

interface WineSearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function WineSearchBar({ value, onChange }: WineSearchBarProps) {
  return (
    <div className="mb-6">
      <Input
        value={value}
        onChange={onChange}
        placeholder="와인을 검색해 보세요"
        prefix={<Image src={searchIcon} alt="" aria-hidden width={16} height={16} />}
      />
    </div>
  );
}
