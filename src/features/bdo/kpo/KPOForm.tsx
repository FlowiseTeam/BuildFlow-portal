import { Input } from '@components/Input/Input';
import { Button } from '@components/button/Button';
import { StatusInput } from '@components/statusInput/StatusInput';
import { tm } from '@src/lib/tw';
import { FormProject, Project, projectStatuses } from '@src/services/api/index';
import { Controller, useForm } from 'react-hook-form';

interface KPOFields {
  transporter: {
    name: string;
    registrationNumber: string | number;
  };
  acquirer: {
    name: string;
    registrationNumber: string | number;
    businessPlaceNumber: string | number;
  };
  details: {
    wasteCode: string | number;
    weight: string | number;
    receivingVehicleRegistrationNumber: string | number;
    startDate: string;
    startTime: string;
  };
  comment?: string;
}

export function KPOForm({
  onClose,
  handleFormSubmit,
  disabled = false,
}: {
  onClose?: () => void;
  handleFormSubmit: (project: Project) => Promise<void>;
  disabled?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<KPOFields>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="p-4">
        <fieldset>
          <Legend>Dane transportującego odpady</Legend>
          <div className="grid gap-x-4 md:grid-cols-2">
            <Input
              register={register}
              validationSchema={{ minLength: 3 }}
              id="transporter-name"
              type="text"
              labelText="Nazwa lub imię nazwisko"
              name="transporter.name"
              error={errors.transporter?.name}
              disabled={disabled}
            />
            <Input
              register={register}
              validationSchema={{ required: true, minLength: 3 }}
              id="transporter.registration-number"
              type="text"
              labelText="Numer rejestrowy"
              name="transporter.registrationNumber"
              error={errors.transporter?.registrationNumber}
              disabled={disabled}
            />
          </div>
        </fieldset>
        <fieldset className="md:col-span-2">
          <Legend>Dane przejmującego odpady</Legend>
          <div className="grid gap-x-4 md:grid-cols-2">
            <Input
              register={register}
              validationSchema={{ minLength: 3 }}
              id="acquirer-name"
              type="text"
              labelText="Nazwa lub imię nazwisko"
              name="acquirer.name"
              error={errors.acquirer?.name}
              disabled={disabled}
            />
            <Input
              register={register}
              validationSchema={{ required: true, minLength: 3 }}
              id="acquirer-registration-number"
              type="text"
              labelText="Numer rejestrowy"
              name="acquirer.registrationNumber"
              error={errors.acquirer?.registrationNumber}
              // value={'XDD'}
              // disabled
            />
            <Input
              register={register}
              validationSchema={{ required: true, minLength: 3 }}
              id="acquirer-businessPlaceNumber"
              type="text"
              labelText="Numer miejsca prowadzenia działalności"
              name="acquirer.businessPlaceNumber"
              error={errors.acquirer?.registrationNumber}
              disabled={disabled}
            />
          </div>
        </fieldset>
        <fieldset className="md:col-span-2">
          <Legend>Informacje dotyczące odpadów</Legend>
          <div className="grid gap-x-4  md:grid-cols-2">
            <Input
              register={register}
              validationSchema={{ required: true, minLength: 3 }}
              id="details-wasteCode"
              type="text"
              labelText="Kod odpadu"
              name="details.wasteCode"
              error={errors.details?.wasteCode}
              disabled={disabled}
            />
            <Input
              register={register}
              validationSchema={{ minLength: 3 }}
              id="details-weight"
              type="text"
              labelText="Waga"
              name="details.weight"
              error={errors.details?.weight}
              disabled={disabled}
            />
            <Input
              register={register}
              validationSchema={{ minLength: 3 }}
              id="details-receivingVehicleRegistrationNumber"
              type="text"
              labelText="Nr. rejestracyjny pojazdu odbierającego"
              name="details.receivingVehicleRegistrationNumber"
              error={errors.details?.receivingVehicleRegistrationNumber}
              disabled={disabled}
            />
            <Input
              register={register}
              validationSchema={{ minLength: 3 }}
              id="details-startDate"
              type="text"
              labelText="Data rozpoczęcia"
              name="details.startDate"
              error={errors.details?.startDate}
              disabled={disabled}
            />
            <Input
              register={register}
              validationSchema={{ minLength: 3 }}
              id="details-startTime"
              type="text"
              labelText="Godzina rozpoczęcia"
              name="details.startTime"
              error={errors.details?.startTime}
              disabled={disabled}
            />
          </div>
        </fieldset>
        <fieldset className="md:col-span-2">
          <Legend>Informacje dodatkowe</Legend>
          <Input
            register={register}
            validationSchema={{ minLength: 3 }}
            id="comment"
            type="text"
            labelText="Dodatkowe informacje"
            name="comment"
            error={errors.comment}
            disabled={disabled}
          />
        </fieldset>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Dodaj</Button>
      </div>
    </form>
  );
}

function Legend(props: React.HTMLProps<HTMLLegendElement>) {
  const { children, className, ...rest } = props;
  return (
    <legend className={tm('mb-2', className)} {...rest}>
      {children}
    </legend>
  );
}
