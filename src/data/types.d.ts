export interface Project {
  id: string;
  title: string;
  status: 'in-progress' | 'closed';
  startDate: string;
  endDate: string;
  tasks: number;
  address: string;
}
