import { useQuery, useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { Employee, deleteEmployee, getEmployee, getEmployees, updateEmployee } from '..';
import { queryClient } from '@src/App';

export function useEmployeesQuery() {
  return useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const data = await getEmployees();

      data.employees.forEach((employee) => {
        queryClient.setQueryData(['employee', employee._id], employee);
      });

      return data;
    },
  });
}

export function useSuspenseEmployeesQuery() {
  return useSuspenseQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const data = await getEmployees();

      data.employees.forEach((employee) => {
        queryClient.setQueryData(['employee', employee._id], employee);
      });

      return data;
    },
  });
}

export function useEmployeeQuery(id: number) {
  return useQuery({
    queryKey: ['employees'],
    queryFn: () => getEmployee(id),
  });
}

export function useSuspenseEmployeeQuery(id: number) {
  return useSuspenseQuery({
    queryKey: ['employee', id],
    queryFn: () => getEmployee(id),
  });
}

export function useEmployeeMutation(id: number) {
  return useMutation({ mutationKey: ['employee', id], mutationFn: (employee: Employee) => updateEmployee(employee) });
}

export function useEmployeeDeleteMutation(id: number) {
  return useMutation({
    mutationKey: ['employee', id],
    mutationFn: () => deleteEmployee(id),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ['employee', id] });
    },
  });
}
