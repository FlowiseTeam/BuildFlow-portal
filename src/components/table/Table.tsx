import { ArrowUpIcon } from '@heroicons/react/20/solid';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useTable } from './useTable';
import { Cell } from './Cell';

export type TableColumn = {
  key: string;
  title: string;
  sortable?: boolean;
  sortbyOrder?: 'desc' | 'asc';
  center?: boolean;
  isEditable?: boolean;
  type: 'select' | 'input';
  options?: string[];
};

export interface CellProps {
  id: number;
  [key: string]: any;
}

export type SortDirection = 'asc' | 'desc';

type TableProps = {
  columns: TableColumn[];
  data: CellProps[];
  defaultSort?: { key: string; direction: SortDirection };
  onEdit?: (id: number) => void;
  onRowClick: (id: number) => void;
};

export function Table({ columns, data, defaultSort, onEdit, onRowClick }: TableProps) {
  const { handleSort, sortColumn, sortDirection, sortedData } = useTable(columns, data, defaultSort);

  return (
    <div className="overflow-x-scroll">
      <table className="font-roboto w-full text-left text-sm dark:text-gray-400">
        <thead className="text-xs uppercase  dark:bg-gray-700 dark:text-gray-400">
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="cursor-pointer px-6 py-3  first:rounded-tl   "
                onClick={() => handleSort(column)}
              >
                <div className="flex items-baseline justify-center">
                  {column.title}
                  {column.sortable && (
                    <ArrowUpIcon
                      className={`ml-2 h-3 w-3 ${
                        column === sortColumn && (sortDirection === 'desc' ? 'rotate-180 transform' : '')
                      } ${column === sortColumn ? '' : 'opacity-10'}`}
                    />
                  )}
                </div>
              </th>
            ))}
            <th className="rounded-tr opacity-0">Edytuj</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 [&>*:nth-child(2n-1)]:bg-neutral-200/75">
          {sortedData.map((row) => (
            <tr
              className="px-6 py-4 hover:cursor-pointer hover:!bg-black/10"
              key={row.id}
              onClick={() => onRowClick(row.id)}
            >
              {columns.map((column) => (
                <Cell
                  key={column.key}
                  centered={column.center}
                  text={row[column.key]}
                  type={column.type}
                  onEdit={onEdit ? () => onEdit(row.id) : undefined}
                />
              ))}
              <td className=" py-4">
                <button onClick={onEdit ? () => onEdit(row.id) : undefined}>
                  <PencilIcon className="h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
