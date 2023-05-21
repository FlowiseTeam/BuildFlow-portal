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
