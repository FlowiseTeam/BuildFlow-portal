import { useMutation, useQuery } from 'react-query';
import { Vehicle, getVehicle, getVehicles, updateVehicle } from '../routes/vehicles';
import { queryClient } from '@src/App';

export function useVehicles({ suspense }: { suspense?: boolean } = { suspense: true }) {
  return useQuery('vehicles', getVehicles, {
    suspense,
    onSuccess: (queryData) => {
      queryData.vehicles.forEach((vehicle: Vehicle) => {
        queryClient.setQueryData(['vehicle', vehicle._id], vehicle);
      });
    },
  });
}

export function useVehicle(id: number) {
  return useQuery(['vehicle', id], () => getVehicle(id), { suspense: true });
}

export function usePutVehicle() {
  return useMutation((updatedVehicle: Vehicle) => updateVehicle(updatedVehicle), {
    onSuccess(_, vehicle) {
      queryClient.setQueryData(['vehicle', vehicle._id], vehicle);
    },
  });
}
