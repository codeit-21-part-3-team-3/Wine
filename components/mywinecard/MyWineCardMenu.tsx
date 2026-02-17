import { Dropdown } from '../common/ui/Dropdown';
import Icon from '../common/ui/Icon';

interface MyWineCardMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function MyWineCardMenu({ onEdit, onDelete }: MyWineCardMenuProps) {
  return (
    <Dropdown className="mt-2">
      <Dropdown.Trigger>
        <Icon name="kebab" alt="메뉴" size={30} />
      </Dropdown.Trigger>

      <Dropdown.Menu>
        <Dropdown.Item onClick={onEdit}>수정하기</Dropdown.Item>
        <Dropdown.Item onClick={onDelete}>삭제하기</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
