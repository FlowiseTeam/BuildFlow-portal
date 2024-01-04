import { Input } from '@components/Input/Input';
import { Button } from '@components/button/Button';
import { ControlledSelect } from '@src/components/Input/ControlledSelect';
import { ControlledSelectV } from '@src/components/Input/ControlledSelectV';
import { tm } from '@src/lib/tw';
import { useKpoCardMutation } from '@src/services/api/hooks/bdo';
import { KpoInfo } from '@src/services/api/routes/bdo';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface WasteCodeType {
  WasteCodeId: number;
  code: string;
  description: string;
  type: string;
  _id: string;
}

interface EupId {
  address: string;
  code: string;
}

interface KPOFields {
  ReceiverCompanyId: string | number;
  ReceiverEupId: EupId | null;
  ReceiverCompanyName: string | number;
  CarrierCompanyId: string | number;
  CarrierCompanyName: string | number;
  VehicleRegNumber: string | number;
  WasteCode: WasteCodeType;
  PlannedTransportTime: string;
  WasteMass: string | number;
  AdditionalInfo?: string;
  IsWasteGenerating: boolean;
  WasteGeneratedTerytPkName?: string;
}

interface CreateCard {
  CarrierCompanyId: string;
  ReceiverCompanyId: string;
  ReceiverEupId: string;
  WasteCodeId: number;
  VehicleRegNumber: string;
  WasteMass: number;
  PlannedTransportTime: string;
  AdditionalInfo: string;
  HazardousWasteReclassification: boolean;
  WasteCodeExtended: boolean;
  IsWasteGenerating: boolean;
  WasteGeneratedTerytPkName?: string;
}

interface KPOFormProps {
  isLoading: boolean;
  kpoInfo?: KpoInfo;
  onClose?: () => void;
  handleFormSubmit: () => void;
  disabled?: boolean;
}

export function KPOForm({ kpoInfo, disabled = false }: KPOFormProps) {
  if (!kpoInfo) {
    return null;
  }

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
    watch,
  } = useForm<KPOFields>();

  const { mutate } = useKpoCardMutation();

  const onSubmit = handleSubmit((data) => {
    const terytPk = kpoInfo.commons.find((common) => common.name === data.WasteGeneratedTerytPkName)?.commonId;
    const CarrierCompanyId = kpoInfo.carriers.find((carrier) => carrier.name === data.CarrierCompanyName)?.companyId;
    const ReceiverCompanyId = kpoInfo.receivers.find(
      (receiver) => receiver.name === data.ReceiverCompanyName,
    )?.companyId;

    const result: CreateCard = {
      CarrierCompanyId: CarrierCompanyId,
      IsWasteGenerating: data.IsWasteGenerating,
      PlannedTransportTime: data.PlannedTransportTime,
      ReceiverCompanyId: ReceiverCompanyId,
      ReceiverEupId: data.ReceiverEupId.code,
      VehicleRegNumber: data.VehicleRegNumber,
      WasteCodeId: data.WasteCode.WasteCodeId,
      WasteMass: data.WasteMass,
      WasteCodeExtended: true,
      HazardousWasteReclassification: true,
      AdditionalInfo: data.AdditionalInfo,
      ...(terytPk ? { WasteGeneratedTerytPk: String(terytPk) } : null),
    };
    mutate(result);
    navigate('..');
  });

  const isDisabled = disabled;
  const { carriers, receivers, wasteCodes } = kpoInfo;

  const selectedReceiverName = watch('ReceiverCompanyName');

  const eupIds = kpoInfo.receivers.find((receiver) => receiver.name === selectedReceiverName)?.EupIds || [];

  const isWasteGenerated = watch('IsWasteGenerating');

  return (
    <form onSubmit={onSubmit}>
      <div className="p-4">
        <fieldset>
          <Legend>Dane transportującego odpady</Legend>
          <div className="grid gap-x-4 md:grid-cols-2">
            <ControlledSelect
              control={control}
              rules={{ required: true }}
              name="CarrierCompanyName"
              values={carriers.map((carrier) => carrier.name)}
              labelText="Nazwa lub imię nazwisko"
              onChangeMiddleware={(carrierName) => {
                const regNum = kpoInfo.carriers.find((carrier) => carrier.name === carrierName)?.registrationNumber;
                regNum && setValue('CarrierCompanyId', regNum);
              }}
            />
            <Input
              register={register}
              id="CarrierCompanyId"
              type="text"
              labelText="Numer rejestrowy"
              name="CarrierCompanyId"
              error={errors.CarrierCompanyId}
              validationSchema={{ required: true }}
              disabled={true}
            />
          </div>
        </fieldset>
        <fieldset className="md:col-span-2">
          <Legend>Dane przejmującego odpady</Legend>
          <div className="grid gap-x-4 md:grid-cols-2">
            <ControlledSelect
              control={control}
              rules={{ required: true }}
              name="ReceiverCompanyName"
              values={receivers.map((receiver) => receiver.name)}
              labelText="Nazwa lub imię nazwisko"
              onChangeMiddleware={(name) => {
                const regNum = kpoInfo.receivers.find((receiver) => receiver.name === name)?.registrationNumber;
                regNum && setValue('ReceiverCompanyId', regNum);
                setValue('ReceiverEupId', null);
              }}
            />
            <Input
              register={register}
              id="ReceiverCompanyId"
              type="text"
              labelText="Numer rejestrowy"
              name="ReceiverCompanyId"
              validationSchema={{ required: true }}
              disabled={true}
            />
            <ControlledSelectV
              control={control}
              rules={{ required: true }}
              Button={EupIdButton}
              Option={EupIdOption}
              name="ReceiverEupId"
              values={eupIds}
              labelText="Numer miejsca prowadzenia działalności"
              disabled={!selectedReceiverName}
            />
          </div>
        </fieldset>
        <fieldset className="md:col-span-2">
          <Legend>Informacje dotyczące odpadów</Legend>
          <div className="grid gap-x-4  md:grid-cols-2">
            <ControlledSelect
              control={control}
              rules={{ required: true }}
              values={wasteCodes}
              Option={WasteCodeOption}
              Button={WasteCodeButton}
              labelText="Kod odpadu"
              name="WasteCode"
              disabled={isDisabled}
            />

            <Input
              register={register}
              validationSchema={{ minLength: 3, required: true }}
              id="VehicleRegNumber"
              type="text"
              labelText="Nr. rejestracyjny pojazdu odbierającego"
              name="VehicleRegNumber"
              error={errors.VehicleRegNumber}
              disabled={isDisabled}
            />
            <Input
              register={register}
              validationSchema={{ required: true }}
              id="PlannedTransportTime"
              type="datetime-local"
              labelText="Data rozpoczęcia"
              name="PlannedTransportTime"
              error={errors.PlannedTransportTime}
              disabled={isDisabled}
            />
          </div>
        </fieldset>
        <fieldset className="md:col-span-2">
          <Legend>Informacje dodatkowe</Legend>
          <Input
            register={register}
            type="text"
            labelText="Dodatkowe informacje"
            name="AdditionalInfo"
            error={errors.AdditionalInfo}
            disabled={isDisabled}
          />
          <Input
            register={register}
            validationSchema={{ required: true }}
            id="details-weight"
            type="number"
            labelText="Waga (t)"
            name="WasteMass"
            error={errors.WasteMass}
            disabled={isDisabled}
            step="0.01"
          />
          <Input
            register={register}
            id="IsWasteGenerating"
            type="checkbox"
            labelText="Wytwarzanie odpadów w wyniku świadczenia usług i/lub działalności w zakresie obiektów liniowych"
            name="IsWasteGenerating"
            error={errors.IsWasteGenerating}
            disabled={isDisabled}
            className="items-start"
          />
          {isWasteGenerated && (
            <ControlledSelect
              control={control}
              rules={{ required: true }}
              values={kpoInfo.commons.map((common) => common.name)}
              labelText="Gmina"
              name="WasteGeneratedTerytPkName"
              disabled={isDisabled}
            />
          )}
        </fieldset>
      </div>
      <div className="flex justify-end">
        <Button type="submit" variant="primary">
          Dodaj
        </Button>
      </div>
    </form>
  );
}

interface WasteCodeValue {
  value: WasteCodeType;
}

function WasteCodeOption({ value }: WasteCodeValue) {
  return (
    <div className="flex flex-col text-left">
      <span className="font-semibold">{value.code}</span>
      <span>{value.description}</span>
    </div>
  );
}

function WasteCodeButton({ value }: WasteCodeValue) {
  return <span>{value.code}</span>;
}

interface EupIdValue {
  value: {
    code: string;
    address: string;
  };
}

function EupIdOption({ value }: EupIdValue) {
  return (
    <div className="flex flex-col text-left">
      <span className="font-semibold">{value.code}</span>
      <span>{value.address}</span>
    </div>
  );
}

function EupIdButton({ value }: EupIdValue) {
  return <span>{value.code}</span>;
}

function Legend(props: React.HTMLProps<HTMLLegendElement>) {
  const { children, className, ...rest } = props;
  return (
    <legend className={tm('mb-2', className)} {...rest}>
      {children}
    </legend>
  );
}
