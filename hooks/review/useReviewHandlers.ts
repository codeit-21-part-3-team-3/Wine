import { useState } from 'react';
import { ApiWineReview } from '@/lib/api/wine/wine.types';
import {
  createReview,
  updateReview,
  deleteReview,
  likeReview,
  unlikeReview,
} from '@/lib/api/review/review';
import { CreateReviewRequest, UpdateReviewRequest } from '@/lib/api/review/review.types';
import { useReviewStats } from '@/hooks/review/useReviewStats';
import { useAlertDialogState } from '@/components/common/ui/AlertDialog';
import { toast } from '@/components/common/ui/Toast';

export function useReviewHandlers(initialReviews: ApiWineReview[]) {
  const [reviews, setReviews] = useState<ApiWineReview[]>(initialReviews);
  const { open, onOpen, onClose } = useAlertDialogState();
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  const { totalReviews, averageRating, distribution } = useReviewStats(reviews);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<ApiWineReview | null>(null);

  // 삭제
  const handleDeleteClick = (reviewId: number) => {
    setSelectedReviewId(reviewId);
    onOpen();
  };

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

  //좋아요
  const handleLike = async (reviewId: number, isCurrentlyLiked: boolean) => {
    const previousReviews = [...reviews];
    setReviews(prev =>
      prev.map(r => (r.id === reviewId ? { ...r, isLiked: !isCurrentlyLiked } : r))
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
      toast.error('좋아요 처리에 실패했습니다');
    }
  };

  // 리뷰등록
  const handleCreateReview = async (formData: CreateReviewRequest | UpdateReviewRequest) => {
    const optimisticReview: ApiWineReview = {
      ...(formData as CreateReviewRequest),
      id: Date.now(),
      isLiked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: {
        id: 0,
        nickname: '',
        image: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    setReviews(prev => [optimisticReview, ...prev]);
    setIsWriteModalOpen(false);

    try {
      const newReview = await createReview(formData as CreateReviewRequest);
      setReviews(prev => prev.map(r => (r.id === optimisticReview.id ? newReview : r)));
      toast.success('리뷰가 성공적으로 등록되었습니다.');
    } catch (error) {
      setReviews(prev => prev.filter(r => r.id !== optimisticReview.id));
      setIsWriteModalOpen(true);
      console.error('리뷰 등록 실패:', error);
      toast.error('리뷰 등록 중 오류가 발생했습니다.');
    }
  };

  const handleEditClick = (review: ApiWineReview) => {
    setEditingReview(review);
    setIsEditModalOpen(true);
  };

  // 리뷰수정
  const handleUpdateReview = async (formData: UpdateReviewRequest | CreateReviewRequest) => {
    if (!editingReview) return;

    try {
      const updatedReview = await updateReview(editingReview.id, formData as UpdateReviewRequest);

      setReviews(prev => prev.map(r => (r.id === editingReview.id ? updatedReview : r)));
      toast.success('리뷰가 수정되었습니다.');
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('리뷰 수정 실패:', error);
      toast.error('리뷰 수정 중 오류가 발생했습니다.');
    } finally {
      setEditingReview(null);
    }
  };
  return {
    // 리뷰
    reviews,
    totalReviews,
    averageRating,
    distribution,

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
    isDeleteDialogOpen: open,
    onCloseDeleteDialog: onClose,
    handleDeleteClick,
    handleConfirmDelete,

    // 좋아요
    handleLike,
  };
}
