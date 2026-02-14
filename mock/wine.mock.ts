import { WineListResponse } from '@/types/api/wine.dto';

export const mockWineData: WineListResponse = {
  list: [
    {
      id: 2313,
      name: 'Sentinel Carbernet Sauvignon 2016',
      region: 'Western Cape, South Africa',
      image: 'https://i.ifh.cc/Xq5yas.png',
      price: 90200,
      type: 'WHITE',
      avgRating: 4.33,
      reviewCount: 6,
      recentReview: {
        id: 4092,
        content:
          'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.',
        createdAt: '2026-02-02T05:03:27.380Z',
        updatedAt: '2026-02-02T05:03:27.380Z',
      },
      userId: 2097,
    },
    {
      id: 2312,
      name: 'Bordeaux Malbec 2014',
      region: 'Bordeaux',
      image: 'https://i.ifh.cc/Xq5yas.png',
      price: 292500,
      type: 'RED',
      avgRating: 4.4,
      reviewCount: 15,
      userId: 2097,
    },
    {
      id: 2311,
      name: 'Bordeaux Prosecco 2013',
      region: 'Bordeaux',
      image: 'https://i.ifh.cc/Xq5yas.png',
      price: 91000,
      type: 'SPARKLING',
      avgRating: 3.46,
      reviewCount: 13,
      recentReview: {
        id: 4120,
        content: '부드러운 향이(가) 나쁘지 않아요.',
        createdAt: '2026-02-02T05:03:30.554Z',
        updatedAt: '2026-02-02T05:03:30.554Z',
      },
      userId: 2097,
    },
  ],
};
