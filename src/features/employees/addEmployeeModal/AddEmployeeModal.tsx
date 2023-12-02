import { Modal } from '@components/modal/Modal';
import { useMutation } from '@tanstack/react-query';
import { EmployeeForm, EmployeeFormInputs } from '../employeeForm/EmployeeForm';
import { PostEmployee, createEmployee } from '@src/services/api/index';

export function AddEmployeeModal({
  show,
  onClose,
  onSuccess,
}: {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { mutateAsync } = useMutation((employee: PostEmployee) => createEmployee(employee));

  const handleAdd = async (employeeFormInputs: EmployeeFormInputs) => {
    await mutateAsync({ ...employeeFormInputs, qualifications: [], assigned_project: [] });
    onSuccess();
  };

  return (
    <Modal show={show} onClose={onClose} title="Dodaj pracownika">
      <EmployeeForm handleFormSubmit={handleAdd} onClose={onClose} />
    </Modal>
  );
}
