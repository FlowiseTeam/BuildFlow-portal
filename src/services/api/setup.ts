import axios from 'axios';

export const API_URL =
  import.meta.env.MODE === 'production' ? 'http://localhost:3001/api' : 'http://localhost:3001/api';

export const PROJECTS_API_URL =
  import.meta.env.MODE === 'production' ? 'http://localhost:3000/api' : 'http://localhost:3000/api';

export const VEHICLES_API_URL = 'http://localhost:3002/api';

export const BDO_API_URL = 'http://localhost:3003/api';

export const axiosApi = axios.create({ baseURL: API_URL });

export const imagesApi = axios.create({ baseURL: 'http://localhost:3000' });

export const projectsAxiosApi = axios.create({ baseURL: PROJECTS_API_URL });

export const vehiclesAxiosApi = axios.create({ baseURL: VEHICLES_API_URL });

export const bdoAxiosApi = axios.create({ baseURL: BDO_API_URL });

const apis = [axiosApi, imagesApi, projectsAxiosApi, vehiclesAxiosApi];

apis.forEach((api) => {
  api.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
});
