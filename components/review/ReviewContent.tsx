interface ReviewContentProps {
  content: string;
}

export default function ReviewContent({ content }: ReviewContentProps) {
  return <p className="text-gray-700 leading-6 whitespace-pre-line">{content}</p>;
}
