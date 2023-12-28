import { ServerType } from '../mirageMockServer';

export function getProjectSeeds(server: ServerType) {
  const projectOne = server.create('project', {
    city: 'Poznań',
    client: 'Miasto Poznań',
    created_at: '2023-06-21T17:42:54.789Z',
    employees: [],
    end_date: '2033-10-10T00:00:00.000Z',
    name: 'Projekt Centrum',
    start_date: '2001-10-10T00:00:00.000Z',
    status: 'Zawieszony',
    street: 'Święty Marcin',
    updated_at: '2023-07-18T17:32:47.187Z',
    zipcode: '60-700',
    _id: 1,
  });

  server.create('project', {
    city: 'Ostrów',
    client: 'Miasto Poznań',
    created_at: '2023-06-21T17:42:54.789Z',
    employees: [],
    end_date: '2033-10-10T00:00:00.000Z',
    name: 'Projekt Centrum',
    start_date: '2001-10-10T00:00:00.000Z',
    status: 'Zawieszony',
    street: 'Warszawska',
    updated_at: '2023-07-18T17:32:47.187Z',
    zipcode: '60-700',
    _id: 1,
  });

  server.create('project', {
    city: 'Kalisz',
    client: 'Miasto Poznań',
    created_at: '2023-06-21T17:42:54.789Z',
    employees: [],
    end_date: '2033-10-10T00:00:00.000Z',
    name: 'Projekt Centrum',
    start_date: '2001-10-10T00:00:00.000Z',
    status: 'Zawieszony',
    street: 'Dąbrowskiego',
    updated_at: '2023-07-18T17:32:47.187Z',
    zipcode: '60-700',
    _id: 1,
  });

  return { projectOne };
}
