import { updateEmployee } from '@services/api';
import { Employee } from '@services/api-types';
import { useMutation } from 'react-query';
import { EmployeeForm, EmployeeFormInputs } from '../employeeForm/EmployeeForm';

export function EditEmployee({ employee }: { employee: Employee }) {
  const { mutateAsync } = useMutation(['employee', employee._id], (Employee: Employee) => updateEmployee(Employee));

  async function onUpdate(formData: EmployeeFormInputs) {
    const updatedEmployee = { ...employee, ...formData } as Employee;
    try {
      await mutateAsync(updatedEmployee);
    } catch (err) {
      console.error(err);
    }
  }

  return <EmployeeForm employee={employee} onSuccess={onUpdate} />;
}
