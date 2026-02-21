import cherry from '@/assets/aroma/cherry.png';
import orange from '@/assets/aroma/orange.png';
import chocolate from '@/assets/aroma/chocolate.png';
import oakbarrel from '@/assets/aroma/oakbarrel.png';
import peach from '@/assets/aroma/peach.png';
import grass from '@/assets/aroma/grass.png';
import apple from '@/assets/aroma/apple.png';
import mineral from '@/assets/aroma/mineral.png';
import sea from '@/assets/aroma/sea.png';
import coconut from '@/assets/aroma/coconut.png';
import bread from '@/assets/aroma/bread.png';
import flower from '@/assets/aroma/flower.png';
import grape from '@/assets/aroma/grape.png';
import mint from '@/assets/aroma/mint.png';
import leaf from '@/assets/aroma/leaf.png';

export const AROMA_META = {
  CHERRY: { label: '체리', icon: cherry },
  CITRUS: { label: '오렌지', icon: orange },
  CHOCOLATE: { label: '초콜릿', icon: chocolate },
  OAK: { label: '오크배럴', icon: oakbarrel },
  PEACH: { label: '복숭아', icon: peach },
  GRASS: { label: '풀', icon: grass },
  APPLE: { label: '사과', icon: apple },
  MINERAL: { label: '소금결정', icon: mineral },
  TROPICAL: { label: '해변', icon: sea },
  BERRY: { label: '코코넛', icon: coconut },
  BAKING: { label: '식빵', icon: bread },
  FLOWER: { label: '꽃', icon: flower },
  SPICE: { label: '청포도', icon: grape },
  VANILLA: { label: '민트', icon: mint },
  EARTH: { label: '낙엽', icon: leaf },
} as const;

export type AromaType = keyof typeof AROMA_META;
