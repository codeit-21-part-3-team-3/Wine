import { ComponentProps } from 'react';
import FilterContent from './FilterContent';
import { Dialog, DialogContent, DialogTrigger } from '../common/ui/Dialog';
import Button from '../common/ui/Button';
import Icon from '../common/ui/Icon';

type FilterContentProps = ComponentProps<typeof FilterContent>;

interface FilterModalProps extends Omit<FilterContentProps, 'footer'> {
  onApply: () => void;
  onReset: () => void;
}

export default function FilterModal({ onApply, onReset, ...props }: FilterModalProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Icon name="filter" />
      </DialogTrigger>

      <DialogContent className="px-6 py-8">
        <FilterContent
          {...props}
          actions={
            <>
              <Button className="w-30" onClick={onReset} variant="ghost">
                초기화
              </Button>
              <Button className="w-70" onClick={onApply}>
                필터 적용하기
              </Button>
            </>
          }
        />
      </DialogContent>
    </Dialog>
  );
}
