import { useMemo } from 'react';
import { Review, calculateAverage, calculateDistribution } from '@/utils/reviewStats';

export const useReviewStats = (reviews: Review[] = []) => {
  return useMemo(() => {
    return {
      totalReviews: reviews.length,
      averageRating: calculateAverage(reviews),
      distribution: calculateDistribution(reviews),
    };
  }, [reviews]);
};
