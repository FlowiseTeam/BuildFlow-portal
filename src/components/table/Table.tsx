import { ArrowUpIcon } from '@heroicons/react/20/solid';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useTable } from './useTable';

export type TableColumn = {
  key: string;
  title: string;
  sortable?: boolean;
  center?: boolean;
};

export type Data = Array<Record<string, any> & { id: string }>;

export type SortDirection = 'asc' | 'desc';

type TableProps = {
  columns: TableColumn[];
  data: Data;
  defaultSort?: { key: string; direction: SortDirection };
  onEdit: (id: string) => void;
};

export function Table({ columns, data, defaultSort, onEdit }: TableProps) {
  const { handleSort, sortColumn, sortDirection, sortedData } = useTable(columns, data, defaultSort);

  return (
    <table className="w-full  text-sm text-left dark:text-gray-400 font-roboto">
      <thead className="text-xs uppercase  dark:bg-gray-700 dark:text-gray-400">
        <tr className="bg-gray-100">
          {columns.map((column) => (
            <th
              key={column.key}
              scope="col"
              className="px-6 py-3 cursor-pointer  first:rounded   "
              onClick={() => handleSort(column)}
            >
              <div className="flex items-baseline justify-center">
                {column.title}
                {column.sortable && (
                  <ArrowUpIcon
                    className={`w-3 h-3 ml-2 ${
                      column === sortColumn && (sortDirection === 'desc' ? 'transform rotate-180' : '')
                    } ${column === sortColumn ? '' : 'opacity-10'}`}
                  />
                )}
              </div>
            </th>
          ))}
          <th className="rounded-r">Edytuj</th>
        </tr>
      </thead>
      <tbody className="[&>*:nth-child(2n-1)]:bg-neutral-200/75 text-gray-700">
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
  );
}
