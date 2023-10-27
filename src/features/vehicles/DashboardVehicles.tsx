import { useVehicles } from '@src/services/api/hooks/vehicles';
import { VehiclesTable } from './VehiclesTable';

export function DashboardVehicles() {
  const { data } = useVehicles();
  return <VehiclesTable vehicles={data.vehicles} />;
}
