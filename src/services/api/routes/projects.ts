import { projectsAxiosApi } from '..';

export interface ProjectsQuery {
  projects: Project[];
  project_count: number;
}

export interface ProjectQuery {
  projects: Project;
}

export const projectStatuses = ['W trakcie', 'Zawieszony', 'Zakończony'] as const;

export type ProjectStatus = (typeof projectStatuses)[number];

export interface Project {
  client: string;
  created_at: string;
  end_date: string;
  name: string;
  start_date: string;
  status: ProjectStatus;
  street: string;
  zipcode: string;
  city: string;
  employees: number[];
  updated_at: string;
  _id: number;
  vehicles: number[];
}

export type FormProject = Omit<Project, 'created_at' | 'updated_at' | '_id'>;

export const getProjects = async (): Promise<ProjectsQuery> => (await projectsAxiosApi.get('/projects')).data;

export const getProject = (projectId: number): Promise<ProjectQuery['projects']> =>
  projectsAxiosApi.get(`/projects/${projectId}`).then((data) => data.data.project);

export const updateProject = async (project: Project) =>
  (await projectsAxiosApi.put(`/projects/${project._id}`, project)).data;

export const createProject = async (project: FormProject) => await projectsAxiosApi.post('/projects', project);

export const deleteProject = async (projectId: number) => await projectsAxiosApi.delete(`/projects/${projectId}`);

export const removeEmployeeFromProject = (employeeId: number, projectId: number) =>
  projectsAxiosApi.delete(`projects/employee_assignments`, {
    params: { employee_id: employeeId, project_id: projectId },
  });

export const removeVehicleFromProject = (vehicleId: number, projectId: number) =>
  projectsAxiosApi.delete(`projects/vehicle_assignments`, {
    params: { vehicle_id: vehicleId, project_id: projectId },
  });
