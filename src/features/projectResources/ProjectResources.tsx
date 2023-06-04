import { Tab } from '@headlessui/react';

export function ProjectResources({
  className,
  categories,
}: {
  className?: string;
  categories: { [key: string]: unknown[] };
}) {
  return (
    <div className={`${className}`}>
      <Tab.Group>
        <Tab.List className=" bg-stone-200/75 p-1 pb-0">
          {Object.keys(categories).map((cat) => (
            <Tab
              key={cat}
              className={({ selected }) =>
                ` rounded-[16px] rounded-b-none px-2 py-2 text-sm font-medium leading-5 ${selected ? 'bg-white' : ''}`
              }
            >
              {cat}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {Object.entries(categories).map(([key, value]) => (
            <Tab.Panel key={key}>
              {value.length === 0 && <p className="p-4 text-sm text-gray-400">Brak zasobów.</p>}
              {value.map((i) => (
                <p key={String(i)}>i</p>
              ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
