import { useWineForm } from '@/hooks/list';
import Button from '../common/ui/Button';
import Chip from '../common/ui/chip';
import Input from '../common/ui/Input';
import WineImageUpload from './WineImageUpload';
import { Wine, WineType } from '@/types/domain/wine';
import { useState } from 'react';
import { useForm } from '@/hooks/useForm';
import Spinner from '../common/ui/Spinner';
import { WINE_PRICE_MAX } from '@/constants/wine';

type Mode = 'create' | 'edit';

interface WineFormProps {
  mode: Mode;
  onSuccess?: (wine: Wine) => void;
}

interface WineFormFields {
  name: string;
  price: string;
  region: string;
  type: WineType | '';
  image: string;
  [key: string]: unknown;
}

const WINE_TYPES = ['RED', 'WHITE', 'SPARKLING'] as const;

export default function WineForm({ mode, onSuccess }: WineFormProps) {
  const form = useWineForm({ mode, onSuccess });
  const [type, setType] = useState<WineType | ''>('');
  const [image, setImage] = useState('');
  const { register, handleSubmit, errors } = useForm<WineFormFields>({ mode: 'onSubmit' });

  const onSubmit = handleSubmit(async values => {
    await form.submit({
      ...values,
      price: Number(values.price),
      type: values.type as WineType,
    });
    console.log('values:', values);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <WineImageUpload value={image} onChange={setImage} error={errors.image} />
      <input
        type="hidden"
        {...register('image', {
          required: '와인 사진은 필수 입력이에요',
        })}
        value={image}
      />

      <div className="flex flex-col gap-2">
        <span>와인 이름</span>
        <Input
          {...register('name', {
            required: '와인 이름은 필수 입력이에요',
          })}
          status={errors.name ? 'error' : 'default'}
          placeholder="와인 이름 입력"
        />
        {errors.name && <p className="text-red-500 text-[12px]">{errors.name}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <span>가격</span>
        <Input
          {...register('price', {
            required: '가격은 필수 입력이에요',
            validate: value => {
              const price = Number(value);
              if (!Number.isFinite(price)) {
                return '가격은 숫자만 입력 가능해요';
              }
              if (price < 0) return '가격은 0 이상이어야 해요';
              if (price > WINE_PRICE_MAX) {
                return `가격은 ${WINE_PRICE_MAX.toLocaleString()}원 이하만 가능해요`;
              }
            },
          })}
          status={errors.price ? 'error' : 'default'}
          placeholder="가격 입력"
        />
        {errors.price && <p className="text-red-500 text-[12px]">{errors.price}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <span>타입</span>
        <div className="flex gap-2">
          {WINE_TYPES.map(t => (
            <Chip key={t} label={t} selected={type === t} onClick={() => setType(t)} />
          ))}
        </div>
        <input
          type="hidden"
          {...register('type', {
            required: '와인 타입은 필수 입력이에요',
          })}
          value={type ?? ''}
        />
        {errors.type && <p className="text-red-500 text-[12px]">{errors.type}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <span>원산지</span>
        <Input
          {...register('region', {
            required: '원산지는 필수 입력이에요',
          })}
          status={errors.region ? 'error' : 'default'}
          placeholder="원산지 입력"
        />
        {errors.region && <p className="text-red-500 text-[12px]">{errors.region}</p>}
      </div>

      {form.formError && <p className="text-red-500 text-[12px] font-medium">{form.formError}</p>}

      <Button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? <Spinner /> : form.isEdit ? '와인 수정하기' : '와인 등록하기'}
      </Button>
    </form>
  );
}
