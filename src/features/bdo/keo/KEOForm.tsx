import { Input } from '@components/Input/Input';
import { Button } from '@components/button/Button';
import { StatusInput } from '@components/statusInput/StatusInput';
import { tm } from '@src/lib/tw';
import { FormProject, Project, projectStatuses } from '@src/services/api/index';
import { Controller, useForm } from 'react-hook-form';

interface KEOFields {
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

export function KEOForm({
  onClose,
  handleFormSubmit,
  project,
  disabled = false,
}: {
  onClose?: () => void;
  handleFormSubmit: (project: Project) => Promise<void>;
  project?: Project;
  disabled?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<KEOFields>();

  const onSubmit = handleSubmit((data) => {});

  return (
    <form onSubmit={onSubmit}>
      <div className="p-4">
        <fieldset>
          <div className="grid gap-x-4 md:grid-cols-2">
            <Input
              register={register}
              validationSchema={{ required: true, minLength: 3 }}
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
          <Legend>Masa wytworzonych odpadów w tonach</Legend>
          <div className="grid gap-x-4 md:grid-cols-2">
            <Input
              register={register}
              validationSchema={{ minLength: 3 }}
              id="acquirer-name"
              type="text"
              labelText="W związku z eksploatacją instalacji"
              name="acquirer.name"
              error={errors.acquirer?.name}
              disabled={disabled}
            />
            <Input
              register={register}
              validationSchema={{ required: true, minLength: 3 }}
              id="acquirer-registration-number"
              type="text"
              labelText="Poza instalacją"
              name="acquirer.registrationNumber"
              error={errors.acquirer?.registrationNumber}
              disabled
            />
          </div>
        </fieldset>
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
