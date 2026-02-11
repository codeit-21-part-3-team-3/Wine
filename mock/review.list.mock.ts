import { Review } from '@/types/domain/review';

export const mockListReviews: Review[] = [
  {
    id: 1,
    rating: 4,
    content:
      '첫 모금에서 느껴지는 진한 블랙베리와 블랙커런트의 깊은 풍미가 인상적이었어요. 입 안을 가득 채우는 묵직한 바디감과 함께, 오크 숙성에서 오는 바닐라, 스파이스, 은은한 토스트 향이 균형 있게 어우러집니다. 시간이 지날수록 다크 초콜릿과 가죽 같은 성숙한 노트가 올라오면서, 여운이 길고도 부드럽게 이어져요. 타닌은 뚜렷하지만 과하지 않고,  단단한 구조감 덕분에 고기 요리나 숙성 치즈와 특히 잘 어울리는 와인이었습니다.',
    createdAt: new Date('2026-02-08'),

    aroma: ['PEACH', 'SEA', 'MINERAL', 'BREAD', 'APPLE'],

    tastes: {
      body: 3,
      tannin: 1,
      sweetness: 4,
      acidity: 2,
    },

    user: {
      id: 10,
      name: '와인러버',
      image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=user1',
    },

    isLiked: true,
  },

  {
    id: 2,
    rating: 5,
    content: '최근 마신 화이트 중 최고입니다',
    createdAt: new Date('2026-02-07'),

    aroma: ['COCONUT', 'LEAF', 'MINT', 'CHOCOLATE', 'BREAD'],

    tastes: {
      body: 5,
      tannin: 0,
      sweetness: 5,
      acidity: 1,
    },

    user: {
      id: 11,
      name: '소믈리에',
      image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=user2',
    },

    isLiked: false,
  },

  {
    id: 3,
    rating: 3,
    content: '데일리로 마시기 무난합니다',
    createdAt: new Date('2026-02-05'),

    aroma: ['GRASS'],

    tastes: {
      body: 2,
      tannin: 3,
      sweetness: 2,
      acidity: 3,
    },

    user: {
      id: 12,
      name: '초보와인러',
      image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=user3',
    },

    isLiked: false,
  },
];
