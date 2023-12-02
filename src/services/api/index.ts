export { API_URL, PROJECTS_API_URL, axiosApi, imagesApi, projectsAxiosApi } from './setup';
export { createComment, getImage, getLatestComments, getProjectComments } from './routes/comments';
export type { Comment, CommentsQuery } from './routes/comments';
export { getCompany } from './routes/company';
export { createEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee } from './routes/employees';
export type { Employee, EmployeeProject, EmployeesQuery, PostEmployee } from './routes/employees';
export {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  projectStatuses,
  updateProject,
} from './routes/projects';
export type { FormProject, Project, ProjectQuery, ProjectStatus, ProjectsQuery } from './routes/projects';
//TODO: deprecated. Stop using index files
