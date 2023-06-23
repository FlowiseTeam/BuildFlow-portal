import { Modal } from '@components/modal/Modal';
import { ProjectForm } from '@features/projectForm/ProjectForm';
import { createProject } from '@services/api';
import { FormProject } from '@services/api-types';
import { queryClient } from '@src/main';
import { useMutation } from 'react-query';

export function AddProjectModal({
  show,
  onClose,
  onSuccess,
}: {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { mutateAsync } = useMutation((project: FormProject) => createProject(project));

  const handleAdd = async (projectForm: FormProject) => {
    await mutateAsync(projectForm);
    queryClient.refetchQueries('projects');
    onSuccess();
  };

  return (
    <Modal show={show} onClose={onClose} title="Dodaj projekt">
      <ProjectForm handleFormSubmit={handleAdd} onClose={onClose} />
    </Modal>
  );
}
