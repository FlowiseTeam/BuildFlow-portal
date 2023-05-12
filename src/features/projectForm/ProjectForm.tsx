import { Button } from '@components/button/Button';
import { Modal } from '@components/modal/Modal';
import { createProject } from '@services/api';
import { Project } from '@services/api-types';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

interface AddProjectInputs {
  name: string;
  street: string;
  city: string;
  zipcode: string;
  start_date: string;
  end_date: string;
  status: string;
  client: string;
}

export function AddProjectModal({
  show,
  onClose,
  onSuccess,
}: {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { mutateAsync } = useMutation(createProject);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProjectInputs>();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const projectObj: Project = {
      name: data.name,
      street: data.street,
      city: data.city,
      zipCode: data.zipcode,
      start_date: data.start_date,
      end_date: data.end_date,
      status: data.status as any,
      client: data.client,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tasks: 0,
    };
    await projectObj;
    onSuccess();

    console.log(projectObj);
  });

  return (
    <Modal show={show} onClose={onClose} title="Dodaj projekt">
      <form onSubmit={handleSubmit(onSubmit)}>
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
              Ulica i numer
            </label>
            <input
              {...register('street', { required: true, minLength: 6 })}
              type="text"
              id="street"
              className="w-full rounded-lg border-2 p-1 pl-2"
            />
          </div>
          <div>
            <label className="text-gray-600" htmlFor="city">
              Miejscowość
            </label>
            <input
              {...register('city', { required: true, minLength: 6 })}
              type="text"
              id="city"
              className="w-full rounded-lg border-2 p-1 pl-2"
            />
          </div>
          <div>
            <label className="text-gray-600" htmlFor="zipcode">
              Kod pocztowy
            </label>
            <input
              {...register('zipcode', { required: true, minLength: 6 })}
              type="text"
              id="zipcode"
              className="w-full rounded-lg border-2 p-1 pl-2"
            />
          </div>
          <div>
            <label className="text-gray-600" htmlFor="start_date">
              Data rozpoczęcia
            </label>
            <input
              {...register('start_date', { required: true, minLength: 6 })}
              type="text"
              id="start_date"
              className="w-full rounded-lg border-2 p-1 pl-2"
            />
          </div>
          <div>
            <label className="text-gray-600" htmlFor="end_date">
              Data zakończenia
            </label>
            <input
              {...register('end_date', { required: true, minLength: 6 })}
              type="text"
              id="end_date"
              className="w-full rounded-lg border-2 p-1 pl-2"
            />
          </div>
          <div>
            <label className="text-gray-600" htmlFor="status">
              Status
            </label>
            <input
              {...register('status', { required: true, minLength: 6 })}
              type="text"
              id="status"
              className="w-full rounded-lg border-2 p-1 pl-2"
            />
          </div>
          <div>
            <label className="text-gray-600" htmlFor="client">
              Klient
            </label>
            <input
              {...register('client', { required: true, minLength: 6 })}
              type="text"
              id="client"
              className="w-full rounded-lg border-2 p-1 pl-2"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button onClick={onClose}>Powrót</Button>
          <Button type="submit" variant="primary">
            Dodaj
          </Button>
        </div>
      </form>
    </Modal>
  );
}
