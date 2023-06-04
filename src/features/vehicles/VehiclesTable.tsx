import { Table, TableColumn } from '@src/components/table/Table';

const tableData = [{ id: 1, vehicle: '213123', plate: '21313', date: '10.23.24' }];

const columns = [
  { type: 'input', title: 'Pojazd', key: 'vehicle', sortable: true },
  { type: 'input', title: 'Numer rejestracyjny', key: 'plate', sortable: false },
  { type: 'input', title: 'Data przeglądu', key: 'date', sortable: false },
] satisfies TableColumn[];

export function VehiclesTable() {
  return <Table columns={columns} data={tableData} onRowClick={() => {}} />;
}
