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
  workers: any[];
  updated_at: string;
  _id: number;
}

export type FormProject = Omit<Project, 'created_at' | 'updated_at' | '_id'>;

export interface Employee {
  _id: number;
  assigned_project: string;
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
  employee_count: number;
}
