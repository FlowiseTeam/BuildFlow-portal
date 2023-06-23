import { useState, useMemo } from 'react';
import { CellProps, SortDirection, TableColumn } from './Table';

export function useTable(
  columns: TableColumn[],
  data: CellProps[],
  defaultSort?: { key: string; direction: SortDirection },
) {
  const initialSortColumn = columns.find((column) => column.key === defaultSort?.key) || null;
  const [sortColumn, setSortColumn] = useState<TableColumn | null>(initialSortColumn);
  const [sortDirection, setSortDirection] = useState<SortDirection>(defaultSort?.direction || 'asc');

  const handleSort = (column: TableColumn) => {
    if (!column.sortable) {
      return;
    }
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortColumn) {
      return data;
    }

    const dataType = sortColumn.type;
    const sortFactor = sortDirection === 'asc' ? 1 : -1;

    switch (dataType) {
      case 'select':
      case 'text': {
        return [...data].sort((a, b) =>
          a[sortColumn.key].toLowerCase() > b[sortColumn.key].toLowerCase() ? sortFactor : -sortFactor,
        );
      }
      case 'number': {
        return [...data].sort((a, b) => (a[sortColumn.key] > b[sortColumn.key] ? sortFactor : -sortFactor));
      }
      case 'date': {
        return [...data].sort((a, b) =>
          new Date(a[sortColumn.key]).getTime() - new Date(b[sortColumn.key]).getTime() > 0 ? sortFactor : -sortFactor,
        );
      }
      default: {
        return [...data].sort();
      }
    }
  }, [data, sortColumn, sortDirection]);

  return { handleSort, sortedData, sortColumn, sortDirection };
}
