import { Listbox } from '@headlessui/react';
import { tm } from '@src/lib/tw';

export function StatusInput({
  onChange,
  values,
  id,
  defaultValue,
  disabled = false,
  isRequired = true,
  colors = {},
}: {
  onChange: (...event: any[]) => void;
  values: readonly string[];
  id: string;
  defaultValue: string;
  disabled?: boolean;
  isRequired?: boolean;
  colors?: Record<(typeof values)[number], string>;
}) {
  return (
    <Listbox disabled={disabled} onChange={onChange} defaultValue={defaultValue}>
      <div className="relative flex flex-col">
        <label
          className={tm(
            'text-xs text-gray-600',
            !disabled && isRequired && "after:ml-[2px] after:text-red-500 after:content-['*']",
          )}
          htmlFor={id}
        >
          Status
        </label>
        <Listbox.Button
          role="input"
          id={id}
          className={`h-9 w-full rounded-lg border-2 p-1
           ${disabled ? ' bg-neutral-50 text-gray-600' : ''}`}
        >
          {({ value }) => (
            <div className="relative flex items-center justify-center gap-2">
              <div className={`absolute left-2 h-0 w-0 rounded-full border-[5px] ${colors[value]}`}></div>
              <span>{value}</span>
            </div>
          )}
        </Listbox.Button>
        <Listbox.Options className="absolute mt-14 w-full space-y-1 rounded-lg border-2 bg-white p-1">
          {values.map((val) => (
            <Listbox.Option
              className="rounded py-1 text-center hover:cursor-pointer hover:bg-neutral-200"
              key={val}
              value={val}
            >
              <div className="relative flex items-center justify-center gap-2">
                <div className={`absolute left-2 h-0 w-0 rounded-full border-[5px] ${colors[val]}`}></div>
                <span>{val}</span>
              </div>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
