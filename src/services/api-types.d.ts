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

export interface Project {
  client: string;
  created_at: string;
  end_date: string;
  id: { $oid: string };
  name: string;
  start_date: string;
  status: 'in-progress' | 'closed';
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
  updated_at: string;
  _id: { $oid: string };
}
