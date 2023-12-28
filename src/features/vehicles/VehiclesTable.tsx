import { SearchInput } from '@src/components/Input/SearchInput';
import { Table, TableColumn } from '@src/components/table/Table';
import { useVehicles } from '@src/services/api/hooks/vehicles';
import { ChangeEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const columns = [
  { type: 'text', title: 'Nazwa', key: 'name', sortable: false, headCenter: false },
  { type: 'distance', title: 'Przebieg', key: 'mileage', sortable: true },
  { type: 'text', title: 'Numer rejestracyjny', key: 'reg_number', sortable: false, headCenter: false },
  { type: 'text-array', title: 'Przypisany projekt', key: 'assigned_project', sortable: false, headCenter: false },
  { type: 'date', title: 'Data przeglądu', key: 'rev_date', sortable: false, headCenter: false },
  {
    type: 'select',
    title: 'Status',
    key: 'status',
    sortable: true,
    headCenter: false,
    options: [
      { value: 'W boju', className: 'bg-yellow-300 hover:bg-yellow-400' },
      { value: 'W serwisie', className: 'bg-red-400 hover:bg-red-500' },
      { value: 'Na firmie', className: 'bg-green-400 hover:bg-green-500' },
    ],
  },
] satisfies TableColumn[];

export function VehiclesTable() {
  const { data, isLoading } = useVehicles();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleRowClick = (id: number) => {
    navigate(`/app/vehicles/${id}`);
  };

  const vehiclesTableData = useMemo(() => {
    const unfiltered =
      data?.vehicles.map((vehicle) => ({
        ...vehicle,
        id: vehicle._id,
        assigned_project: vehicle.assigned_project?.map((project) => project.project_name),
      })) || [];

    return unfiltered.filter(
      (vehicle) =>
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        vehicle.reg_number.toLowerCase().includes(searchQuery.toLowerCase().trim()),
    );
  }, [data, searchQuery]);

  return (
    <>
      <div className="mb-4">
        <SearchInput value={searchQuery} onChange={handleQueryChange} />
      </div>
      <Table
        columns={columns}
        data={vehiclesTableData}
        onRowClick={handleRowClick}
        isFetching={isLoading}
        editable={false}
      />
    </>
  );
}
