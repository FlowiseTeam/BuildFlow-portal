import { useState, useMemo } from 'react';
import { Data, SortDirection, TableColumn } from './Table';

export function useTable(columns: TableColumn[], data: Data, defaultSort?: { key: string; direction: SortDirection }) {
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
    const sortFactor = sortDirection === 'asc' ? 1 : -1;
    return [...data].sort((a, b) => (a[sortColumn.key] > b[sortColumn.key] ? sortFactor : -sortFactor));
  }, [data, sortColumn, sortDirection]);

  return { handleSort, sortedData, sortColumn, sortDirection };
}
