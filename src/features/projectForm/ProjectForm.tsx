import { Input } from '@components/Input/Input';
import { Button } from '@components/button/Button';
import { StatusInput } from '@components/statusInput/StatusInput';
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
  handleFormSubmit,
  project,
}: {
  onClose?: () => void;
  handleFormSubmit: (data: FormProject) => Promise<void>;
  project?: Project;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
  } = useForm<AddProjectInputs>();

  const onSubmit = handleSubmit(async (data) => {
    if (!isValid) return;
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
    await handleFormSubmit(project);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="grid auto-rows-fr gap-x-2 p-4 md:grid-cols-3">
        <div className="md:col-span-3">
          <Input
            register={register}
            validationSchema={{ required: true, minLength: 3 }}
            id="name"
            type="text"
            defaultValue={project?.name}
            labelText="Nazwa"
            name="name"
            error={errors.name}
          />
        </div>
        <Input
          register={register}
          validationSchema={{ required: true, minLength: 3 }}
          id="street"
          type="text"
          defaultValue={project?.street}
          labelText="Ulica i numer"
          name="street"
          error={errors.street}
        />
        <Input
          register={register}
          validationSchema={{ required: true, minLength: 3 }}
          id="city"
          type="text"
          defaultValue={project?.city}
          labelText="Miejscowość"
          name="city"
          error={errors.city}
        />
        <Input
          register={register}
          validationSchema={{ required: true, pattern: /^[0-9]{2}-[0-9]{3}$/i }}
          id="zipcode"
          type="text"
          defaultValue={project?.zipcode}
          labelText="Kod pocztowy"
          name="zipcode"
          error={errors.zipcode}
        />
        <Input
          register={register}
          validationSchema={{ required: true }}
          id="start_date"
          type="date"
          defaultValue={project?.start_date}
          labelText="Data rozpoczęcia"
          name="start_date"
          error={errors.start_date}
        />
        <Input
          register={register}
          validationSchema={{ required: true }}
          id="end_date"
          type="date"
          defaultValue={project?.end_date}
          labelText="Data zakończenia"
          name="end_date"
          error={errors.end_date}
        />
        <Controller
          control={control}
          defaultValue={statuses[0]}
          name="status"
          render={({ field: { onChange } }) => (
            <StatusInput id="status" onChange={onChange} values={statuses} defaultValue={statuses[0]} />
          )}
        ></Controller>
        <Input
          register={register}
          validationSchema={{ required: true, minLength: 3 }}
          id="client"
          type="text"
          defaultValue={project?.client}
          labelText="Klient"
          name="client"
          error={errors.client}
        />
      </div>
      <div className="flex justify-end gap-3">
        {onClose && <Button onClick={onClose}>Powrót</Button>}
        {project ? (
          <Button disabled={!isDirty} type="submit" variant="primary">
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
