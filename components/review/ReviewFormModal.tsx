import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogClose,
} from '@/components/common/ui/Dialog';
import ReviewForm from './ReviewForm';
import { Dispatch, SetStateAction } from 'react';
import IconButton from '../common/ui/IconButton';

interface Props {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  mode: 'create' | 'edit';
}

export default function ReviewFormModal({ open, onOpenChange, mode }: Props) {
  const isEdit = mode === 'edit';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="py-4 px-2">
        <DialogHeader className="flex-row items-center justify-between">
          <DialogTitle className="text-2xl">{isEdit ? '리뷰 수정' : '리뷰 등록'}</DialogTitle>

          <DialogClose className="bg-transparent w-auto px-0">
            <IconButton icon="cancel" size={16} />
          </DialogClose>
        </DialogHeader>

        <DialogBody>
          <ReviewForm mode={mode} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
