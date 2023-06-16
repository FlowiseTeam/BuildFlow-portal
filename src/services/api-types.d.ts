interface CompanyInfo {
  name: string;
  projects: number;
  employees: number;
  notAssignedEmployees: number;
}

interface Company {
  company: CompanyInfo;
  projects: Project[];
}

export interface ProjectsQuery {
  projects: Project[];
  project_count: number;
}

export interface ProjectQuery {
  projects: Project;
}

export interface Project {
  client: string;
  created_at: string;
  end_date: string;
  name: string;
  start_date: string;
  status: 'in-progress' | 'closed';
  street: string;
  zipcode: string;
  city: string;
  employees: number[];
  updated_at: string;
  _id: number;
}

export type FormProject = Omit<Project, 'created_at' | 'updated_at' | '_id'>;

export interface Employee {
  _id: number;
  assigned_project: number[];
  created_at: string;
  first_name: string;
  last_name: string;
  qualifications: null | string[];
  updated_at: string;
  role: string;
  status: string;
}

export type PostEmployee = Omit<Employee, '_id' | 'created_at' | 'updated_at'>;

export interface EmployeesQuery {
  employees: Employee[];
  employees_count: number;
}

export interface Comment {
  created_at: string;
  images: { url: string }[];
  message: string;
  project_id: number;
  status: string;
  updated_at: string;
  _id: number;
}

export interface CommentsQuery {
  comments: Comment[];
  comments_count: number;
}
