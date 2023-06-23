import { Input } from '@components/Input/Input';
import { Button } from '@components/button/Button';
import { StatusInput } from '@components/statusInput/StatusInput';
import { FormProject, Project, projectStatuses } from '@services/api-types';
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

export function ProjectForm({
  onClose,
  handleFormSubmit,
  project,
  disabled = false,
}: {
  onClose?: () => void;
  handleFormSubmit: (data: FormProject) => Promise<void>;
  project?: Project;
  disabled?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
  } = useForm<AddProjectInputs>({
    defaultValues: {
      ...project,
      start_date: project?.start_date.substring(0, 10),
      end_date: project?.end_date.substring(0, 10),
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!isValid) return;
    const proj: FormProject = {
      name: data.name,
      street: data.street,
      city: data.city,
      zipcode: data.zipcode,
      start_date: new Date(data.start_date).toISOString(),
      end_date: new Date(data.end_date).toISOString(),
      status: data.status as any,
      client: data.client,
      employees: project?.employees || [],
    };
    await handleFormSubmit(proj);
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
            disabled={disabled}
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
          disabled={disabled}
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
          disabled={disabled}
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
          disabled={disabled}
        />
        <Input
          register={register}
          validationSchema={{ required: true }}
          id="start_date"
          type="date"
          defaultValue={project?.start_date && project.start_date.substring(0, 10)}
          labelText="Data rozpoczęcia"
          name="start_date"
          error={errors.start_date}
          disabled={disabled}
        />
        <Input
          register={register}
          validationSchema={{ required: true }}
          id="end_date"
          type="date"
          defaultValue={project?.end_date && project.end_date.substring(0, 10)}
          labelText="Data zakończenia"
          name="end_date"
          error={errors.end_date}
          disabled={disabled}
        />
        <Controller
          control={control}
          defaultValue={projectStatuses[0]}
          name="status"
          render={({ field: { onChange } }) => (
            <StatusInput
              id="status"
              disabled={disabled}
              onChange={onChange}
              values={projectStatuses}
              defaultValue={projectStatuses[0]}
            />
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
          disabled={disabled}
        />
      </div>
      <div className="flex justify-end gap-3">
        {onClose && <Button onClick={onClose}>Powrót</Button>}
        {project && (
          <Button disabled={!isDirty} type="submit" variant="primary">
            Aktualizuj
          </Button>
        )}
        {!project && (
          <Button disabled={!isDirty} type="submit" variant="primary">
            Dodaj
          </Button>
        )}
      </div>
    </form>
  );
}
