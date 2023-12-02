import { useVehicles } from '@src/services/api/hooks/vehicles';
import { VehiclesTable } from './VehiclesTable';
import { queryClient } from '@src/App';

export function DashboardVehicles() {
  const { data } = useVehicles(queryClient);
  return <VehiclesTable vehicles={data.vehicles} />;
}
