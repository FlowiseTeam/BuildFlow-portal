import { ServerType } from '../mirageMockServer';
import { Response } from 'miragejs';

// TODO: refactor this; it shouldn't be needed.
let projectId = 1;
let commentId = 5;

export function projectRoutes(server: ServerType, PROJECTS_API_URL: string) {
  function url(path: string) {
    return `${PROJECTS_API_URL}/${path}`;
  }

  server.get(`${PROJECTS_API_URL}/projects`, (schema) => {
    const projects = schema.all('project').models;

    return { projects, project_count: projects.length };
  });

  server.get(`${PROJECTS_API_URL}/projects/:id`, (schema, request) => {
    return { projects: schema.find('project', request.params.id) };
  });

  server.get(`${PROJECTS_API_URL}/projects/:id/comments`, (schema, { params }) => {
    const projectId = params.id;

    const project = schema.find('project', projectId);
    const comments = project.comments.models as Comment[];

    return {
      comments,
      comment_count: comments.length,
    };
  });

  server.get(`${PROJECTS_API_URL}/projects/comments/latest`, (schema) => {
    // TODO: use schema
    return [];
  });

  server.post(url('projects'), (schema, { requestBody }) => {
    const project = Object.assign(JSON.parse(requestBody), { _id: ++projectId });
    schema.create('project', project);

    return new Response(200);
  });

  server.put(url('projects/:id'), (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    schema.find('project', attrs._id);

    return new Response(200); //TODO: check if backend sends actually real data
  });

  server.post(url('projects/:id/comments'), (schema, request) => {
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
}
