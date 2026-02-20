import { Taste as TasteLabel } from '@/components/common/ui/TasteItem';

interface ReviewTasteData {
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
}

interface WineTasteData {
  body: number;
  tannin: number;
  sweetness: number;
  acidity: number;
}

export const getTasteValueByLabel = (
  data: Partial<ReviewTasteData & WineTasteData>,
  label: TasteLabel
): number => {
  switch (label) {
    case '바디감':
      return data.lightBold ?? data.body ?? 0;
    case '탄닌':
      return data.smoothTannic ?? data.tannin ?? 0;
    case '당도':
      return data.drySweet ?? data.sweetness ?? 0;
    case '산미':
      return data.softAcidic ?? data.acidity ?? 0;
    default:
      return 0;
  }
};
