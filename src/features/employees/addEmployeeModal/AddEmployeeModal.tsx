import { Modal } from '@components/modal/Modal';
import { EmployeeForm, EmployeeFormInputs } from '../employeeForm/EmployeeForm';
import { useCreateEmployee } from '@src/services/api/hooks/employees';

export function AddEmployeeModal({
  show,
  onClose,
  onSuccess,
}: {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { mutateAsync, isPending } = useCreateEmployee();

  const handleAdd = async (employeeFormInputs: EmployeeFormInputs) => {
    await mutateAsync({ ...employeeFormInputs, qualifications: [], assigned_project: [] });
    onSuccess();
  };

  return (
    <Modal show={show} onClose={onClose} title="Dodaj pracownika">
      <EmployeeForm handleFormSubmit={handleAdd} onClose={onClose} isLoading={isPending} />
    </Modal>
  );
}
