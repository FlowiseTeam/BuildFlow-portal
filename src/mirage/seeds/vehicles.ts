import { Server } from 'miragejs';

// city: 'Poznań',
//         client: 'Miasto Poznań',
//         created_at: '2023-06-21T17:42:54.789Z',
//         employees: [],
//         end_date: '2033-10-10T00:00:00.000Z',
//         name: 'Projekt Centrum',
//         start_date: '2001-10-10T00:00:00.000Z',
//         status: 'Zawieszony',
//         street: 'Święty Marcin',
//         updated_at: '2023-07-18T17:32:47.187Z',
//         zipcode: '60-700',
//         _id: 1,

export function getVehicleSeeds<T extends Server>(server: T) {
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
