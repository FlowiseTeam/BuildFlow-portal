import { Button } from '@components/button/Button';
import { ColumnType } from './Table';

export function Cell({
  text,
  type,
  centered,
  onEdit,
  options,
}: {
  text: string;
  type: ColumnType;
  centered?: boolean;
  onEdit?: () => void;
  options?: { value: string; className?: string }[];
}) {
  let element;
  switch (type) {
    case 'select': {
      const styles = options?.find((option) => option.value.toLowerCase() === text.toLowerCase())?.className || '';
      element = (
        <td className={`${centered ? 'text-center' : ''}`}>
          <Button
            variant="none"
            className={`${styles}`}
            onClick={(e) => {
              onEdit && e.stopPropagation();
              onEdit && onEdit();
            }}
          >
            {text}
          </Button>
        </td>
      );
      break;
    }
    case 'date': {
      element = (
        <td className={`px-6 py-4 ${centered ? 'text-center' : ''}`}>{new Date(text).toLocaleDateString('pl')}</td>
      );
      break;
    }
    default: {
      element = <td className={`px-6 py-4 ${centered ? 'text-center' : ''}`}>{text}</td>;
    }
  }

  return element;
}
