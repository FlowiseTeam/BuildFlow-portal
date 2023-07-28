import { Server, Response } from 'miragejs';
import { AppSchema } from '../mirageMockServer';

export function setRoutesGetMethod<T extends Server>(server: T, PROJECTS_API_URL: string, API_URL: string) {
  server.get(`${PROJECTS_API_URL}/projects`, (schema: AppSchema) => {
    const projects = schema.all('project').models;

    return { projects, project_count: projects.length };
  });

  server.get(`${PROJECTS_API_URL}/projects/:id`, (schema: AppSchema, request) => {
    return { projects: schema.find('project', request.params.id) };
  });

  server.get(`${PROJECTS_API_URL}/projects/:id/comments`, (schema: AppSchema, request) => {
    const projectId = request.params.id;
    const project = schema.projects.find(projectId);
    const comments = project.comments.models as Comment[];

    return {
      comments,
      comment_count: comments.length,
    };
  });

  server.get(`${PROJECTS_API_URL}/projects/comments/latest`, (schema) => {
    // TODO: use schema
    return {
      comments: [{}],
      comment_count: 0,
    };
  });

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
}
