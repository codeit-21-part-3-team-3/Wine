import { useWineForm } from '@/hooks/list';
import Button from '../common/ui/Button';
import Chip from '../common/ui/chip';
import Input from '../common/ui/Input';
import WineImageUpload from './WineImageUpload';
import { Wine, WineType } from '@/types/domain/wine';
import { useRef, useState } from 'react';

type Mode = 'create' | 'edit';

interface WineFormProps {
  mode: Mode;
  onSuccess?: (wine: Wine) => void;
}

const WINE_TYPES = ['RED', 'WHITE', 'SPARKLING'] as const;

export default function WineForm({ mode, onSuccess }: WineFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useWineForm({ mode, onSuccess });
  const [type, setType] = useState<WineType | null>(null);
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const values = {
      name: String(formData.get('name') ?? ''),
      price: Number(formData.get('price') ?? 0),
      region: String(formData.get('region') ?? ''),
      type,
      image,
    };

    form.submit(values);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
      <WineImageUpload value={image} onChange={setImage} error={form.errors.image} />

      <div className="flex flex-col gap-2">
        <span>와인 이름</span>
        <Input
          name="name"
          status={form.errors.name ? 'error' : 'default'}
          placeholder="와인 이름 입력"
        />
        {form.errors.name && <p className="text-red-500 text-[12px]">{form.errors.name}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <span>가격</span>
        <Input
          name="price"
          type="text"
          status={form.errors.price ? 'error' : 'default'}
          placeholder="가격 입력"
        />
        {form.errors.price && <p className="text-red-500 text-[12px]">{form.errors.price}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <span>타입</span>
        <div className="flex gap-2">
          {WINE_TYPES.map(t => (
            <Chip key={t} label={t} selected={type === t} onClick={() => setType(t)} />
          ))}
        </div>
        {form.errors.type && <p className="text-red-500 text-[12px]">{form.errors.type}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <span>원산지</span>
        <Input
          name="region"
          status={form.errors.region ? 'error' : 'default'}
          placeholder="원산지 입력"
        />
        {form.errors.region && <p className="text-red-500 text-[12px]">{form.errors.region}</p>}
      </div>

      {form.errors.form && (
        <p className="text-red-500 text-[12px] font-medium">{form.errors.form}</p>
      )}

      <Button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? '등록 중...' : form.isEdit ? '와인 수정하기' : '와인 등록하기'}
      </Button>
    </form>
  );
}
