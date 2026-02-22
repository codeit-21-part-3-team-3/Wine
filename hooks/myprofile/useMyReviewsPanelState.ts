import { useState } from 'react';
import type { ApiReview, UpdateReviewRequest } from '@/lib/api/review/review.types';

interface useMyReviewsPanelStateParams {
  onDeleteReview: (id: number) => Promise<void> | void;
  onUpdateReview: (id: number, data: UpdateReviewRequest) => Promise<void>;
}

export function useMyReviewsPanelState({
  onDeleteReview,
  onUpdateReview,
}: useMyReviewsPanelStateParams) {
  const [editingReview, setEditingReview] = useState<ApiReview | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openEdit = (review: ApiReview) => {
    setEditingReview(review);
    setEditOpen(true);
  };

  const handleSubmitEdit = async (data: UpdateReviewRequest) => {
    if (!editingReview) return;
    try {
      await onUpdateReview(editingReview.id, data);
      setEditOpen(false);
      setEditingReview(null);
    } catch {
      // error handled in container (toast), keep modal open
    }
  };

  const openDelete = (reviewId: number) => {
    setDeleteTargetId(reviewId);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);
    try {
      await onDeleteReview(deleteTargetId);
      setDeleteOpen(false);
      setDeleteTargetId(null);
    } catch {
      // error handled in container (toast), keep dialog open
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    editingReview,
    editOpen,
    setEditOpen,
    openEdit,
    handleSubmitEdit,
    deleteOpen,
    setDeleteOpen,
    isDeleting,
    openDelete,
    handleConfirmDelete,
  };
}
