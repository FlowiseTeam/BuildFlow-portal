import { Modal } from '@components/modal/Modal';
import { useForm } from 'react-hook-form';

interface AddProjectInputs {
  name: string;
  street: string;
}

export function AddProject({ show, onClose }: { show: boolean; onClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProjectInputs>();

  const onSubmit = handleSubmit((data) => {});

  return (
    <Modal show={show} onClose={onClose} title="Dodaj projekt">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label htmlFor="name">Nazwa</label>
          <input
            className="border-2 rounded-lg p-1 pl-2"
            {...register('name', { required: true, minLength: 6 })}
            type="text"
            id="name"
          />
          <div className="h-6">{errors.name && <p>To pole jest wymagane</p>}</div>
        </div>
        <div>
          <label htmlFor="street">Ulica</label>
          <input {...register('street', { required: true, minLength: 6 })} type="text" id="street" />
        </div>
        <div className="flex justify-end gap-3">
          <button type="submit" className="px-3 py-1 bg-gray-200  rounded-full">
            Powrót
          </button>
          <button type="submit" className="px-3 py-1 bg-primary-light text-white  rounded-full">
            Dodaj
          </button>
        </div>
      </form>
    </Modal>
  );
}
