import Button from '../common/ui/Button';
import Chip from '../common/ui/chip';
import Input from '../common/ui/Input';
import WineImageUpload from './WineImageUpload';

type Mode = 'create' | 'edit';

interface WineFormProps {
  mode: Mode;
}

const WINE_TYPES = ['Red', 'White', 'Sparkling'];

export default function WineForm({ mode }: WineFormProps) {
  const isEdit = mode === 'edit';

  return (
    <div className="flex flex-col gap-6">
      <WineImageUpload />

      <div className="flex flex-col gap-2">
        <span>와인 이름</span>
        <Input placeholder="와인 이름 입력" />
      </div>

      <div className="flex flex-col gap-2">
        <span>가격</span>
        <Input placeholder="가격 입력" />
      </div>

      <div className="flex flex-col gap-2">
        <span>타입</span>
        <div className="flex gap-2">
          {WINE_TYPES.map(type => (
            <Chip key={type} label={type} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span>원산지</span>
        <Input placeholder="원산지 입력" />
      </div>

      <Button>{isEdit ? '와인 수정하기' : '와인 등록하기'}</Button>
    </div>
  );
}
