import { Control, Controller, FieldValues } from 'react-hook-form';
import { ListboxInput } from '../listboxInput/ListboxInput';
import { noop } from 'lodash';

interface ControlledSelectProps<TFV extends FieldValues, TContext = any> {
  control: Control<TFV, TContext>;
  defaultValue?: string;
  name: string;
  disabled?: boolean;
  id?: string;
  values: string[] | Object[];
  labelText: string;
  placeholder?: string;
  rules: any;
  onChangeMiddleware?: (value: any) => void;
}

export function ControlledSelect<TFV extends FieldValues>({
  control,
  defaultValue,
  name,
  disabled,
  id,
  values,
  labelText,
  placeholder = 'Wybierz...',
  rules,
  Option,
  Button,
  onChangeMiddleware = noop,
}: ControlledSelectProps<TFV>) {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      name={name}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <ListboxInput
          labelText={labelText}
          onChange={(v) => {
            onChange(v);
            onChangeMiddleware(v);
          }}
          disabled={disabled}
          id={id}
          values={values}
          defaultValue={defaultValue}
          placeholder={placeholder}
          Option={Option}
          Button={Button}
          error={error}
          rules={rules}
        />
      )}
    />
  );
}
