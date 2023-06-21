import { Listbox } from '@headlessui/react';

export function ListboxInput({
  onChange,
  values,
  labelText,
  id,
  defaultValue,
  disabled = false,
}: {
  onChange: (...event: any[]) => void;
  values: readonly string[];
  labelText: string;
  id: string;
  defaultValue: string;
  disabled?: boolean;
}) {
  return (
    <Listbox disabled={disabled} onChange={onChange} defaultValue={defaultValue}>
      <div className="relative flex flex-col">
        <label className="text-xs text-gray-600" htmlFor={id}>
          {labelText}
        </label>
        <Listbox.Button
          role="input"
          id={id}
          className={`h-9 w-full rounded-lg border-2 p-1 pl-2 ${
            disabled ? 'cursor-not-allowed bg-neutral-50 text-gray-600' : ''
          }`}
        >
          {({ value }) => value}
        </Listbox.Button>
        <Listbox.Options className="absolute z-[5] mt-14 w-full space-y-1 rounded-lg border-2 bg-white p-1">
          {values.map((val) => (
            <Listbox.Option
              className="rounded py-1 text-center hover:cursor-pointer hover:bg-neutral-200"
              key={val}
              value={val}
            >
              {val}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
