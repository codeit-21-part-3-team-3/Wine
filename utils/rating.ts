export function getFilledStars(avgRating: number, max = 5) {
  const filled = Math.round(avgRating);
  return Array.from({ length: max }, (_, i) => i < filled);
}
