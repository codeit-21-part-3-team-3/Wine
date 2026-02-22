import { deleteWine, updateWine } from '@/lib/api/wine/wine';
import { useMyWines } from './useMyWines';
import { toast } from '@/components/common/ui/Toast';
import { UpdateWineRequest } from '@/lib/api/wine/wine.types';

type WinesState = ReturnType<typeof useMyWines>;

export function useMyWineActions(winesState: WinesState) {
  const handleDeleteWine = async (id: number) => {
    try {
      await deleteWine(id);
      winesState.removeLocalWine(id);
      toast.success('와인이 삭제되었습니다.');
    } catch {
      toast.error('와인 삭제에 실패했습니다.');
    }
  };

  const handleUpdateWine = async (id: number, body: UpdateWineRequest) => {
    try {
      const updated = await updateWine(id, body);
      winesState.updateLocalWine(id, updated);
      toast.success('와인이 수정되었습니다.');
    } catch {
      toast.error('와인 수정에 실패했습니다.');
    }
  };

  return {
    handleDeleteWine,
    handleUpdateWine,
  };
}
