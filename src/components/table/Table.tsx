import { ArrowUpIcon } from '@heroicons/react/20/solid';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useTable } from './useTable';

export type TableColumn = {
  key: string;
  title: string;
  sortable?: boolean;
  center?: boolean;
};

export type Data = Array<Record<string, any> & { id: number }>;

export type SortDirection = 'asc' | 'desc';

type TableProps = {
  columns: TableColumn[];
  data: Data;
  defaultSort?: { key: string; direction: SortDirection };
  onEdit: (id: number) => void;
};

export function Table({ columns, data, defaultSort, onEdit }: TableProps) {
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
                className="cursor-pointer px-6 py-3  first:rounded   "
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
            <th className="rounded-r">Edytuj</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 [&>*:nth-child(2n-1)]:bg-neutral-200/75">
          {sortedData.map((row) => (
            <tr className="px-6 py-4" key={row.id}>
              {columns.map((column) => (
                <td key={column.key} className={`px-6 py-4 ${column.center ? 'text-center' : ''}`}>
                  {row[column.key]}
                </td>
              ))}
              <td className=" py-4">
                <button onClick={() => onEdit(row.id)}>
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
