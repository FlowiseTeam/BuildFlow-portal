import { queryClient } from '@src/App';
import { useNotifications } from '@src/layouts/notifications/NotificationProvider';
import { getEmployee, deleteEmployee } from '@src/services/api';
import { useQuery, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export function useEmployeeQuery(id: number) {
  const navigate = useNavigate();
  const { notify } = useNotifications();
  const { data: employee, isError } = useQuery(['employee', id], () => getEmployee(id), {
    suspense: true,
    onError() {
      notify('Podany pracownik nie istnieje.', 'error');
    },
  });

  const { mutateAsync: onDelete } = useMutation(['employee', id], () => deleteEmployee(Number(id)), {
    onSuccess: () => {
      queryClient.resetQueries(['employees', id]);
      navigate('/app/employees');
    },
  });

  if (!employee) {
    throw new Error('Something went wrong');
  }

  return { employee, onDelete, isError };
}
