import { Modal } from '@components/modal/Modal';
import { Project } from '@services/api-types';

export function EditProjectModal({
  activeProject,
  setActiveProjectId,
}: {
  activeProject?: Project;
  setActiveProjectId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  return (
    <Modal title={activeProject?.name} show={!!activeProject} onClose={() => setActiveProjectId(null)}>
      <div></div>
    </Modal>
  );
}
