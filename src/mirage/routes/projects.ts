import { Server, Response } from 'miragejs';
import { AppSchema } from '../mirageMockServer';

// TODO: refactor this; it shouldn't be needed.
let projectId = 1;
let commentId = 5;

export function projectRoutes<T extends Server>(server: T, PROJECTS_API_URL: string) {
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
}
