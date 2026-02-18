import { Wine } from '@/types/domain/wine';
import MyWineCardMenu from './MyWineCardMenu';

type MyWineCardInfoProps = Pick<Wine, 'name' | 'region' | 'price'> & {
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function MyWineCardInfo({
  name,
  region,
  price,
  onEdit,
  onDelete,
}: MyWineCardInfoProps) {
  return (
    <div className="mt-3 space-y-1">
      <div className="flex justify-between items-start gap-2">
        <p className="text-2xl font-semibold leading-snug line-clamp-2">{name}</p>
        <MyWineCardMenu onEdit={onEdit} onDelete={onDelete} />
      </div>

      <p className="text-sm text-gray-400">{region}</p>

      <p className="text-2xl font-bold mt-6 mb-5">{price.toLocaleString()}원</p>
    </div>
  );
}
