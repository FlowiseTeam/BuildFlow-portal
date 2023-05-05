import axios from 'axios';

const API_URL = import.meta.env.MODE === 'production' ? '' : 'http://localhost:3000';

const axiosApi = axios.create({ baseURL: API_URL });

export const getProjects = async () => (await axiosApi.get('/projects')).data;

export const getCompany = async () => (await axiosApi.get('/company')).data;
