import { useMutation } from 'react-query';
import { EmployeeForm, EmployeeFormInputs } from '../employeeForm/EmployeeForm';
import { queryClient } from '@src/App';
import { Employee, updateEmployee } from '@src/services/api/index';

export function EditEmployee({ employee, isEdited }: { employee: Employee; isEdited: boolean }) {
  const { mutateAsync } = useMutation(['employee', employee._id], (Employee: Employee) => updateEmployee(Employee));

  async function onUpdate(formData: EmployeeFormInputs) {
    const updatedEmployee = { ...employee, ...formData } as Employee;
    try {
      queryClient.setQueryData(['employee', employee._id], updatedEmployee);
      await mutateAsync(updatedEmployee);
    } catch (err) {
      console.error(err);
    }
  }

  return <EmployeeForm employee={employee} handleFormSubmit={onUpdate} disabled={!isEdited} />;
}
