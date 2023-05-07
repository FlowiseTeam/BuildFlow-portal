import { Button } from '@components/button/Button';
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
        <div className="grid auto-rows-fr grid-cols-3 gap-x-2">
          <div className="col-start-1 col-end-4 flex flex-col">
            <label className="text-gray-600" htmlFor="name">
              Nazwa
            </label>
            <input
              className="rounded-lg border-2 p-1 pl-2"
              {...register('name', { required: true, minLength: 6 })}
              type="text"
              id="name"
            />
            <div className="h-6">{errors.name && <p>To pole jest wymagane</p>}</div>
          </div>
          <div>
            <label className="text-gray-600" htmlFor="street">
              Ulica
            </label>
            <input
              {...register('street', { required: true, minLength: 6 })}
              type="text"
              id="street"
              className="w-full rounded-lg border-2 p-1 pl-2"
            />
          </div>
          <div>
            <label className="text-gray-600" htmlFor="street">
              Ulica
            </label>
            <input
              {...register('street', { required: true, minLength: 6 })}
              type="text"
              id="street"
              className="w-full rounded-lg border-2 p-1 pl-2"
            />
          </div>
          <div>
            <label className="text-gray-600" htmlFor="street">
              Ulica
            </label>
            <input
              {...register('street', { required: true, minLength: 6 })}
              type="text"
              id="street"
              className="w-full rounded-lg border-2 p-1 pl-2"
            />
          </div>
          <div>
            <label className="text-gray-600" htmlFor="street">
              Ulica
            </label>
            <input
              {...register('street', { required: true, minLength: 6 })}
              type="text"
              id="street"
              className="w-full rounded-lg border-2 p-1 pl-2"
            />
          </div>
          <div>
            <label className="text-gray-600" htmlFor="street">
              Ulica
            </label>
            <input
              {...register('street', { required: true, minLength: 6 })}
              type="text"
              id="street"
              className="w-full rounded-lg border-2 p-1 pl-2"
            />
          </div>
          <div>
            <label className="text-gray-600" htmlFor="street">
              Ulica
            </label>
            <input
              {...register('street', { required: true, minLength: 6 })}
              type="text"
              id="street"
              className="w-full rounded-lg border-2 p-1 pl-2"
            />
          </div>
          <div>
            <label className="text-gray-600" htmlFor="street">
              Ulica
            </label>
            <input
              {...register('street', { required: true, minLength: 6 })}
              type="text"
              id="street"
              className="w-full rounded-lg border-2 p-1 pl-2"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button type="submit">Powrót</Button>
          <Button type="submit" variant="primary">
            Dodaj
          </Button>
        </div>
      </form>
    </Modal>
  );
}
