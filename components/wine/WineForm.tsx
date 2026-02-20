import { useWineForm } from '@/hooks/list';
import Button from '../common/ui/Button';
import Chip from '../common/ui/chip';
import Input from '../common/ui/Input';
import WineImageUpload from './WineImageUpload';
import { Wine } from '@/types/domain/wine';

type Mode = 'create' | 'edit';

interface WineFormProps {
  mode: Mode;
  onSuccess?: (wine: Wine) => void;
}

const WINE_TYPES = ['RED', 'WHITE', 'SPARKLING'] as const;

export default function WineForm({ mode, onSuccess }: WineFormProps) {
  const form = useWineForm({ mode, onSuccess });

  return (
    <div className="flex flex-col gap-6">
      <WineImageUpload
        value={form.image}
        onChange={form.setImage}
        status={form.errors.image ? 'error' : 'default'}
      />
      {form.errors.image && <p className="text-red-500 text-[12px]">{form.errors.image}</p>}

      <div className="flex flex-col gap-2">
        <span>와인 이름</span>
        <Input
          status={form.errors.name ? 'error' : 'default'}
          value={form.name}
          onChange={e => form.setName(e.target.value)}
          placeholder="와인 이름 입력"
        />
        {form.errors.name && <p className="text-red-500 text-[12px]">{form.errors.name}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <span>가격</span>
        <Input
          status={form.errors.price ? 'error' : 'default'}
          value={form.price}
          onChange={e => form.setPrice(e.target.value)}
          placeholder="가격 입력"
        />
        {form.errors.price && <p className="text-red-500 text-[12px]">{form.errors.price}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <span>타입</span>
        <div className="flex gap-2">
          {WINE_TYPES.map(t => (
            <Chip key={t} label={t} selected={form.type === t} onClick={() => form.toggleType(t)} />
          ))}
        </div>
        {form.errors.type && <p className="text-red-500 text-[12px]">{form.errors.type}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <span>원산지</span>
        <Input
          status={form.errors.region ? 'error' : 'default'}
          value={form.region}
          onChange={e => form.setRegion(e.target.value)}
          placeholder="원산지 입력"
        />
        {form.errors.region && <p className="text-red-500 text-[12px]">{form.errors.region}</p>}
      </div>

      {form.errors.form && (
        <p className="text-red-500 text-[12px] font-medium">{form.errors.form}</p>
      )}

      <Button onClick={form.submit} disabled={form.isSubmitting}>
        {form.isSubmitting ? '등록 중...' : form.isEdit ? '와인 수정하기' : '와인 등록하기'}
      </Button>
    </div>
  );
}
