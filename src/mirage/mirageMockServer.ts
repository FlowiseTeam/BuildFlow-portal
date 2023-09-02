import { Model, Registry, belongsTo, createServer, hasMany } from 'miragejs';
import Schema from 'miragejs/orm/schema';
import { ModelDefinition } from 'miragejs/-types';
import { commentFactory } from './factories/comment';
import { employeeFactory } from './factories/employee';
import { Project, Employee } from '@src/services/api/index';
import { projectRoutes } from './routes/projects';
import { employeesRoutes } from './routes/employees';

const ProjectModel: ModelDefinition<Project> = Model.extend({ comments: hasMany() });
const CommentModel: ModelDefinition<Comment> = Model.extend({ project: belongsTo() });
const EmployeeModel: ModelDefinition<Employee> = Model.extend({});

// TODO: check for valid type
type AppRegistry = Registry<
  { project: typeof ProjectModel; comment: typeof CommentModel; employee: typeof EmployeeModel },
  {}
>;

export type AppSchema = Schema<AppRegistry>;

//urls must be passed manually because the lib is poorly wirtten
export function mockMirageServer(PROJECTS_API_URL: string, API_URL: string) {
  createServer({
    models: {
      project: ProjectModel,
      comment: CommentModel,
      employee: EmployeeModel,
    },

    factories: {
      comment: commentFactory(),
      employee: employeeFactory(),
    },

    seeds(server) {
      const centrumProject = server.create('project', {
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

      server.create('employee');

      server.createList('comment', 5, { project: centrumProject });
    },

    routes() {
      projectRoutes(this, PROJECTS_API_URL);
      employeesRoutes(this, API_URL);
    },
  });
}
