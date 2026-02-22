import { useMemo } from 'react';
import { ApiWineReview } from '@/lib/api/wine/wine.types';
import { calculateAverage, calculateDistribution } from '@/utils/reviewStats';

export const useReviewStats = (reviews: ApiWineReview[] = []) => {
  return useMemo(() => {
    return {
      totalReviews: reviews.length,
      averageRating: calculateAverage(reviews),
      distribution: calculateDistribution(reviews),
    };
  }, [reviews]);
};
