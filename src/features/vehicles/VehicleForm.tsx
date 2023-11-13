import { Input } from '@src/components/Input/Input';
import { Button } from '@src/components/button/Button';
import { LoadingIcon } from '@src/components/loadings/Loading';
import { StatusInput } from '@src/components/statusInput/StatusInput';
import { useToggle } from '@src/hooks/useToggle';
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

const vehicleStatusesColors: Record<(typeof vehicleStatuses)[number], string> = {
  'W boju': 'border-yellow-300',
  'Na firmie': 'border-green-400',
  'W serwisie': 'border-red-400',
};

export function VehicleForm({
  vehicle,
  onClose,
  handleFormSubmit,
  isAddModal = false,
  isPending = false,
}: {
  vehicle?: FormVehicle;
  onClose?: () => void;
  handleFormSubmit: any;
  isAddModal?: boolean;
  isPending?: boolean;
}) {
  const [isEdited, toggleIsEdited] = useToggle(isAddModal);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
    reset,
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
      rev_date: null,
      mileage: data.mileage,
      capacity: null,
    };

    const updatedVehicle = { ...vehicle, ...vehicleForm };
    toggleIsEdited();
    await handleFormSubmit(updatedVehicle);
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
            disabled={!isEdited}
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
          disabled={!isEdited}
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
          disabled={!isEdited}
        />
        <Controller
          control={control}
          defaultValue={vehicleStatuses[0]}
          rules={{ required: true }}
          name="status"
          render={({ field: { onChange } }) => (
            <StatusInput
              id="status"
              disabled={!isEdited}
              onChange={onChange}
              values={vehicleStatuses}
              defaultValue={vehicleStatuses[0]}
              colors={vehicleStatusesColors}
              isRequired
            />
          )}
        ></Controller>
      </div>
      <div className="flex justify-end gap-3">
        {vehicle && !isEdited && !isPending && <Button onClick={toggleIsEdited}>Edytuj</Button>}
        {vehicle && isEdited && !isPending && (
          <>
            <Button
              onClick={() => {
                toggleIsEdited();
                reset();
              }}
            >
              Anuluj
            </Button>
            <Button disabled={!isDirty} type="submit" variant="primary">
              Aktualizuj
            </Button>
          </>
        )}
        {onClose && <Button onClick={onClose}>Powrót</Button>}
        {!vehicle && (
          <Button disabled={!isDirty} type="submit" variant="primary">
            Dodaj
          </Button>
        )}
        {isPending && <LoadingIcon />}
      </div>
    </form>
  );
}
