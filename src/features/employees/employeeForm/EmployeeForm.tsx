import { Input } from '@components/Input/Input';
import { Button } from '@components/button/Button';
import { StatusInput } from '@components/statusInput/StatusInput';
import { Employee } from '@services/api-types';
import { Controller, useForm } from 'react-hook-form';

export type EmployeeFormInputs = Omit<Employee, '_id' | 'updated_at' | 'created_at' | 'qualifications'>;

const statuses = ['Pracujący', 'Urlop'] as const;

export function EmployeeForm({
  onClose,
  handleFormSubmit,
  employee,
  disabled = false,
}: {
  onClose?: () => void;
  handleFormSubmit: (data: EmployeeFormInputs) => Promise<void>;
  employee?: Employee;
  disabled?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
  } = useForm<EmployeeFormInputs>();

  const onSubmit = handleSubmit(async (data) => {
    if (!isValid) return;
    await handleFormSubmit(data);
  });

  return (
    <form onSubmit={onSubmit} className="p-4">
      <div className="grid auto-rows-fr gap-x-2 md:grid-cols-2">
        <Input
          register={register}
          validationSchema={{ required: true, minLength: 3 }}
          id="first_name"
          type="text"
          defaultValue={employee?.first_name}
          labelText="Imię"
          name="first_name"
          error={errors.first_name}
          disabled={disabled}
        />
        <Input
          register={register}
          validationSchema={{ required: true, minLength: 3 }}
          id="last_name"
          type="text"
          defaultValue={employee?.last_name}
          labelText="Nazwisko"
          name="last_name"
          error={errors.last_name}
          disabled={disabled}
        />
        <Input
          register={register}
          validationSchema={{ required: true }}
          id="email"
          type="email"
          defaultValue={employee?.email}
          labelText="E-mail"
          name="email"
          error={errors.email}
          disabled={disabled}
        />
        <Input
          register={register}
          validationSchema={{ required: true }}
          id="role"
          type="text"
          defaultValue={employee?.role}
          labelText="Rola"
          name="role"
          error={errors.role}
          disabled={disabled}
        />

        <Controller
          control={control}
          defaultValue={statuses[0]}
          name="status"
          render={({ field: { onChange } }) => (
            <StatusInput
              onChange={onChange}
              disabled={disabled}
              id="status"
              values={statuses}
              defaultValue={statuses[0]}
            />
          )}
        ></Controller>
      </div>
      <div className="flex justify-end gap-3">
        {onClose && <Button onClick={onClose}>Powrót</Button>}
        {employee ? (
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