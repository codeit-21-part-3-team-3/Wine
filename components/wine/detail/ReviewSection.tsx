import Button from '@/components/common/ui/Button';
import ReviewFeedCard from '@/components/reviewCard/ReviewFeedCard';
import ReviewStats from '@/components/wine/detail/ReviewStats';
import EmptyState from '@/components/common/ui/EmptyState';
import ReviewFormModal from '@/components/review/ReviewFormModal';
import { GetWineDetailResponse } from '@/lib/api/wine/wine.types';
import { CreateReviewRequest, UpdateReviewRequest } from '@/lib/api/review/review.types';
import { useReviewHandlers } from '@/hooks/review/useReviewHandlers';
import { DeleteReviewDialog } from '@/components/review/DeleteReviewDialog';

interface ReviewSectionProps {
  wine: GetWineDetailResponse;
  myId: number;
}

export default function ReviewSection({ wine, myId }: ReviewSectionProps) {
  const {
    reviews,
    // 등록
    isWriteModalOpen,
    setIsWriteModalOpen,
    handleCreateReview,

    // 수정
    isEditModalOpen,
    setIsEditModalOpen,
    editingReview,
    handleEditClick,
    handleUpdateReview,

    // 삭제
    isDeleting,
    isDeleteDialogOpen,
    onCloseDeleteDialog,
    handleDeleteClick,
    handleConfirmDelete,

    totalReviews,
    averageRating,
    distribution,
    handleLike,
  } = useReviewHandlers(wine.reviews);

  if (!reviews || reviews.length === 0) {
    return (
      <div className="w-full">
        <EmptyState
          title="작성된 리뷰가 없습니다."
          action={
            <Button
              variant="primary"
              className="w-52 mx-auto py-3 rounded-full text-lg font-bold shadow-md"
              onClick={() => setIsWriteModalOpen(true)}
            >
              리뷰 작성하기
            </Button>
          }
        />
        <ReviewFormModal
          open={isWriteModalOpen}
          onOpenChange={setIsWriteModalOpen}
          mode="create"
          wine={wine}
          onSubmit={handleUpdateReview}
        />
      </div>
    );
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

          <div>
            {reviews.map(review => (
              <ReviewFeedCard
                key={review.id}
                review={review}
                isOwner={review.user.id === myId}
                onEdit={() => handleEditClick(review)}
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
      <ReviewFormModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        mode="edit"
        wine={wine}
        initialData={editingReview ?? undefined}
        onSubmit={handleUpdateReview}
      />

      <DeleteReviewDialog
        open={isDeleteDialogOpen}
        onClose={onCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </section>
  );
}
