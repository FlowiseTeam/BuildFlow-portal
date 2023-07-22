import { Server } from 'miragejs';
import { AppSchema } from '../mirageMockServer';

let projectId = 1;
let employeeId = 1;
let commentId = 5;

export function setRoutesPostMethod<T extends Server>(server: T, PROJECTS_API_URL: string, API_URL: string) {
  server.post(`${PROJECTS_API_URL}/projects`, (schema: AppSchema, request) => {
    const attrs = JSON.parse(request.requestBody);

    Object.assign(attrs, { _id: ++projectId });

    return schema.projects.create(attrs);
  });

  server.post(`${PROJECTS_API_URL}/projects/:id/comments`, (schema: AppSchema, request) => {
    const projectId = request.params.id;
    const formData = request.requestBody as unknown as FormData;
    const comment = Object.fromEntries(formData.entries()) as unknown as Comment;

    Object.assign(comment, {
      _id: ++commentId,
      projectId: projectId,
      project_id: projectId,
      created_at: '2137-09-06T16:16:55.909',
      updated_at: '2137-09-06T16:16:55.909',
      images: [],
    });

    return schema.comments.create(comment);
  });

  server.post(`${API_URL}/employees`, (schema: AppSchema, request) => {
    const attrs = JSON.parse(request.requestBody);

    Object.assign(attrs, { _id: ++employeeId });

    return schema.employees.create(attrs);
  });
}
