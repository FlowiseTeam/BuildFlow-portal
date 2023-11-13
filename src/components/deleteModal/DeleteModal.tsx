import { Button } from '../button/Button';
import { Modal } from '../modal/Modal';

export function DeleteModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  onSuccess,
  title,
}: {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => void;
  title: string;
}) {
  return (
    <Modal
      dialogClassName="max-w-xs"
      show={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
      title={title}
    >
      <div className="mt-8 flex flex-col gap-2">
        <Button onClick={() => setIsDeleteModalOpen(false)}>Anuluj</Button>
        <Button variant="danger" onClick={onSuccess}>
          Tak
        </Button>
      </div>
    </Modal>
  );
}
