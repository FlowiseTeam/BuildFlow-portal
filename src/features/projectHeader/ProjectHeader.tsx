import { Button } from '@components/button/Button';
import { Modal } from '@components/modal/Modal';
import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteProject } from '@services/api';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../../main';

export function ProjectHeader({ title, projectId }: { title: string; projectId: number }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync } = useMutation(['project', projectId], () => deleteProject(projectId), {
    onSuccess: () => {
      queryClient.resetQueries(['project', projectId]);
      navigate('/app/projects');
    },
  });

  return (
    <div className="flex items-center justify-between ">
      <h2 className="col font-roboto text-4xl">{title}</h2>
      <div>
        <TrashIcon onClick={() => setIsDeleteModalOpen(true)} className="h-6 hover:cursor-pointer hover:text-red-700" />
        <Modal
          dialogClassName="max-w-xs"
          show={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Czy chcesz usunąć projekt?"
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
