import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogClose,
} from '@/components/common/ui/Dialog';
import WineForm from './WineForm';
import IconButton from '../common/ui/IconButton';
import type { Dispatch, SetStateAction } from 'react';
import type { Wine } from '@/types/domain/wine';
import type { WineListItem } from '@/lib/api/wine/wine.types';

interface Props {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  mode: 'create' | 'edit';
  wine?: WineListItem;
  onSuccess?: (wine: Wine) => void;
}

export default function WineFormModal({ open, onOpenChange, mode, wine, onSuccess }: Props) {
  const isEdit = mode === 'edit';

  const handleSuccess = (wine: Wine) => {
    onSuccess?.(wine);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="py-4 px-2">
        <DialogHeader className="flex-row items-center justify-between">
          <DialogTitle className="font-semibold text-2xl">
            {isEdit ? '와인 수정' : '와인 등록'}
          </DialogTitle>
          <IconButton
            className="w-auto px-0 bg-transparent"
            icon="cancel"
            size={16}
            onClick={() => onOpenChange(false)}
          />
        </DialogHeader>
        <DialogBody>
          <WineForm
            key={wine?.id ?? 'create'}
            mode={mode}
            initialWine={wine}
            onSuccess={handleSuccess}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
