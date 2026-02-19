import { Fragment } from 'react/jsx-runtime';
import AromaBadge from './AromaBadge';
import { AromaType } from '@/constants/aromaMap';

interface AromaListProps {
  aromas: AromaType[];
}

export default function AromaList({ aromas }: AromaListProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-1 gap-y-2 mb-2">
      {aromas.map((a, i) => (
        <Fragment key={a}>
          <AromaBadge type={a} />
          {i < aromas.length - 1 && <span className="inline-block px-1 text-gray-400">·</span>}
        </Fragment>
      ))}
    </div>
  );
}
