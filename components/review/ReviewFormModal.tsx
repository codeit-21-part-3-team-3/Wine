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
import Icon from '@/components/common/ui/Icon';
import { GetWineDetailResponse } from '@/lib/api/wine/wine.types';
import { CreateReviewRequest } from '@/lib/api/review/review.types';

interface Props {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  mode: 'create' | 'edit';
  wine: GetWineDetailResponse;
  onSubmit: (data: CreateReviewRequest) => Promise<void>;
}

export default function ReviewFormModal({ open, onOpenChange, mode, wine, onSubmit }: Props) {
  const isEdit = mode === 'edit';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="py-4 px-2">
        <DialogHeader className="flex-row items-center justify-between">
          <DialogTitle className="text-2xl">{isEdit ? '리뷰 수정' : '리뷰 등록'}</DialogTitle>

          <DialogClose className="bg-transparent w-auto px-0">
            <Icon name="cancel" size={16} />
          </DialogClose>
        </DialogHeader>

        <DialogBody>
          <ReviewForm mode={mode} wine={wine} onSubmit={onSubmit} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
