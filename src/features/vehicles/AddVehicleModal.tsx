import { Modal } from '@components/modal/Modal';
import { queryClient } from '@src/App';
import { VehicleForm } from './VehicleForm';
import { FormVehicle } from '@src/services/api/routes/vehicles';
import { useVehicleCreate } from '@src/services/api/hooks/vehicles';

export function AddVehicleModal({
  show,
  onClose,
  onSuccess,
}: {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { mutateAsync, isPending, isError } = useVehicleCreate();

  const handleAdd = async (vehicleForm: FormVehicle) => {
    await mutateAsync(vehicleForm);
    queryClient.refetchQueries({ queryKey: ['vehicles'] });
    onSuccess();
  };

  return (
    <Modal show={show} onClose={onClose} title="Dodaj Pojazd">
      <VehicleForm
        handleFormSubmit={handleAdd}
        onClose={onClose}
        isAddModal
        isPending={isPending}
        isSubmitError={isError}
      />
    </Modal>
  );
}
