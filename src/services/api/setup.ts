import axios from 'axios';

export const PROJECTS_API_URL = import.meta.env.VITE_PROJECTS_URL;
export const API_URL = import.meta.env.VITE_EMPLOYEES_URL;
export const VEHICLES_API_URL = import.meta.env.VITE_VEHICLES_URL;
export const BDO_API_URL = import.meta.env.VITE_BDO_URL;

export const axiosApi = axios.create({ baseURL: API_URL });

// export const imagesApi = axios.create({ baseURL: import.meta.env.VITE_PROJECTS_URL });

export const projectsAxiosApi = axios.create({ baseURL: PROJECTS_API_URL });

export const vehiclesAxiosApi = axios.create({ baseURL: VEHICLES_API_URL });

export const bdoAxiosApi = axios.create({ baseURL: BDO_API_URL });

const apis = [axiosApi, projectsAxiosApi, vehiclesAxiosApi, bdoAxiosApi];

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
