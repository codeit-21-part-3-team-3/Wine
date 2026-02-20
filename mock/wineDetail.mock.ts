import { Review } from '@/types/domain/review';
import { AromaType } from '@/constants/aromaMap';

export const MOCK_WINE_DETAIL = {
  id: 2311,
  name: 'Bordeaux Prosecco 2013',
  region: 'Bordeaux',
  image:
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  price: 91000,
  type: 'SPARKLING',
  avgRating: 3.46,
  reviewCount: 13,
  tastes: {
    body: 2,
    tannin: 3,
    sweetness: 2,
    acidity: 2,
  },
  reviews: [
    {
      id: 4120,
      rating: 5,
      aroma: ['OAKBARREL'] as AromaType[],
      content: '부드러운 향이(가) 나쁘지 않아요.',
      createdAt: new Date('2026-02-02T05:03:30.554Z'),
      user: {
        id: 2096,
        name: '소심한매니아_538',
        image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=소심한매니아_538',
      },

      tastes: {
        body: 1,
        tannin: 2,
        sweetness: 5,
        acidity: 3,
      },
      isLiked: false,
    },
    {
      id: 4119,
      rating: 4,
      aroma: ['GRASS'] as AromaType[],
      content: '균형잡힌 구조감이(가) 제 취향은 아니네요.',
      createdAt: new Date('2026-02-02T05:03:30.379Z'),
      user: {
        id: 2065,
        name: '클래식블렌딩_50',
        image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=클래식블렌딩_50',
      },
      tastes: {
        body: 3,
        tannin: 0,
        sweetness: 0,
        acidity: 0,
      },
      isLiked: false,
    },
    {
      id: 4118,
      rating: 4,
      aroma: ['MINERAL'] as AromaType[],
      content: '깔끔한 아로마이(가) 글쎄요.',
      createdAt: new Date('2026-02-02T05:03:30.264Z'),
      user: {
        id: 2064,
        name: '친절한블렌딩_911',
        image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=친절한블렌딩_911',
      },
      tastes: {
        body: 0,
        tannin: 4,
        sweetness: 4,
        acidity: 0,
      },
      isLiked: false,
    },
  ] as Review[],
  avgRatings: {
    '1': 1,
    '2': 2,
    '3': 2,
    '4': 6,
    '5': 2,
  },
};
