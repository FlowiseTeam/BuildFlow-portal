import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { Vehicle, deleteVehicle, getVehicle, getVehicles, updateVehicle } from '../routes/vehicles';
import { useQueryClient } from '@tanstack/react-query';
import { queryClient } from '@src/App';

export function useVehicles() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const data = await getVehicles();
      data.vehicles.forEach((vehicle) => {
        queryClient.setQueryData(['vehicle', vehicle._id], vehicle);
      });
      return data;
    },
  });
}

export function useVehiclesSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const data = await getVehicles();

      data.vehicles.forEach((vehicle) => {
        queryClient.setQueryData(['vehicle', vehicle._id], vehicle);
      });

      return data;
    },
  });
}

export function useVehicleQuery(id: number) {
  return useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => {
      return getVehicle(id);
    },
  });
}

export function useVehicleSuspenseQuery(id: number) {
  return useSuspenseQuery({
    queryKey: ['vehicle', id],
    queryFn: () => {
      return getVehicle(id);
    },
  });
}

export function useVehicleMutation(id: number) {
  return useMutation({
    mutationKey: ['vehicle', id],
    mutationFn: (vehicle: Vehicle) => updateVehicle(vehicle),
    onSuccess: (_, vehicle) => {
      queryClient.setQueryData(['vehicle', id], vehicle);
    },
  });
}

export function useVehicleDeleteMutation(id: number) {
  return useMutation({
    mutationKey: ['vehicle', id],
    mutationFn: () => deleteVehicle(id),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ['vehicle', id] });
    },
  });
}

export function usePutVehicle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedVehicle: Vehicle) => updateVehicle(updatedVehicle),
    onSuccess(_, vehicle) {
      queryClient.setQueryData(['vehicle', vehicle._id], vehicle);
    },
  });
}
