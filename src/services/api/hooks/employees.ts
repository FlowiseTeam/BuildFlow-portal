import { useQuery, useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { Employee, deleteEmployee, getEmployee, getEmployees, updateEmployee } from '..';
import { queryClient } from '@src/App';

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
    onSuccess: (res) => {
      queryClient.setQueryData([EMPLOYEE, id], res);
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
