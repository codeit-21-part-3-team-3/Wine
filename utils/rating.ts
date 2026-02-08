const MAX_STARS = 5;

export function getFilledStars(avgRating: number) {
  const safeRating = Number.isFinite(avgRating) ? avgRating : 0;
  const filled = Math.min(MAX_STARS, Math.max(0, Math.round(safeRating)));
  return Array.from({ length: MAX_STARS }, (_, i) => i < filled);
}
