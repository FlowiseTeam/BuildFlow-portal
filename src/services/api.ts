import axios from 'axios';
import { Project, ProjectsQuery } from './api-types';
const API_URL = import.meta.env.MODE === 'production' ? '' : 'http://localhost:3000/api';

const axiosApi = axios.create({ baseURL: API_URL });

export const getProjects = async (): Promise<ProjectsQuery> => (await axiosApi.get('/projects')).data;

export const createProject = async (project: Project) => (await axiosApi.post('/projects', project)).data;

export const getCompany = async () => (await axiosApi.get('/company')).data;
