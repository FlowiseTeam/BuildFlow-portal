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
  project: Project[];
  project_count: number;
}

export interface Project {
  client: string;
  created_at: string;
  end_date: string;
  name: string;
  start_date: string;
  status: 'in-progress' | 'closed';
  street: string;
  zipCode: string;
  city: string;
  workers: any[];
  updated_at: string;
  _id: number;
  tasks: number;
}
