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
import { ApiWineReview } from '@/lib/api/wine/wine.types';
import { CreateReviewRequest, UpdateReviewRequest } from '@/lib/api/review/review.types';
import { WineInReview } from '@/types/domain/review';

interface ReviewFormProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  mode: 'create' | 'edit';
  wine: WineInReview;
  onSubmit: (data: CreateReviewRequest | UpdateReviewRequest) => Promise<void>;
  initialData?: ApiWineReview;
}

export default function ReviewFormModal({
  open,
  onOpenChange,
  mode,
  wine,
  onSubmit,
  initialData,
}: ReviewFormProps) {
  const isEdit = mode === 'edit';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full py-4 px-2 max-h-[90vh] flex flex-col overflow-hidden md:max-w-[480px]">
        <DialogHeader className="flex-row items-center justify-between">
          <DialogTitle className="text-2xl">{isEdit ? '리뷰 수정' : '리뷰 등록'}</DialogTitle>

          <DialogClose className="bg-transparent w-auto px-0">
            <Icon name="cancel" size={16} />
          </DialogClose>
        </DialogHeader>

        <DialogBody className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
          <ReviewForm mode={mode} wine={wine} onSubmit={onSubmit} initialData={initialData} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
