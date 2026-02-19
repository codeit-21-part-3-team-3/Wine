import { ComponentProps } from 'react';
import FilterContent from './FilterContent';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '../common/ui/Dialog';
import Button from '../common/ui/Button';
import { useDialog } from '../common/ui/Dialog/Dialog';
import Icon from '../common/ui/Icon';

type FilterContentProps = ComponentProps<typeof FilterContent>;

interface FilterModalProps extends Omit<FilterContentProps, 'actions'> {
  onApply: () => void;
  onReset: () => void;
}

function TriggerBtn() {
  const { setOpen } = useDialog();
  return (
    <button type="button" onClick={() => setOpen(true)}>
      <Icon name="filter" size={48} />
    </button>
  );
}

export default function FilterModal({ onApply, onReset, ...props }: FilterModalProps) {
  return (
    <Dialog>
      <TriggerBtn />
      <DialogContent className="px-6 py-8">
        <FilterContent
          {...props}
          actions={
            <>
              <Button className="w-30 md:w-30" onClick={onReset} variant="ghost">
                초기화
              </Button>
              <DialogClose>
                <Button className="md:w-70" onClick={onApply}>
                  필터 적용하기
                </Button>
              </DialogClose>
            </>
          }
        />
      </DialogContent>
    </Dialog>
  );
}
