import type { WineListItem } from '@/lib/api/wine/wine.types';
import type { Wine } from '@/types/domain/wine';
import { useState } from 'react';

interface useMyWinesPanelStateParams {
  onDeleteWine: (id: number) => void;
  onUpdateWineLocal: (id: number, wine: Wine) => void;
}

export function useMyWinesPanelState({
  onDeleteWine,
  onUpdateWineLocal,
}: useMyWinesPanelStateParams) {
  const [editingWine, setEditingWine] = useState<WineListItem | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deletingWine, setDeletingWine] = useState<WineListItem | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const openEdit = (wine: WineListItem) => {
    setEditingWine(wine);
    setEditOpen(true);
  };

  const handleEditSuccess = (updated: Wine) => {
    if (!updated?.id) return;
    onUpdateWineLocal(updated.id, updated);
    setEditingWine(null);
  };

  const openDelete = (wine: WineListItem) => {
    setDeletingWine(wine);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deletingWine) return;
    onDeleteWine(deletingWine.id);
    setDeletingWine(null);
    setDeleteOpen(false);
  };

  return {
    editingWine,
    editOpen,
    setEditOpen,
    openEdit,
    handleEditSuccess,
    deletingWine,
    deleteOpen,
    setDeleteOpen,
    openDelete,
    handleConfirmDelete,
  };
}
