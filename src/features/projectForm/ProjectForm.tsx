import { Button } from '@components/button/Button';
import { Listbox } from '@headlessui/react';
import { FormProject, Project } from '@services/api-types';
import { Controller, useForm } from 'react-hook-form';

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

const statuses = ['W trakcie', 'Zakończony'];

export function ProjectForm({
  onClose,
  onSuccess,
  project,
}: {
  onClose?: () => void;
  onSuccess: (data: FormProject) => Promise<void>;
  project?: Project;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AddProjectInputs>();

  const onSubmit = handleSubmit(async (data) => {
    const project: FormProject = {
      name: data.name,
      street: data.street,
      city: data.city,
      zipcode: data.zipcode,
      start_date: data.start_date,
      end_date: data.end_date,
      status: data.status as any,
      client: data.client,
      workers: [],
    };
    await onSuccess(project);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="grid auto-rows-fr gap-x-2 md:grid-cols-3">
        <div className="flex flex-col md:col-span-3">
          <label className="text-xs text-gray-600" htmlFor="name">
            Nazwa
          </label>
          <input
            className="rounded-lg border-2 p-1 pl-2"
            {...register('name', { required: true, minLength: 6 })}
            type="text"
            id="name"
            defaultValue={project?.name}
          />
          <div className="h-6">{errors.name && <p>To pole jest wymagane</p>}</div>
        </div>
        <div>
          <label className="text-xs text-gray-600" htmlFor="street">
            Ulica i numer
          </label>
          <input
            {...register('street', { required: true, minLength: 3 })}
            type="text"
            id="street"
            className="w-full rounded-lg border-2 p-1 pl-2"
            defaultValue={project?.street}
          />
        </div>
        <div>
          <label className="text-xs text-gray-600" htmlFor="city">
            Miejscowość
          </label>
          <input
            {...register('city', { required: true, minLength: 3 })}
            type="text"
            id="city"
            className="w-full rounded-lg border-2 p-1 pl-2"
            defaultValue={project?.city}
          />
        </div>
        <div>
          <label className="text-xs text-gray-600" htmlFor="zipcode">
            Kod pocztowy
          </label>
          <input
            {...register('zipcode', { required: true, pattern: /^[0-9]{2}-[0-9]{3}$/i })}
            type="text"
            maxLength={6}
            id="zipcode"
            className="w-full rounded-lg border-2 p-1 pl-2"
            defaultValue={project?.zipcode}
          />
        </div>
        <div>
          <label className="text-xs text-gray-600" htmlFor="start_date">
            Data rozpoczęcia
          </label>
          <input
            {...register('start_date', { required: true })}
            type="date"
            id="start_date"
            className="w-full rounded-lg border-2 p-1 pl-2"
            defaultValue={project?.start_date}
          />
        </div>
        <div>
          <label className="text-xs text-gray-600" htmlFor="end_date">
            Data zakończenia
          </label>
          <input
            {...register('end_date', { required: true })}
            type="date"
            id="end_date"
            className="w-full rounded-lg border-2 p-1 pl-2"
            defaultValue={project?.end_date}
          />
        </div>
        <div>
          <label className="text-xs text-gray-600" htmlFor="status">
            Status
          </label>
          <Controller
            control={control}
            defaultValue={statuses[0]}
            name="status"
            render={({ field: { onChange } }) => (
              <Listbox onChange={onChange} defaultValue={statuses[0]}>
                <div className="relative">
                  <Listbox.Button className="w-full rounded-lg border-2 p-1 pl-2">
                    {({ value }) => value}
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 w-full space-y-1 rounded-lg border-2 bg-white p-1">
                    {statuses.map((status) => (
                      <Listbox.Option
                        className={`${
                          status === 'Zakończony'
                            ? 'bg-green-400 hover:bg-green-500'
                            : 'bg-yellow-300 hover:bg-yellow-400'
                        } rounded-full py-1 text-center hover:cursor-pointer`}
                        key={status}
                        value={status}
                      >
                        {status}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            )}
          ></Controller>
        </div>
        <div>
          <label className="text-xs text-gray-600" htmlFor="client">
            Klient
          </label>
          <input
            {...register('client', { required: true, minLength: 6 })}
            type="text"
            id="client"
            className="w-full rounded-lg border-2 p-1 pl-2"
            defaultValue={project?.client}
          />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        {onClose && <Button onClick={onClose}>Powrót</Button>}
        {project ? (
          <Button type="submit" variant="primary">
            Aktualizuj
          </Button>
        ) : (
          <Button type="submit" variant="primary">
            Dodaj
          </Button>
        )}
      </div>
    </form>
  );
}
