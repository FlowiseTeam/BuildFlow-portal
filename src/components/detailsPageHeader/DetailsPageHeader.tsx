import { Button } from '@components/button/Button';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { DeleteModal } from '@src/components/deleteModal/DeleteModal';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function DetailsPageHeader({
  title,
  onDelete,
  deleteModalTitle,
  backLink,
  toggleEdit,
}: {
  title: string;
  onDelete: () => void;
  backLink: string;
  deleteModalTitle: string;
  toggleEdit: () => void;
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="flex items-center justify-between ">
      <Link to={backLink}>
        <div className="flex items-center">
          <ChevronLeftIcon className=" h-10" />
          <h2 className="col font-roboto text-4xl">{title}</h2>
        </div>
      </Link>
      <div>
        <Button onClick={toggleEdit} variant="primary" className="mr-4">
          Edytuj
        </Button>
        <Button onClick={() => setIsDeleteModalOpen(true)}>Usuń</Button>
        <DeleteModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          title={deleteModalTitle}
          onSuccess={onDelete}
        />
      </div>
    </div>
  );
}
