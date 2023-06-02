import { Button } from '@components/button/Button';
import { Modal } from '@components/modal/Modal';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { deleteEmployee } from '@services/api';
import { queryClient } from '@src/main';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

export function EmployeeHeader({ title, employeeId }: { title: string; employeeId: number }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync } = useMutation(['Employee', employeeId], () => deleteEmployee(employeeId), {
    onSuccess: () => {
      queryClient.resetQueries(['employees', employeeId]);
      navigate('/app/employees');
    },
  });

  return (
    <div className="flex items-center justify-between ">
      <Link to="/app/employees">
        <div className="flex items-center">
          <ChevronLeftIcon className=" h-10" />
          <h2 className="col font-roboto  whitespace-nowrap text-4xl">{title}</h2>
        </div>
      </Link>
      <div>
        <Button variant="primary" className="mr-4">
          Edytuj
        </Button>
        <Button onClick={() => setIsDeleteModalOpen(true)}>Usuń</Button>
        <Modal
          dialogClassName="max-w-xs"
          show={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Czy chcesz usunąć pracownika?"
        >
          <div className="flex flex-col gap-4">
            <Button>Anuluj</Button>
            <Button variant="danger" onClick={() => mutateAsync()}>
              Tak
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
