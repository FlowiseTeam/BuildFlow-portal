import { Modal } from '@components/modal/Modal';
import { ProjectForm } from '@features/projectForm/ProjectForm';
import { queryClient } from '@src/App';
import { FormProject, createProject } from '@src/services/api/index';
import { useMutation } from '@tanstack/react-query';

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
