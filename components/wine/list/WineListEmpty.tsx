import emptyIcon from '@/assets/images/empty.png';
import Image from 'next/image';

interface WineListEmptyProps {
  title?: string;
  description?: string;
}

export default function WineListEmpty({
  title = '아직 아무도 모르는 와인이네요!',
  description = '지금 등록해서 다른 사람들에게 첫 번째로 소개해보세요',
}: WineListEmptyProps) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center py-20 text-center">
      <Image src={emptyIcon} alt="" aria-hidden width={136} height={136} className="mb-4" />
      <p className="text-2xl font-semibold text-muted-foreground mb-3">{title}</p>
      <p className="text-lg text-gray-300">{description}</p>
    </div>
  );
}
