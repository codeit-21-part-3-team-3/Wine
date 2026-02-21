import { useState } from 'react';
import Button from '@/components/common/ui/Button';
import ReviewFeedCard from '@/components/reviewCard/ReviewFeedCard';
import ReviewStats from '@/components/wine/detail/ReviewStats';
import ReviewEmpty from '@/components/wine/detail/ReviewEmpty';
import { useReviewStats } from '@/hooks/useReviewStats';
import { GetWineDetailResponse, ApiWineReview } from '@/lib/api/wine/wine.types';
import { createReview, deleteReview, likeReview, unlikeReview } from '@/lib/api/review/review';
import ReviewFormModal from '@/components/review/ReviewFormModal';
import { CreateReviewRequest } from '@/lib/api/review/review.types';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  useAlertDialogState,
} from '@/components/common/ui/AlertDialog';
import { toast } from '@/components/common/ui/Toast';
import Spinner from '@/components/common/ui/Spinner';

interface ReviewSectionProps {
  wine: GetWineDetailResponse;
  myId: number;
}

export default function ReviewSection({ wine, myId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<ApiWineReview[]>(wine.reviews);
  const { open, onOpen, onClose } = useAlertDialogState();
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  const { totalReviews, averageRating, distribution } = useReviewStats(reviews);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  const handleDeleteClick = (reviewId: number) => {
    setSelectedReviewId(reviewId);
    onOpen();
  };
  const [isDeleting, setIsDeleting] = useState(false);
  const handleConfirmDelete = async () => {
    if (selectedReviewId === null) return;
    setIsDeleting(true);
    try {
      await deleteReview(selectedReviewId);
      setReviews(prev => prev.filter(r => r.id !== selectedReviewId));
      toast.success('리뷰가 삭제되었습니다.', {
        duration: 3000,
      });
    } catch (error) {
      console.error('삭제 에러:', error);
      toast.error('리뷰 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsDeleting(false);
      onClose();
      setSelectedReviewId(null);
    }
  };

  const handleLike = async (reviewId: number, isCurrentlyLiked: boolean) => {
    const previousReviews = [...reviews];

    // 좋아요 버튼 작업필요
    setReviews(prev =>
      prev.map(r =>
        r.id === reviewId
          ? {
              ...r,
              isLiked: !isCurrentlyLiked,
            }
          : r
      )
    );
    try {
      if (isCurrentlyLiked) {
        await unlikeReview(reviewId);
      } else {
        await likeReview(reviewId);
      }
    } catch (error) {
      setReviews(previousReviews);
      console.error('좋아요 적용 에러:', error);
    }
  };

  const handleCreateReview = async (formData: CreateReviewRequest) => {
    try {
      const newReview = await createReview(formData);
      setReviews(prev => [newReview, ...prev]);
      toast.success('리뷰가 성공적으로 등록되었습니다.');
      setIsWriteModalOpen(false);
    } catch (error) {
      console.error('리뷰 등록 실패:', error);
      toast.error('리뷰 등록 중 오류가 발생했습니다.');
    }
  };

  if (!reviews || reviews.length === 0) {
    return <ReviewEmpty onWriteClick={() => setIsWriteModalOpen(true)} />;
  }

  return (
    <section className="w-full py-6 md:py-10 lg:py-20 px-0">
      <div className="flex flex-col-reverse lg:flex-row gap-16 items-start">
        <div className="flex-1 w-full">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-baseline gap-3.5">
              <h2 className="text-2xl font-bold text-foreground">리뷰 목록</h2>
              <span className="text-basic text-muted-foreground font-medium">
                {totalReviews.toLocaleString()}개
              </span>
            </div>
          </div>

          <div className="">
            {reviews.map(review => (
              <ReviewFeedCard
                key={review.id}
                review={review}
                isOwner={review.user.id === myId}
                onDelete={() => handleDeleteClick(review.id)}
                onLike={() => handleLike(review.id, review.isLiked)}
              />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[350px]">
          <div className="flex flex-col gap-10">
            <ReviewStats rating={averageRating} distribution={distribution} />
            <Button
              variant="primary"
              className="text-lg font-bold"
              onClick={() => setIsWriteModalOpen(true)}
            >
              리뷰 남기기
            </Button>
          </div>
        </div>
      </div>
      <ReviewFormModal
        open={isWriteModalOpen}
        onOpenChange={setIsWriteModalOpen}
        mode="create"
        wine={wine}
        onSubmit={handleCreateReview}
      />
      <AlertDialog open={open} onOpenChange={onClose}>
        <AlertDialogContent className="max-w-[350px] p-8">
          <AlertDialogTitle className="text-center text-lg font-semibold mb-8">
            정말 삭제하시겠습니까?
          </AlertDialogTitle>

          <AlertDialogFooter className="flex gap-2">
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              {isDeleting ? (
                <Spinner size="sm" className="text-white" label="삭제 중..." />
              ) : (
                '삭제하기'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
