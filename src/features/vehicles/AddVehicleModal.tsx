import { Modal } from '@components/modal/Modal';
import { queryClient } from '@src/App';
import { useMutation } from '@tanstack/react-query';
import { VehicleForm } from './VehicleForm';
import { FormVehicle, createVehicle } from '@src/services/api/routes/vehicles';

export function AddVehicleModal({
  show,
  onClose,
  onSuccess,
}: {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { mutateAsync } = useMutation((vehicle: FormVehicle) => createVehicle(vehicle));

  const handleAdd = async (vehicleForm: FormVehicle) => {
    await mutateAsync(vehicleForm);
    queryClient.refetchQueries('vehicles');
    onSuccess();
  };

  return (
    <Modal show={show} onClose={onClose} title="Dodaj Pojazd">
      <VehicleForm handleFormSubmit={handleAdd} onClose={onClose} isAddModal />
    </Modal>
  );
}
