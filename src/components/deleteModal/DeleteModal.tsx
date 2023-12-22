import { useState } from 'react';
import { Button } from '../button/Button';
import { Modal } from '../modal/Modal';
import { LoadingIcon } from '../loadings/Loading';

export function DeleteModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  onSuccess,
  title,
}: {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => Promise<void>;
  title: string;
}) {
  const [processing, setProcessing] = useState(false);

  const handleClick = async () => {
    setProcessing(true);
    await onSuccess();
    setProcessing(false);
  };

  return (
    <Modal
      dialogClassName="max-w-xs"
      show={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
      title={title}
    >
      <div className="mt-8 flex flex-col gap-2">
        <Button onClick={() => setIsDeleteModalOpen(false)}>Anuluj</Button>
        <Button variant="danger" onClick={handleClick} className="relative flex items-center justify-center">
          {processing && <LoadingIcon className="absolute -ml-10 -mt-3 h-6" />}
          Tak
        </Button>
      </div>
    </Modal>
  );
}
