import { Server, Response } from 'miragejs';
import { AppSchema } from '../mirageMockServer';

let employeeId = 1;

export function employeesRoutes<T extends Server>(server: T, API_URL: string) {
  server.get(`${API_URL}/employees/`, (schema) => {
    const employees = schema.all('employee').models;

    return {
      employees,
      employees_count: employees.length,
    };
  });

  server.get(`${API_URL}/employees/:id`, (schema, request) => {
    const employee = schema.find('employee', request.params.id);

    if (!employee) {
      return new Response(404);
    }

    return {
      employee,
    };
  });

  server.post(`${API_URL}/employees`, (schema: AppSchema, request) => {
    const attrs = JSON.parse(request.requestBody);

    Object.assign(attrs, { _id: ++employeeId });

    return schema.employees.create(attrs);
  });
}
