import { Modal } from '@components/modal/Modal';
import { useMutation } from 'react-query';
import { EmployeeForm, EmployeeFormInputs } from '../employeeForm/EmployeeForm';
import { createEmployee } from '@services/api';
import { PostEmployee } from '@src/services/api-types';

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
    await mutateAsync({ ...employeeFormInputs, qualifications: null, assigned_project: 'twusjtary' });
    onSuccess();
  };

  return (
    <Modal show={show} onClose={onClose} title="Dodaj pracownika">
      <EmployeeForm handleFormSubmit={handleAdd} onClose={onClose} />
    </Modal>
  );
}
