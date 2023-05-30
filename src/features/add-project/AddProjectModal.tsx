import { Modal } from '@components/modal/Modal';
import { ProjectForm } from '@features/projectForm/ProjectForm';
import { createProject } from '@services/api';
import { FormProject } from '@services/api-types';
import { useMutation } from 'react-query';

export function AddProjectModal({ show, onClose }: { show: boolean; onClose: () => void; onSuccess: () => void }) {
  const { mutateAsync } = useMutation((project: FormProject) => createProject(project));

  const handleAdd = async (projectForm: FormProject) => {
    await mutateAsync(projectForm);
  };

  return (
    <Modal show={show} onClose={onClose} title="Dodaj projekt">
      <ProjectForm onSuccess={handleAdd} onClose={onClose} />
    </Modal>
  );
}
