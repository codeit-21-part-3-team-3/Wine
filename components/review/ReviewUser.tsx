interface ReviewUserProps {
  userName: string;
}

export default function ReviewUser({ userName }: ReviewUserProps) {
  return <p>{userName}</p>;
}
