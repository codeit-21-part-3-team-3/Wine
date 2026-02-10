import { Review } from '@/types/domain/review';

export const mockMyReviews: Review[] = [
  {
    id: 101,
    rating: 5,
    content:
      '첫 모금에서 느껴지는 진한 블랙베리와 블랙커런트의 깊은 풍미가 인상적이었어요. 입 안을 가득 채우는 묵직한 바디감과 함께, 오크 숙성에서 오는 바닐라, 스파이스, 은은한 토스트 향이 균형 있게 어우러집니다. 시간이 지날수록 다크 초콜릿과 가죽 같은 성숙한 노트가 올라오면서, 여운이 길고도 부드럽게 이어져요. 타닌은 뚜렷하지만 과하지 않고,  단단한 구조감 덕분에 고기 요리나 숙성 치즈와 특히 잘 어울리는 와인이었습니다.',
    createdAt: new Date(),

    aroma: ['CHERRY'],

    tastes: {
      body: 4,
      tannin: 3,
      sweetness: 3,
      acidity: 3,
    },

    user: {
      id: 1,
      name: '나',
      image: '/assets/default-avatar.png',
    },

    wine: {
      id: 2313,
      name: 'Bordeaux Chenin Blanc 2022',
      region: 'Bordeaux',
      image: 'https://i.ifh.cc/4gC02D.png',
    },
  },

  {
    id: 102,
    rating: 4,
    content: '부드럽고 데일리로 좋아요',
    createdAt: new Date(),

    aroma: ['PEACH'],

    tastes: {
      body: 3,
      tannin: 2,
      sweetness: 4,
      acidity: 2,
    },

    user: {
      id: 1,
      name: '나',
      image: '/assets/default-avatar.png',
    },

    wine: {
      id: 2314,
      name: 'Napa Valley Reserve',
      region: 'California',
      image: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d',
    },
  },
];
