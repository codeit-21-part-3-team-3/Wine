import { Taste as TasteLabel } from '@/components/common/ui/TasteItem';
import { TasteData } from '@/lib/api/wine/wine.types';

export const getTasteValueByLabel = (data: Partial<TasteData>, label: TasteLabel): number => {
  switch (label) {
    case '바디감':
      return data.lightBold ?? 0;
    case '탄닌':
      return data.smoothTannic ?? 0;
    case '당도':
      return data.drySweet ?? 0;
    case '산미':
      return data.softAcidic ?? 0;
    default:
      return 0;
  }
};
