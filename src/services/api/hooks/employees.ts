import { useQuery, useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { Employee, createEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee } from '..';
import { queryClient } from '@src/App';
import { EmployeeFormInputs } from '@src/features/employees/employeeForm/EmployeeForm';

const EMPLOYEES = 'employees';
const EMPLOYEE = 'employee';

export function useEmployeesQuery() {
  return useQuery({
    queryKey: [EMPLOYEES],
    queryFn: async () => {
      const data = await getEmployees();

      data.employees.forEach((employee) => {
        queryClient.setQueryData([EMPLOYEE, employee._id], employee);
      });

      return data;
    },
  });
}

export function useSuspenseEmployeesQuery() {
  return useSuspenseQuery({
    queryKey: [EMPLOYEES],
    queryFn: async () => {
      const data = await getEmployees();

      data.employees.forEach((employee) => {
        queryClient.setQueryData([EMPLOYEE, employee._id], employee);
      });

      return data;
    },
  });
}

export function useEmployeeQuery(id: number) {
  return useQuery({
    queryKey: [EMPLOYEES],
    queryFn: () => getEmployee(id),
  });
}

export function useCreateEmployee() {
  return useMutation({
    mutationFn: (employee: EmployeeFormInputs) => createEmployee(employee),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [EMPLOYEES] });
    },
  });
}

export function useSuspenseEmployeeQuery(id: number) {
  return useSuspenseQuery({
    queryKey: [EMPLOYEE, id],
    queryFn: () => getEmployee(id),
  });
}

export function useEmployeeMutation(id: number) {
  return useMutation({
    mutationKey: [EMPLOYEE, id],
    mutationFn: (employee: Employee) => updateEmployee(employee),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [EMPLOYEE, id] });
    },
  });
}

export function useEmployeeDeleteMutation(id: number) {
  return useMutation({
    mutationKey: [EMPLOYEE, id],
    mutationFn: () => deleteEmployee(id),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: [EMPLOYEE, id] });
    },
  });
}
