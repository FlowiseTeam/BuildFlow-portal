import { EmployeeFormInputs } from '@src/features/employees/employeeForm/EmployeeForm';
import { axiosApi } from '..';

export interface EmployeeProject {
  _id: number;
  created_at: string;
  employee_id: number;
  project_id: number;
  project_name: string;
  updated_at: string;
}

export interface Employee {
  _id: number;
  assigned_project: EmployeeProject[];
  created_at: string;
  first_name: string;
  last_name: string;
  qualifications: string[];
  updated_at: string;
  role: string;
  status: string;
}

export type PostEmployee = Omit<Employee, '_id' | 'created_at' | 'updated_at'>;

export interface EmployeesQuery {
  employees: Employee[];
  employees_count: number;
}

export const getEmployees = async (): Promise<EmployeesQuery> => (await axiosApi.get('/employees')).data;

export const getEmployee = async (employeeId: number): Promise<Employee> =>
  (await axiosApi.get(`/employees/${employeeId}`)).data.employee;

export const updateEmployee = async (employee: any) =>
  (await axiosApi.put(`/employees/${employee._id}`, employee)).data;

export const createEmployee = async (employee: EmployeeFormInputs) => await axiosApi.post('/employees', employee);

export const deleteEmployee = async (employeeId: number) => await axiosApi.delete(`employees/${employeeId}`);
