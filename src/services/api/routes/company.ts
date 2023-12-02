import { projectsAxiosApi } from '..';

export const getCompany = async () => (await projectsAxiosApi.get('/company')).data;
