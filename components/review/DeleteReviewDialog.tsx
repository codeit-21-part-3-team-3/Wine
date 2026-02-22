import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/common/ui/AlertDialog';
import Spinner from '@/components/common/ui/Spinner';

interface DeleteReviewDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export function DeleteReviewDialog({
  open,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteReviewDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[350px] p-8">
        <AlertDialogTitle className="text-center text-lg font-semibold mb-8">
          정말 삭제하시겠습니까?
        </AlertDialogTitle>
        <AlertDialogFooter className="flex gap-2">
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {isDeleting ? (
              <Spinner size="sm" className="text-white" label="삭제 중..." />
            ) : (
              '삭제하기'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
