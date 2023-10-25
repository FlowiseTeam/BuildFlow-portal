import { Server, Response } from 'miragejs';
import { AppSchema } from '../mirageMockServer';

let vehicleId = 1;

export function vehiclesRoutes<T extends Server>(server: T, API_URL: string) {
  server.get(`${API_URL}/vehicles/`, (schema) => {
    const vehicles = schema.all('vehicle').models;

    return {
      vehicles,
      vehicles_count: vehicles.length,
    };
  });

  server.get(`${API_URL}/vehicles/:id`, (schema, request) => {
    const vehicle = schema.find('vehicle', request.params.id);

    if (!vehicle) {
      return new Response(404);
    }

    return {
      vehicle,
    };
  });

  server.post(`${API_URL}/vehicles`, (schema: AppSchema, request) => {
    const attrs = JSON.parse(request.requestBody);

    Object.assign(attrs, { _id: ++vehicleId });

    return schema.vehicles.create(attrs);
  });
}
