import { Input } from '@components/Input/Input';
import { Button } from '@components/button/Button';
import { ControlledSelect } from '@src/components/Input/ControlledSelect';
import { tm } from '@src/lib/tw';
import { KEORecord, KeoInfo } from '@src/services/api/routes/bdo';
import { useForm } from 'react-hook-form';

interface KEOFields {
  KeoName: string;
  WasteMassInstallation: number;
  WasteMassExcludingInstallation: number;
  WasteFromServices: string;
  CommuneName: string;
  ManufactureDate: string;
  HazardousWasteReclassification: boolean;
}

interface KEOFormProps {
  handleFormSubmit: any;
  keoInfo: KeoInfo;
}

export function KEOForm({ handleFormSubmit, keoInfo }: KEOFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<KEOFields>();

  const onSubmit = handleSubmit((data) => {
    const res: KEORecord = {
      HazardousWasteReclassification: false,
      KeoId: keoInfo.cards.find((card) => card.name === data.KeoName)?.KeoId!,
      ManufactureDate: data.ManufactureDate,
      WasteFromServices: data.WasteFromServices,
      WasteMassExcludingInstallation: data.WasteMassExcludingInstallation,
      WasteMassInstallation: data.WasteMassInstallation,
      ...(data.CommuneName && {
        CommuneId: String(keoInfo.commons.find((commune) => commune.name === data.CommuneName)?.commonId!),
      }),
    };

    handleFormSubmit(res);
  });

  const isWasteGenerated = watch('WasteFromServices');

  return (
    <form onSubmit={onSubmit}>
      <div className="p-4">
        <fieldset>
          <div className="grid gap-x-4 md:grid-cols-2">
            <ControlledSelect
              control={control}
              rules={{ required: true }}
              name="KeoName"
              values={keoInfo.cards.map((card) => card.name)}
              labelText="Numer karty ewidencji"
            />
            <Input
              register={register}
              validationSchema={{ required: true }}
              id="input-date"
              type="datetime-local"
              labelText="Data wytworzenia"
              name="ManufactureDate"
              error={errors.ManufactureDate}
            />
          </div>
        </fieldset>
        <fieldset className="md:col-span-2">
          <Legend>Masa wytworzonych odpadów w tonach</Legend>
          <div className="grid gap-x-4 md:grid-cols-2">
            <Input
              register={register}
              validationSchema={{ required: true }}
              id="WasteMassInstallation"
              type="number"
              labelText="W związku z eksploatacją instalacji"
              name="WasteMassInstallation"
              error={errors.WasteMassInstallation}
            />
            <Input
              register={register}
              validationSchema={{ required: true }}
              id="WasteMassExcludingInstallation"
              type="number"
              labelText="Poza instalacją"
              name="WasteMassExcludingInstallation"
              error={errors.WasteMassExcludingInstallation}
            />
          </div>
        </fieldset>
        <Input
          register={register}
          id="WasteFromServices"
          type="checkbox"
          labelText="Wytwarzanie odpadów w wyniku świadczenia usług i/lub działalności w zakresie obiektów liniowych"
          name="WasteFromServices"
          error={errors.WasteFromServices}
          className="items-start"
        />
        {isWasteGenerated && (
          <ControlledSelect
            control={control}
            values={keoInfo.commons.map((common) => common.name)}
            labelText="Gmina"
            name="CommuneName"
          />
        )}
      </div>
      <div className="w-full text-right">
        <Button type="submit" variant="primary">
          Zatwierdź
        </Button>
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
