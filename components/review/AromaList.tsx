interface AromaListProps {
  aromas: string[];
}

export default function AromaList({ aromas }: AromaListProps) {
  return <p>{aromas}</p>;
}
