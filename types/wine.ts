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

export interface WineListResponse {
  list: Wine[];
}
