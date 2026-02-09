interface ReviewContentProps {
  content: string;
}

export default function ReviewContent({ content }: ReviewContentProps) {
  return <p>{content}</p>;
}
