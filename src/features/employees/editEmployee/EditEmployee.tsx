import { EmployeeForm, EmployeeFormInputs } from '../employeeForm/EmployeeForm';
import { queryClient } from '@src/App';
import { Employee } from '@src/services/api/index';
import { useEmployeeMutation } from '@src/services/api/hooks/employees';

//TODO: refactor me
export function EditEmployee({ employee, isEdited }: { employee: Employee; isEdited: boolean }) {
  const { mutate } = useEmployeeMutation(employee._id);

  async function onUpdate(formData: EmployeeFormInputs) {
    const updatedEmployee = { ...employee, ...formData } as Employee;
    mutate(updatedEmployee);
    // try {
    //   mutate(updatedEmployee);
    //   queryClient.setQueryData(['employee', employee._id], updatedEmployee);
    // } catch (err) {
    //   console.error(err);
    // }
  }

  return <EmployeeForm employee={employee} handleFormSubmit={onUpdate} disabled={!isEdited} />;
}
