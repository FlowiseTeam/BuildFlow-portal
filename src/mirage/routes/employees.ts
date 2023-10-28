import { Response } from 'miragejs';
import { ServerType } from '../mirageMockServer';

let employeeId = 1;

export function employeesRoutes(server: ServerType, API_URL: string) {
  function url(path: string) {
    return `${API_URL}/${path}`;
  }

  server.get(url('employees'), (schema) => {
    const employees = schema.all('employee').models;

    return {
      employees,
      employees_count: employees.length,
    };
  });

  server.get(url('employees/:id'), (schema, request) => {
    const employee = schema.find('employee', request.params.id);

    if (!employee) {
      return new Response(404);
    }

    return {
      employee,
    };
  });

  server.post(url('employees'), (schema, request) => {
    const attrs = JSON.parse(request.requestBody);

    Object.assign(attrs, { _id: ++employeeId });

    // return schema.employees.create(attrs);
    const xd = schema.create('employee', attrs);
    return { employee: xd };
  });
}
