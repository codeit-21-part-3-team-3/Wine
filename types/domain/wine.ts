export type WineType = 'RED' | 'WHITE' | 'SPARKLING';

export interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: WineType;
  avgRating: number;
  reviewCount: number;
  recentReview?: {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
  userId: number;
}

/**
 * @todo(@jaywai-lee, 2026-02-08)
 * Review 인터페이스 정의 후
 * 유지보수성 강화를 위해
 * recentReview의 타입을 Review의 타입에서 Pick으로 변경
 */
