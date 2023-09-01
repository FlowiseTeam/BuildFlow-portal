import { Modal } from '@components/modal/Modal';
import { Button } from '@src/components/button/Button';
import { StatusInput } from '@src/components/statusInput/StatusInput';
import { Project, projectStatuses, updateProject, ProjectStatus } from '@src/services/api/index';
import { useEffect, useState } from 'react';

export function EditProjectModal({
  activeProject,
  onClose,
  refetch,
}: {
  activeProject?: Project | null;
  onClose: () => void;
  refetch: () => void;
}) {
  const [status, setStatus] = useState(activeProject?.status || projectStatuses[0]);

  const handleSubmit = async () => {
    const project = { ...activeProject, status } as Project;
    await updateProject(project);
    refetch();
    onClose();
  };

  useEffect(() => {
    setStatus(activeProject?.status || projectStatuses[0]);
  }, [activeProject]);

  return (
    <Modal title="Edytuj projekt" maxW="max-w-[30rem]" show={!!activeProject} onClose={onClose}>
      <div className="mx-auto max-w-[16rem]">
        <StatusInput
          id="status"
          onChange={(status: ProjectStatus) => setStatus(status)}
          values={projectStatuses}
          defaultValue={status}
        />
      </div>
      <div className="mt-8 w-full text-right">
        <Button onClick={onClose} className="mr-6">
          Anuluj
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Aktualizuj
        </Button>
      </div>
    </Modal>
  );
}
