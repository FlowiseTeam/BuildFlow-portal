import { Modal } from '@components/modal/Modal';
import { Project, projectStatuses } from '@services/api-types';
import { Button } from '@src/components/button/Button';
import { StatusInput } from '@src/components/statusInput/StatusInput';

export function EditProjectModal({ activeProject, onClose }: { activeProject?: Project; onClose: () => void }) {
  return (
    <Modal title="Edytuj projekt" maxW="max-w-[30rem]" show={!!activeProject} onClose={onClose}>
      <div className="mx-auto max-w-[16rem]">
        <StatusInput
          id="status"
          onChange={() => {}}
          values={projectStatuses}
          defaultValue={activeProject?.status || projectStatuses[0]}
        />
      </div>
      <div className="mt-8 w-full text-right">
        <Button onClick={onClose} className="mr-6">
          Anuluj
        </Button>
        <Button variant="primary">Aktualizuj</Button>
      </div>
    </Modal>
  );
}
