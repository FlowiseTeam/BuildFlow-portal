import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import {
  FormVehicle,
  Vehicle,
  createVehicle,
  deleteVehicle,
  getVehicle,
  getVehicles,
  updateVehicle,
} from '../routes/vehicles';
import { useQueryClient } from '@tanstack/react-query';
import { queryClient } from '@src/App';

export const VEHICLE = 'VEHICLE';
export const VEHICLES = 'VEHICLES';

export function useVehicles() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: [VEHICLES],
    queryFn: async () => {
      const data = await getVehicles();
      data.vehicles.forEach((vehicle) => {
        queryClient.setQueryData([VEHICLE, vehicle._id], vehicle);
      });
      return data;
    },
  });
}

export function useVehiclesSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: [VEHICLES],
    queryFn: async () => {
      const data = await getVehicles();

      data.vehicles.forEach((vehicle) => {
        queryClient.setQueryData([VEHICLE, vehicle._id], vehicle);
      });

      return data;
    },
  });
}

export function useVehicleQuery(id: number) {
  return useQuery({
    queryKey: [VEHICLE, id],
    queryFn: () => {
      return getVehicle(id);
    },
  });
}

export function useVehicleSuspenseQuery(id: number) {
  return useSuspenseQuery({
    queryKey: [VEHICLE, id],
    queryFn: () => {
      return getVehicle(id);
    },
  });
}

export function useVehicleMutation(id: number) {
  return useMutation({
    mutationKey: [VEHICLE, id],
    mutationFn: (vehicle: Vehicle) => updateVehicle(vehicle),
    onSuccess: (_, vehicle) => {
      queryClient.setQueryData([VEHICLE, id], vehicle);
    },
  });
}

export function useVehicleDetach(id: number) {
  return useMutation({
    mutationKey: [VEHICLE, id],
    mutationFn: () => deleteVehicle(id),
  });
}

export function useVehicleCreate() {
  return useMutation({
    mutationFn: (vehicle: FormVehicle) => createVehicle(vehicle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VEHICLES] });
    },
  });
}

export function useVehicleDeleteMutation(id: number) {
  return useMutation({
    mutationKey: [VEHICLE, id],
    mutationFn: () => deleteVehicle(id),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: [VEHICLE, id] });
    },
  });
}

export function usePutVehicle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedVehicle: Vehicle) => updateVehicle(updatedVehicle),
    onSuccess(_, vehicle) {
      queryClient.setQueryData([VEHICLE, vehicle._id], vehicle);
    },
  });
}
