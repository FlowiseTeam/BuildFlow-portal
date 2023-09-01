import axios from 'axios';

export const API_URL =
  import.meta.env.MODE === 'production' ? 'http://localhost:3001/api' : 'http://localhost:3001/api';

export const PROJECTS_API_URL =
  import.meta.env.MODE === 'production' ? 'http://localhost:3000/api' : 'http://localhost:3000/api';

export const axiosApi = axios.create({ baseURL: API_URL });

export const imagesApi = axios.create({ baseURL: 'http://localhost:3000' });

export const projectsAxiosApi = axios.create({ baseURL: PROJECTS_API_URL });
