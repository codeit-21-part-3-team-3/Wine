import { Wine } from '@/types/domain/wine';

type WineInfoProps = Pick<Wine, 'name' | 'region' | 'price'>;

export default function WineInfo({ name, region, price }: WineInfoProps) {
  return (
    <div className="flex flex-col min-w-0 gap-2 md:gap-4">
      <div className="flex flex-col gap-1 md:gap-5">
        <h3 className="text-xl md:text-3xl lg:text-[32px] font-semibold max-w-75 wrap-break-word leading-8">
          {name}
        </h3>
        <span className="text-sm md:text-[16px] text-gray-400">{region}</span>
      </div>
      <div className="flex items-center flex-1">
        <span className="px-2.5 py-0.5 md:px-3.5 md:py-2 text-sm md:text-lg rounded-[10px] md:rounded-[12px] bg-gray-100 font-semibold">
          ₩ {price.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
