import { Input } from '@components/Input/Input';
import { Button } from '@components/button/Button';
import { ListboxInput } from '@src/components/listboxInput/ListboxInput';
import { LoadingIcon } from '@src/components/loadings/Loading';
import { Employee } from '@src/services/api/index';
import { Controller, useForm } from 'react-hook-form';

export type EmployeeFormInputs = Omit<Employee, '_id' | 'updated_at' | 'created_at' | 'qualifications'>;

const Allstatuses = ['Przypisany', 'Nieprzypisany', 'Urlop'] as const;
const newEmployeeStatuses = ['Urlop', 'Nieprzypisany'] as const;

export function EmployeeForm({
  onClose,
  handleFormSubmit,
  employee,
  disabled = false,
  isLoading,
}: {
  onClose?: () => void;
  handleFormSubmit: (data: EmployeeFormInputs) => Promise<void>;
  employee?: Employee;
  disabled?: boolean;
  isLoading?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
  } = useForm<EmployeeFormInputs>({ defaultValues: employee });

  const onSubmit = handleSubmit(async (data) => {
    if (!isValid) return;
    await handleFormSubmit(data);
  });

  const statuses = employee ? Allstatuses : newEmployeeStatuses;

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
            <ListboxInput
              labelText="Status"
              onChange={onChange}
              disabled={disabled}
              id="status"
              values={statuses}
              defaultValue={employee?.status || statuses[0]}
            />
          )}
        />
      </div>
      <div className="flex justify-end gap-3">
        {onClose && <Button onClick={onClose}>Powrót</Button>}
        {employee ? (
          <Button disabled={!isDirty} type="submit" variant="primary">
            Aktualizuj
          </Button>
        ) : (
          <Button type="submit" variant="primary" className="flex items-center">
            {isLoading && <LoadingIcon className="h-4" />}
            Dodaj
          </Button>
        )}
      </div>
    </form>
  );
}
