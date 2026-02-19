import { Dropdown } from '../common/ui/Dropdown';
import Icon from '../common/ui/Icon';

interface ReviewMenuProps {
  reviewId: number;
  onEdit?: (reviewId: number) => void;
  onDelete?: (reviewId: number) => void;
}

export default function ReviewMenu({ reviewId, onEdit, onDelete }: ReviewMenuProps) {
  const handleEdit = () => {
    onEdit?.(reviewId);
  };

  const handleDelete = () => {
    onDelete?.(reviewId);
  };

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Icon name="kebab" size={30} aria-label="리뷰 메뉴" />
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleEdit}>수정하기</Dropdown.Item>
        <Dropdown.Item onClick={handleDelete}>삭제하기</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
