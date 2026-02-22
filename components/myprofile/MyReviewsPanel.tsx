import { cn } from '@/utils/cn';
import MyReviewCard from '../reviewCard/MyReviewCard';
import EmptyState from '../common/ui/EmptyState';
import { DeleteReviewDialog } from '../review/DeleteReviewDialog';
import ReviewFormModal from '../review/ReviewFormModal';
import { useMyReviewsPanelState } from '@/hooks/myprofile';
import type { ApiReview, UpdateReviewRequest } from '@/lib/api/review/review.types';

interface MyReviewsPanelProps {
  reviews: ApiReview[];
  loading: boolean;
  onUpdateReview: (id: number, data: UpdateReviewRequest) => Promise<void>;
  onDeleteReview: (id: number) => Promise<void> | void;
  className?: string;
}

export default function MyReviewsPanel({
  reviews,
  loading,
  onUpdateReview,
  onDeleteReview,
  className,
}: MyReviewsPanelProps) {
  const state = useMyReviewsPanelState({ onUpdateReview, onDeleteReview });

  if (loading) return null;

  if (!reviews.length) {
    return (
      <section
        role="tabpanel"
        id="panel-reviews"
        aria-labelledby="tab-reviews"
        className={cn(
          'relative lg:pl-5 lg:border-l border-t border-gray-300 flex flex-col h-full',
          className
        )}
      >
        <EmptyState title="아직 작성한 리뷰가 없어요!" description="첫 리뷰를 작성해보세요" />
      </section>
    );
  }

  return (
    <>
      <section
        role="tabpanel"
        id="panel-reviews"
        aria-labelledby="tab-reviews"
        className={cn(
          'relative lg:pl-5 lg:border-l border-t border-gray-300 flex flex-col',
          className
        )}
      >
        {reviews.map(review => (
          <MyReviewCard
            key={review.id}
            review={review}
            onEdit={state.openEdit}
            onDelete={state.openDelete}
          />
        ))}
      </section>

      {state.editingReview?.wine && (
        <ReviewFormModal
          open={state.editOpen}
          onOpenChange={state.setEditOpen}
          mode="edit"
          wine={state.editingReview.wine}
          initialData={state.editingReview}
          onSubmit={state.handleSubmitEdit}
        />
      )}

      <DeleteReviewDialog
        open={state.deleteOpen}
        onClose={() => state.setDeleteOpen(false)}
        onConfirm={state.handleConfirmDelete}
        isDeleting={state.isDeleting}
      />
    </>
  );
}
