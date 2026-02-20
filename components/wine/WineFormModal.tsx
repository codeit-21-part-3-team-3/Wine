import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogClose,
} from '@/components/common/ui/Dialog';
import WineForm from './WineForm';
import { Dispatch, SetStateAction } from 'react';
import IconButton from '../common/ui/IconButton';

interface Props {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  mode: 'create' | 'edit';
}

export default function WineFormModal({ open, onOpenChange, mode }: Props) {
  const isEdit = mode === 'edit';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="py-4 px-2">
        <DialogHeader className="flex-row items-center justify-between">
          <DialogTitle className="font-semibold text-2xl">
            {isEdit ? '와인 수정' : '와인 등록'}
          </DialogTitle>
          <DialogClose className="w-auto px-0 bg-transparent">
            <IconButton icon="cancel" size={16} />
          </DialogClose>
        </DialogHeader>
        <DialogBody>
          <WineForm mode={mode} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
