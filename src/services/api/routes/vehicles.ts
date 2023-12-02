import { vehiclesAxiosApi } from '../setup';

export interface Vehicle {
  _id: number;
  assigned_project: {
    _id: number;
    created_at: string;
    project_id: number;
    project_name: string;
    updated_at: string;
    vehicle_id: number;
  }[];
  capacity: null | number;
  created_at: string;
  mileage: number;
  name: string;
  reg_number: string;
  rev_date: null | string;
  status: string;
  updated_at: string;
}

export type FormVehicle = Omit<Vehicle, 'created_at' | 'updated_at' | '_id'>;

export interface VehiclesQuery {
  vehicles: Vehicle[];
  vehicles_count: number;
}

export interface VehicleQuery {
  vehicles: Vehicle;
}

export const getVehicles = async (): Promise<VehiclesQuery> => (await vehiclesAxiosApi.get('/vehicles')).data;

export const updateVehicle = async (vehicle: Vehicle) =>
  (await vehiclesAxiosApi.put(`/vehicles/${vehicle._id}`, vehicle)).data;

export const deleteVehicle = async (vehicleId: number) => await vehiclesAxiosApi.delete(`/vehicles/${vehicleId}`);

export const getVehicle = async (vehicleId: number) =>
  (await vehiclesAxiosApi.get(`/vehicles/${vehicleId}`)).data.vehicle;

export const createVehicle = async (vehicle: FormVehicle) => await vehiclesAxiosApi.post('/vehicles', vehicle);
