import { queryClient } from '@src/App';
import { getVehicle, updateVehicle, deleteVehicle } from '@src/services/api/routes/vehicles';
import { useQuery, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export function useVehicleQuery(id: number) {
  const navigate = useNavigate();

  const { data: vehicle } = useQuery(['vehicle', id], () => getVehicle(id), {
    suspense: true,
  });

  if (!vehicle) {
    throw new Error('Something went wrong');
  }

  const { mutateAsync: onUpdate } = useMutation(
    ['vehicle', id],
    (formData: any) => {
      const updatedVehicle = { ...vehicle, ...formData };
      return updateVehicle(updatedVehicle);
    },
    {
      onSuccess: (_, vehicle) => {
        queryClient.setQueryData(['vehicle', id], vehicle);
      },
    },
  );

  const { mutateAsync: onDelete } = useMutation(['vehicle', id], () => deleteVehicle(Number(id)), {
    onSuccess: () => {
      queryClient.resetQueries(['vehicle', id]);
      navigate('/app/vehicles');
    },
  });

  return { vehicle, onUpdate, onDelete };
}
