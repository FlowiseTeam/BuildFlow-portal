import axios from 'axios';
import { FormProject, Project, ProjectQuery, ProjectsQuery } from './api-types';
const API_URL = import.meta.env.MODE === 'production' ? '' : 'http://localhost:3000/api';

const axiosApi = axios.create({ baseURL: API_URL });

export const getProjects = async (): Promise<ProjectsQuery> => (await axiosApi.get('/projects')).data;

export const getProject = async (projectId: string): Promise<ProjectQuery['projects']> =>
  (await axiosApi.get(`/projects/${projectId}`)).data.projects;

export const updateProject = async (project: Project) => (await axiosApi.put(`/projects/${project._id}`, project)).data;

export const createProject = async (project: FormProject) => await axiosApi.post('/projects', project);

export const deleteProject = async (projectId: number) => await axiosApi.delete(`/projects/${projectId}`);

export const getCompany = async () => (await axiosApi.get('/company')).data;
