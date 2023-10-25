import { Table, TableColumn } from '@src/components/table/Table';
import { useVehicles } from '@src/services/api/hooks/vehicles';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const columns = [
  { type: 'text', title: 'Nazwa', key: 'name', sortable: false, headCenter: false },
  { type: 'distance', title: 'Przebieg', key: 'mileage', sortable: true },
  { type: 'text', title: 'Numer rejestracyjny', key: 'reg_number', sortable: false, headCenter: false },
  { type: 'text-array', title: 'Przypisany projekt', key: 'assigned_project', sortable: false, headCenter: false },
  { type: 'date', title: 'Data przeglądu', key: 'rev_date', sortable: false, headCenter: false },
  { type: 'text', title: 'Status', key: 'status', sortable: true, headCenter: false },
] satisfies TableColumn[];

export function VehiclesTable() {
  const { data, isLoading } = useVehicles({ suspense: false });
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    navigate(`/app/vehicles/${id}`);
  };

  const vehiclesTableData = useMemo(
    () =>
      data?.vehicles.map((vehicle) => ({
        ...vehicle,
        id: vehicle._id,
        assigned_project: vehicle.assigned_project?.map((project) => project.project_name),
      })) || [],
    [data],
  );

  return <Table columns={columns} data={vehiclesTableData} onRowClick={handleRowClick} isFetching={isLoading} />;
}
