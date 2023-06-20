import { Button } from '@components/button/Button';
import { ColumnType } from './Table';

type CellProps =
  | {
      value: string;
      type: Exclude<ColumnType, 'text-array'>;
      centered?: boolean;
      onEdit?: () => void;
      options?: { value: string; className?: string }[];
    }
  | {
      value: string[];
      type: 'text-array';
      centered?: boolean;
      onEdit?: () => void;
      options?: { value: string; className?: string }[];
    };

export function Cell({ value, type, centered, onEdit, options }: CellProps) {
  let element;
  switch (type) {
    case 'select': {
      const styles = options?.find((option) => option.value.toLowerCase() === value.toLowerCase())?.className || '';
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
            {value}
          </Button>
        </td>
      );
      break;
    }
    case 'date': {
      element = (
        <td className={`px-6 py-4 ${centered ? 'text-center' : ''}`}>{new Date(value).toLocaleDateString('pl')}</td>
      );
      break;
    }
    case 'text-array': {
      element = (
        <td className={`px-6 py-4 ${centered ? 'text-center' : ''} flex flex-wrap gap-1`}>
          {value.map((item, index) => (
            <span className="mb-[4px] w-min whitespace-nowrap rounded bg-white px-2 shadow" key={index}>
              {item}
            </span>
          ))}
        </td>
      );
      break;
    }
    default: {
      element = <td className={`px-6 py-4 ${centered ? 'text-center' : ''}`}>{value}</td>;
    }
  }

  return element;
}
