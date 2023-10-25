import { Input } from '@src/components/Input/Input';
import { Button } from '@src/components/button/Button';
import { StatusInput } from '@src/components/statusInput/StatusInput';
import { FormVehicle } from '@src/services/api/routes/vehicles';
import { Controller, useForm } from 'react-hook-form';

interface AddVehicleFields {
  name: string;
  status: string;
  reg_number: string;
  rev_state: null | string;
  mileage: number;
  capacity: null;
}

const vehicleStatuses = ['W boju', 'Na firmie', 'W serwisie'] as const;

export function VehicleForm({
  vehicle,
  onClose,
  handleFormSubmit,
  disabled = false,
}: {
  vehicle?: FormVehicle;
  onClose?: () => void;
  handleFormSubmit: any;
  disabled?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
  } = useForm<AddVehicleFields>({
    defaultValues: {
      ...vehicle,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!isValid) return;
    const vehicleForm = {
      name: data.name,
      status: data.status,
      reg_number: data.reg_number,
      rev_state: null,
      mileage: data.mileage,
      capacity: null,
    };
    await handleFormSubmit(vehicleForm);
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
            defaultValue={vehicle?.name}
            labelText="Nazwa"
            name="name"
            error={errors.name}
            disabled={disabled}
          />
        </div>
        <Input
          register={register}
          validationSchema={{ required: true, minLength: 3 }}
          id="reg_number"
          type="text"
          defaultValue={vehicle?.reg_number}
          labelText="Nr. rejestracyjny"
          name="reg_number"
          error={errors.reg_number}
          disabled={disabled}
        />
        <Input
          register={register}
          validationSchema={{ required: true, minLength: 3 }}
          id="mileage"
          type="text"
          defaultValue={vehicle?.mileage}
          labelText="Przebieg (km)"
          name="mileage"
          error={errors.mileage}
          disabled={disabled}
        />
        <Controller
          control={control}
          defaultValue={vehicleStatuses[0]}
          name="status"
          render={({ field: { onChange } }) => (
            <StatusInput
              id="status"
              disabled={disabled}
              onChange={onChange}
              values={vehicleStatuses}
              defaultValue={vehicleStatuses[0]}
            />
          )}
        ></Controller>
      </div>
      <div className="flex justify-end gap-3">
        {onClose && <Button onClick={onClose}>Powrót</Button>}
        {vehicle && (
          <Button disabled={!isDirty} type="submit" variant="primary">
            Aktualizuj
          </Button>
        )}
        {!vehicle && (
          <Button disabled={!isDirty} type="submit" variant="primary">
            Dodaj
          </Button>
        )}
      </div>
    </form>
  );
}
