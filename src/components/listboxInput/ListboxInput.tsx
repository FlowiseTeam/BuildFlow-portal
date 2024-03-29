import { Listbox } from '@headlessui/react';
import { tj, tm } from '@src/lib/tw';
import { errorMessage } from '../Input/Input';

type ListboxInputProps =
  | {
      onChange: (...event: any[]) => void;
      values: readonly string[];
      labelText: string;
      id?: string;
      defaultValue: string;
      disabled?: boolean;
      placeholder?: string;
      Option?: JSX.Element;
      Button?: JSX.Element;
      error;
      rules;
    }
  | {
      onChange: (...event: any[]) => void;
      values: Object[];
      labelText: string;
      id?: string;
      defaultValue: Object[];
      disabled?: boolean;
      placeholder?: string;
      Option: JSX.Element;
      Button: JSX.Element;
      error;
      rules;
    };

export function ListboxInput({
  onChange,
  values,
  labelText,
  id,
  defaultValue,
  disabled = false,
  placeholder,
  Option,
  Button,
  error,
  rules,
}: ListboxInputProps) {
  return (
    <Listbox disabled={disabled} onChange={onChange} defaultValue={defaultValue}>
      <div className="relative flex flex-col">
        <label
          className={tm(
            'text-xs text-gray-600',
            !disabled && rules?.required && "after:ml-[2px] after:text-red-500 after:content-['*']",
          )}
          htmlFor={id}
        >
          {labelText}
        </label>
        <Listbox.Button
          role="input"
          id={id}
          className={tj(
            'h-9 w-full rounded-lg border-2 p-1 pl-2',
            disabled && 'cursor-not-allowed bg-neutral-50 text-gray-600',
          )}
        >
          {({ value }) => (value ? Button ? <Button value={value} /> : value : !disabled && placeholder)}
        </Listbox.Button>
        <Listbox.Options className="absolute z-[5] mt-14 w-full space-y-1 rounded-lg border-2 bg-white p-1">
          {values.map((val) => (
            <Listbox.Option
              className="rounded py-1 text-center hover:cursor-pointer hover:bg-neutral-200"
              key={normalize(val)}
              value={val}
            >
              {Option ? <Option value={val} /> : normalize(val)}
            </Listbox.Option>
          ))}
        </Listbox.Options>
        {error && <p className="text-xs text-red-600">{errorMessage(error.type, rules)}</p>}
      </div>
    </Listbox>
  );
}

function normalize(value: string | Object) {
  return typeof value === 'string' ? value : value.toString();
}
