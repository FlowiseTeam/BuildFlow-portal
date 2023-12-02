import { ServerType } from '../mirageMockServer';

export function getVehicleSeeds(server: ServerType) {
  server.create('vehicle', {
    _id: 1,
    assigned_project: [],
    capacity: null,
    created_at: '2023-10-25T16:36:00.831Z',
    mileage: 100000,
    name: 'Jaworek',
    reg_number: 'POS12313',
    rev_date: null,
    status: 'W boju',
    updated_at: '2023-10-25T16:36:00.831Z',
  });
}
