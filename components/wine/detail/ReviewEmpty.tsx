import emptyIcon from '@/assets/images/empty.png';
import Image from 'next/image';
import Button from '@/components/common/ui/Button';

interface ReviewEmptyProps {
  onWriteClick?: () => void;
}

export default function ReviewEmpty({ onWriteClick }: ReviewEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center  w-full">
      <Image
        src={emptyIcon}
        alt=""
        aria-hidden
        width={136}
        height={136}
        className="mb-4 opacity-80 w-24 h-24 lg:w-[136px] lg:h-[136px] object-contain"
      />

      <p className="text-basic md:text-xl font-semibold text-muted-foreground mb-3">
        작성된 리뷰가 없습니다.
      </p>
      <Button
        variant="primary"
        className="w-52 mx-auto py-3 rounded-full text-lg font-bold shadow-md hover:shadow-lg transition-all active:scale-95 mt-4"
        onClick={onWriteClick}
      >
        리뷰 작성하기
      </Button>
    </div>
  );
}
