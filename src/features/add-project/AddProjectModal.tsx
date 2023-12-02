import { Modal } from '@components/modal/Modal';
import { ProjectForm } from '@features/projectForm/ProjectForm';
import { queryClient } from '@src/App';
import { useProjectCreate } from '@src/services/api/hooks/projects';
import { FormProject } from '@src/services/api/index';

export function AddProjectModal({
  show,
  onClose,
  onSuccess,
}: {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { mutateAsync } = useProjectCreate();

  const handleAdd = async (projectForm: FormProject) => {
    await mutateAsync(projectForm);
    queryClient.refetchQueries({ queryKey: ['projects'] });
    onSuccess();
  };

  return (
    <Modal show={show} onClose={onClose} title="Dodaj projekt">
      <ProjectForm handleFormSubmit={handleAdd} onClose={onClose} />
    </Modal>
  );
}
