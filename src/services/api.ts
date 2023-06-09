import axios from 'axios';
import { Employee, EmployeesQuery, FormProject, Project, ProjectQuery, ProjectsQuery } from './api-types';
import { EmployeeFormInputs } from '@features/employees/employeeForm/EmployeeForm';
const API_URL = import.meta.env.MODE === 'production' ? '' : 'http://localhost:3001/api';

const PROJECTS_API_URL = import.meta.env.MODE === 'production' ? '' : 'http://localhost:3000/api';

const axiosApi = axios.create({ baseURL: API_URL });

const projectsAxiosApi = axios.create({ baseURL: PROJECTS_API_URL });

export const getProjects = async (): Promise<ProjectsQuery> => (await projectsAxiosApi.get('/projects')).data;

export const getProject = async (projectId: number): Promise<ProjectQuery['projects']> =>
  (await projectsAxiosApi.get(`/projects/${projectId}`)).data.projects;

export const updateProject = async (project: Project) =>
  (await projectsAxiosApi.put(`/projects/${project._id}`, project)).data;

export const createProject = async (project: FormProject) => await projectsAxiosApi.post('/projects', project);

export const deleteProject = async (projectId: number) => await projectsAxiosApi.delete(`/projects/${projectId}`);

export const getCompany = async () => (await projectsAxiosApi.get('/company')).data;

export const getEmployees = async (): Promise<EmployeesQuery> => (await axiosApi.get('/employees')).data;

export const getEmployee = async (employeeId: number): Promise<Employee> =>
  (await axiosApi.get(`/employees/${employeeId}`)).data.employee;

export const updateEmployee = async (employee: any) =>
  (await axiosApi.put(`/employees/${employee._id}`, employee)).data;

export const createEmployee = async (employee: EmployeeFormInputs) => await axiosApi.post('/employees', employee);

export const deleteEmployee = async (employeeId: number) => await axiosApi.delete(`employees/${employeeId}`);
