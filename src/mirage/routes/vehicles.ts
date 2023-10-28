import { Response } from 'miragejs';
import { ServerType } from '../mirageMockServer';

let vehicleId = 1;

export function vehiclesRoutes(server: ServerType, API_URL: string) {
  function url(path: string) {
    return `${API_URL}/${path}`;
  }
  server.get(url('vehicles'), (schema) => {
    const vehicles = schema.all('vehicle').models;

    return {
      vehicles,
      vehicles_count: vehicles.length,
    };
  });

  server.get(url('vehicles/:id'), (schema, request) => {
    const vehicle = schema.find('vehicle', request.params.id);

    if (!vehicle) {
      return new Response(404);
    }

    return {
      vehicle,
    };
  });

  server.post(url('vehicles'), (schema, request) => {
    const attrs = JSON.parse(request.requestBody);

    Object.assign(attrs, { _id: ++vehicleId, assigned_project: [], updated_at: new Date(), created_at: new Date() });
    schema.create('vehicle', attrs);

    return { vehicle: attrs };
  });

  server.put(url('vehicles/:id'), (_, request) => {
    const attrs = JSON.parse(request.requestBody);
    const vehicle = server.schema.vehicles.find(attrs._id);

    return vehicle.update(attrs);
  });
}
