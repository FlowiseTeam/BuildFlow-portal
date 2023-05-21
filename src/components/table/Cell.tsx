import { Button } from '@components/button/Button';

export function Cell({
  text,
  type,
  centered,
  onEdit,
}: {
  text: string;
  type: 'select' | 'input';
  centered?: boolean;
  onEdit?: () => void;
}) {
  let element;
  switch (type) {
    case 'select': {
      element = (
        <td className={centered ? 'text-center' : ''}>
          <Button onClick={onEdit}>{text}</Button>
        </td>
      );
      break;
    }
    default: {
      element = <td className={`px-6 py-4 ${centered ? 'text-center' : ''}`}>{text}</td>;
    }
  }

  return element;
}
