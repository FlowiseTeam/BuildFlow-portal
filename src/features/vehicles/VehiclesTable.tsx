import { Table, TableColumn } from '@src/components/table/Table';

const tableData = [{ id: 1, vehicle: '213123', plate: '21313', date: '10.23.24' }];

const columns = [
  { type: 'select', title: 'Pojazd', key: 'vehicle', sortable: true },
  { type: 'select', title: 'Numer rejestracyjny', key: 'plate', sortable: false },
  { type: 'select', title: 'Data przeglądu', key: 'date', sortable: false },
] satisfies TableColumn[];

export function VehiclesTable() {
  return <Table columns={columns} data={tableData} onRowClick={() => {}} />;
}
