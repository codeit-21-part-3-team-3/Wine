import apple from '@/assets/aroma/apple.png';
import baking from '@/assets/aroma/bread.png';
import cherry from '@/assets/aroma/cherry.png';
import chocolate from '@/assets/aroma/chocolate.png';
import coconut from '@/assets/aroma/coconut.png';
import flower from '@/assets/aroma/flower.png';
import grape from '@/assets/aroma/grape.png';
import grass from '@/assets/aroma/grass.png';
import leaf from '@/assets/aroma/leaf.png';
import mineral from '@/assets/aroma/mineral.png';
import mint from '@/assets/aroma/mint.png';
import oak from '@/assets/aroma/oakbarrel.png';
import orange from '@/assets/aroma/orange.png';
import peach from '@/assets/aroma/peach.png';
import sea from '@/assets/aroma/sea.png';

export const AROMA_META = {
  APPLE: { label: '사과', icon: apple },
  BAKING: { label: '식빵', icon: baking },
  BERRY: { label: '청포도', icon: grape },
  CHERRY: { label: '체리', icon: cherry },
  CHOCOLATE: { label: '초콜릿', icon: chocolate },
  CITRUS: { label: '오렌지', icon: orange },
  EARTH: { label: '낙엽', icon: leaf },
  FLOWER: { label: '꽃', icon: flower },
  GRASS: { label: '풀', icon: grass },
  MINERAL: { label: '소금결정', icon: mineral },
  OAK: { label: '오크배럴', icon: oak },
  PEACH: { label: '복숭아', icon: peach },
  PEPPER: { label: '민트', icon: mint }, //
  TROPICAL: { label: '해변', icon: sea },
  VANILLA: { label: '코코넛', icon: coconut },
} as const;

export type AromaType = keyof typeof AROMA_META;
