import axios from 'axios';
import { Project } from './api-types';
// Ruby on Rails local endpoint http://127.0.0.1:3000/api
const API_URL = import.meta.env.MODE === 'production' ? '' : 'http://localhost:3000';

const axiosApi = axios.create({ baseURL: API_URL });

export const getProjects = async () => (await axiosApi.get('/projects')).data;

export const createProject = async (project: Project) => (await axiosApi.post('/projects', project)).data;

export const getCompany = async () => (await axiosApi.get('/company')).data;
