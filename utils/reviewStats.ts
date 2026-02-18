export interface Review {
  rating: number;
}
export interface ReviewStatItem {
  star: number;
  ratio: number;
}

export const calculateAverage = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const totalRating = reviews.reduce((acc, cur) => acc + cur.rating, 0);
  return totalRating / reviews.length;
};

export const calculateDistribution = (reviews: Review[]): ReviewStatItem[] => {
  const total = reviews.length;

  return [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length;
    return {
      star,
      ratio: total > 0 ? (count / total) * 100 : 0,
    };
  });
};
