import { Model, Registry, belongsTo, createServer, hasMany, Server } from 'miragejs';
import Schema from 'miragejs/orm/schema';
import { ModelDefinition } from 'miragejs/-types';
import { commentFactory } from './factories/comment';
import { employeeFactory } from './factories/employee';
import { Project, Employee } from '@src/services/api/index';
import { projectRoutes } from './routes/projects';
import { employeesRoutes } from './routes/employees';
import { Vehicle } from '@src/services/api/routes/vehicles';
import { vehiclesRoutes } from './routes/vehicles';
import { getVehicleSeeds } from './seeds/vehicles';
import { getProjectSeeds } from './seeds/projects';

const ProjectModel: ModelDefinition<Project> = Model.extend({ comments: hasMany() });
const CommentModel: ModelDefinition<Comment> = Model.extend({ project: belongsTo() });
const EmployeeModel: ModelDefinition<Employee> = Model.extend({});
const VehicleModel: ModelDefinition<Vehicle> = Model.extend({});

type AppRegistry = Registry<
  {
    project: typeof ProjectModel;
    comment: typeof CommentModel;
    employee: typeof EmployeeModel;
    vehicle: typeof VehicleModel;
  },
  {}
>;

export type AppSchema = Schema<AppRegistry>;

export type ServerType = Server<AppRegistry>;

//urls must be passed manually because the lib is poorly wirtten
export function mockMirageServer(PROJECTS_API_URL: string, API_URL: string, VEHICLES_API_URL: string) {
  createServer({
    models: {
      project: ProjectModel,
      comment: CommentModel,
      employee: EmployeeModel,
      vehicle: VehicleModel,
    },

    factories: {
      comment: commentFactory(),
      employee: employeeFactory(),
    },

    seeds(server) {
      const { projectOne } = getProjectSeeds(server);
      getVehicleSeeds(server);

      server.create('employee');

      server.createList('comment', 5, { project: projectOne });
    },

    routes() {
      projectRoutes(this, PROJECTS_API_URL);
      employeesRoutes(this, API_URL);
      vehiclesRoutes(this, VEHICLES_API_URL);
    },
  });
}
