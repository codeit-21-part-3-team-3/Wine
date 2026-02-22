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

import cherryImg from '@/assets/aroma-notes/cherry.png';
import orangeImg from '@/assets/aroma-notes/orange.png';
import chocolateImg from '@/assets/aroma-notes/chocolate.png';
import oakbarrelImg from '@/assets/aroma-notes/oakbarrel.png';
import peachImg from '@/assets/aroma-notes/peach.png';
import grassImg from '@/assets/aroma-notes/grass.png';
import appleImg from '@/assets/aroma-notes/apple.png';
import mineralImg from '@/assets/aroma-notes/mineral.png';
import seaImg from '@/assets/aroma-notes/sea.png';
import coconutImg from '@/assets/aroma-notes/coconut.png';
import breadImg from '@/assets/aroma-notes/bread.png';
import flowerImg from '@/assets/aroma-notes/flower.png';
import grapeImg from '@/assets/aroma-notes/grape.png';
import mintImg from '@/assets/aroma-notes/mint.png';
import leafImg from '@/assets/aroma-notes/leaf.png';

export const AROMA_META = {
  APPLE: { label: '사과', icon: apple, image: appleImg },
  BAKING: { label: '식빵', icon: baking, image: breadImg },
  BERRY: { label: '청포도', icon: grape, image: grapeImg },
  CHERRY: { label: '체리', icon: cherry, image: cherryImg },
  CHOCOLATE: { label: '초콜릿', icon: chocolate, image: chocolateImg },
  CITRUS: { label: '오렌지', icon: orange, image: orangeImg },
  EARTH: { label: '낙엽', icon: leaf, image: leafImg },
  FLOWER: { label: '꽃', icon: flower, image: flowerImg },
  GRASS: { label: '풀', icon: grass, image: grassImg },
  MINERAL: { label: '소금결정', icon: mineral, image: mineralImg },
  OAK: { label: '오크배럴', icon: oak, image: oakbarrelImg },
  PEACH: { label: '복숭아', icon: peach, image: peachImg },
  PEPPER: { label: '민트', icon: mint, image: mintImg },
  TROPICAL: { label: '해변', icon: sea, image: seaImg },
  VANILLA: { label: '코코넛', icon: coconut, image: coconutImg },
} as const;

export type AromaType = keyof typeof AROMA_META;
