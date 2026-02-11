import { Fragment } from 'react/jsx-runtime';
import AromaBadge from './AromaBadge';
import { AromaType } from '@/constants/aromaMap';

interface AromaListProps {
  aromas: AromaType[];
}

export default function AromaList({ aromas }: AromaListProps) {
  return (
    <div className="flex gap-2 mb-2">
      {aromas.map((a, i) => (
        <Fragment key={a}>
          <AromaBadge type={a} />
          {i < aromas.length - 1 && <span>·</span>}
        </Fragment>
      ))}
    </div>
  );
}
