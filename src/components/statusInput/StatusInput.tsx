import { Listbox } from '@headlessui/react';

export function StatusInput({
  onChange,
  values,
  defaultValue,
}: {
  onChange: (...event: any[]) => void;
  values: string[];
  defaultValue: string;
}) {
  return (
    <Listbox onChange={onChange} defaultValue={defaultValue}>
      <div className="relative flex flex-col">
        <label className="text-xs text-gray-600" htmlFor="status">
          Status
        </label>
        <Listbox.Button className="h-9 w-full rounded-lg border-2 p-1 pl-2">{({ value }) => value}</Listbox.Button>
        <Listbox.Options className="absolute mt-14 w-full space-y-1 rounded-lg border-2 bg-white p-1">
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
