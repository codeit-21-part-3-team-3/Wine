import { ComponentProps } from 'react';
import FilterContent from './FilterContent';
import { Dialog, DialogContent, DialogTrigger } from '../common/ui/Dialog';
import IconButton from '../common/ui/IconButton';
import Button from '../common/ui/Button';

type FilterContentProps = ComponentProps<typeof FilterContent>;

interface FilterModalProps extends Omit<FilterContentProps, 'footer'> {
  onApply: () => void;
  onReset: () => void;
}

export default function FilterModal({ onApply, onReset, ...props }: FilterModalProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <IconButton icon="filter" />
      </DialogTrigger>

      <DialogContent>
        <FilterContent
          {...props}
          footer={
            <div>
              <Button onClick={onReset} variant="ghost" size="sm">
                초기화
              </Button>
              <Button onClick={onApply} size="md">
                필터 적용하기
              </Button>
            </div>
          }
        />
      </DialogContent>
    </Dialog>
  );
}
