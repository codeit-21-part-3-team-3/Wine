import { Review } from '@/types/domain/review';

type TasteFields = Pick<Review, 'lightBold' | 'smoothTannic' | 'drySweet' | 'softAcidic'>;

export const calculateAveragePalate = (reviews: TasteFields[]): TasteFields => {
  if (!reviews || reviews.length === 0) {
    return { lightBold: 0, smoothTannic: 0, drySweet: 0, softAcidic: 0 };
  }

  const totals = reviews.reduce(
    (acc, rev) => ({
      lightBold: acc.lightBold + (rev.lightBold || 0),
      smoothTannic: acc.smoothTannic + (rev.smoothTannic || 0),
      drySweet: acc.drySweet + (rev.drySweet || 0),
      softAcidic: acc.softAcidic + (rev.softAcidic || 0),
    }),
    { lightBold: 0, smoothTannic: 0, drySweet: 0, softAcidic: 0 }
  );

  const count = reviews.length;

  return {
    lightBold: totals.lightBold / count,
    smoothTannic: totals.smoothTannic / count,
    drySweet: totals.drySweet / count,
    softAcidic: totals.softAcidic / count,
  };
};
