import { cn } from '@/utils/cn';
import MyWineCard from '../mywinecard/MyWineCard';
import EmptyState from '../common/ui/EmptyState';
import WineFormModal from '../wine/WineFormModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../common/ui/AlertDialog';
import { useMyWinesPanelState } from '@/hooks/myprofile';
import type { Wine } from '@/types/domain/wine';
import type { WineListItem } from '@/lib/api/wine/wine.types';

interface MyWinesPanelProps {
  wines: WineListItem[];
  loading: boolean;
  onDeleteWine: (id: number) => void;
  onUpdateWineLocal: (id: number, wine: Wine) => void;
  className?: string;
}

export default function MyWinesPanel({
  wines,
  loading,
  onDeleteWine,
  onUpdateWineLocal,
  className,
}: MyWinesPanelProps) {
  const state = useMyWinesPanelState({ onDeleteWine, onUpdateWineLocal });

  if (loading) return null;

  if (!wines.length) {
    return (
      <section
        role="tabpanel"
        id="panel-reviews"
        aria-labelledby="tab-reviews"
        className={cn(
          'relative lg:pl-5 lg:border-l border-t border-gray-300 flex flex-col',
          className
        )}
      >
        <EmptyState title="아직 등록한 와인이 없어요!" description="새 와인을 등록해보세요" />
      </section>
    );
  }
  return (
    <>
      <section
        role="tabpanel"
        id="panel-wines"
        aria-labelledby="tab-wines"
        className={cn(
          'relative lg:pl-8 pt-10 lg:border-l border-t border-gray-300 grid grid-cols-1 md:grid-cols-2 gap-x-4 lg:gap-x-18 md:gap-y-0',
          className
        )}
      >
        {wines.map(wine => (
          <MyWineCard
            key={wine.id}
            wine={wine}
            onEdit={state.openEdit}
            onDelete={state.openDelete}
          />
        ))}
      </section>
      <WineFormModal
        open={state.editOpen}
        onOpenChange={state.setEditOpen}
        mode="edit"
        wine={state.editingWine ?? undefined}
        onSuccess={state.handleEditSuccess}
      />

      <AlertDialog open={state.deleteOpen} onOpenChange={state.setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>와인을 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>삭제한 와인은 복구할 수 없습니다.</AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={state.handleConfirmDelete}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
