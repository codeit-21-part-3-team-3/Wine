import FilterModal from '@/components/filter/FilterModal';
import WineSearchBar from './WineSearchBar';
import { FilterState } from '@/types/domain/filter';

interface SearchControlsProps {
  filter: FilterState;
  setFilter: (v: FilterState) => void;
  onApply: () => void;
  onReset: () => void;
  keyword: string;
  onKeywordChange: (v: string) => void;
}

export default function SearchControls({
  filter,
  setFilter,
  onApply,
  onReset,
  keyword,
  onKeywordChange,
}: SearchControlsProps) {
  return (
    <div className="flex items-start gap-2">
      <div className="lg:hidden">
        <FilterModal value={filter} onChange={setFilter} onApply={onApply} onReset={onReset} />
      </div>
      <div className="flex-1 lg:pl-15">
        <WineSearchBar value={keyword} onChange={onKeywordChange} />
      </div>
    </div>
  );
}
