import { ArrowUpIcon } from '@heroicons/react/20/solid';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useTable } from './useTable';
import { Cell } from './Cell';
import { Button } from '../button/Button';

export type ColumnType = 'select' | 'text' | 'date' | 'number' | 'text-array' | 'distance';

export type TableColumn = {
  key: string;
  title: string;
  sortable?: boolean;
  sortbyOrder?: 'desc' | 'asc';
  center?: boolean;
  headCenter?: boolean;
  isEditable?: boolean;
  type: ColumnType;
  options?: { value: string; className?: string }[];
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
  editable?: boolean;
  isFetching?: boolean;
  onEdit?: (id: number) => void;
  onRowClick: (id: number) => void;
};

export function Table({ columns, data, defaultSort, onEdit, onRowClick, editable = true, isFetching }: TableProps) {
  const { handleSort, sortColumn, sortDirection, sortedData } = useTable(columns, data, defaultSort);

  return (
    <div className="overflow-x-auto">
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
                <div className={`flex items-baseline ${column.headCenter === false ? '' : 'justify-center'} `}>
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
            {editable && <th className="rounded-tr opacity-0">Edytuj</th>}
          </tr>
        </thead>
        <tbody className="relative text-gray-700 [&>*:nth-child(2n-1)]:bg-neutral-200/75">
          {isFetching && <TableSpinner />}
          {isFetching && !data.length && (
            <FallbackTableItems colsLength={editable ? columns.length + 1 : columns.length} />
          )}
          {sortedData.map((row) => (
            <tr
              className="px-6 py-4 hover:cursor-pointer hover:!bg-black/10"
              key={row.id}
              onClick={() => onRowClick(row.id)}
            >
              {columns.map((column) => (
                <Cell
                  options={column.options}
                  key={column.key}
                  centered={column.center}
                  value={row[column.key]}
                  type={column.type}
                  onEdit={onEdit ? () => onEdit(row.id) : undefined}
                />
              ))}
              {editable && (
                <td className="py-4">
                  <Button aria-label="edytuj" variant="light" className="rounded-lg px-[6px]">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableSpinner() {
  return (
    <tr className="absolute flex h-full w-full cursor-wait items-center justify-center bg-black/10">
      <td role="status">
        <svg
          aria-hidden="true"
          className="mr-2 h-8 w-8 animate-spin fill-purple-600 text-gray-200 dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </td>
    </tr>
  );
}

function FallbackTableItems({ colsLength }: { colsLength: number }) {
  return (
    <>
      <tr className="h-12  px-6 py-4">
        {new Array(colsLength).fill(true).map((_, i) => (
          <td className="bg-neutral-300" key={i}></td>
        ))}
      </tr>
      <tr className="h-12  px-6 py-4">
        {new Array(colsLength).fill(true).map((_, i) => (
          <td key={i}></td>
        ))}
      </tr>
      <tr className="h-12  px-6 py-4">
        {new Array(colsLength).fill(true).map((_, i) => (
          <td className="bg-neutral-300" key={i}></td>
        ))}
      </tr>
      <tr className="h-12  px-6 py-4">
        {new Array(colsLength).fill(true).map((_, i) => (
          <td key={i}></td>
        ))}
      </tr>
    </>
  );
}
