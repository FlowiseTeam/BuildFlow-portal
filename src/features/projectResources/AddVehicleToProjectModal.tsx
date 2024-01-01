import { Combobox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { Button } from '@src/components/button/Button';
import { Modal } from '@src/components/modal/Modal';
import { Project, updateProject } from '@src/services/api/index';
import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@src/App';
import { LoadingIcon } from '@src/components/loadings/Loading';
import { Vehicle } from '@src/services/api/routes/vehicles';

export function AddVehicleToProjectModal({
  project,
  allVehicles,
  onClose,
  show,
}: {
  project: Project;
  allVehicles: Vehicle[];
  onClose: () => void;
  show: boolean;
}) {
  const [selectedVehicles, setSelectedVehicles] = useState<{ name: string; id: number; wasSelected: boolean }[]>([]);
  const [query, setQuery] = useState('');

  const { mutateAsync: onUpdate, isPending } = useMutation({
    mutationKey: ['project', project._id],
    mutationFn: (vehicleIds: number[]) => {
      const updatedProject = { ...project, vehicles: [...project.vehicles, ...vehicleIds] } as Project;
      return updateProject(updatedProject);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['VEHICLES'] });
    },
  });

  const vehiclesByName = useMemo(
    () =>
      allVehicles
        // .sort((a, b) => (a.last_name < b.last_name ? 1 : -1))
        .map((vehicle) => ({
          name: vehicle.name,
          id: vehicle._id,
          wasSelected: project.vehicles.includes(vehicle._id),
        })),
    [allVehicles],
  );

  const filteredVehicles =
    query === ''
      ? vehiclesByName
      : vehiclesByName.filter((vehicle) => vehicle.name.toLowerCase().trim()!.includes(query.toLowerCase().trim()));

  const removeSelectedVehicle = (index: number) => {
    setSelectedVehicles((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  const handleSubmit = async () => {
    const vehicleIds = selectedVehicles.map((vehicle) => vehicle.id);
    await onUpdate(vehicleIds);
    queryClient.invalidateQueries({ queryKey: ['project', project._id] });
    setSelectedVehicles([]);
    onClose();
  };

  return (
    <Modal className="max-w-sm" onClose={onClose} show={show} title="Dodaj pojazdy">
      <Combobox value={selectedVehicles} onChange={setSelectedVehicles} multiple>
        <div>
          {isPending && (
            <p className="flex justify-center">
              <LoadingIcon />
            </p>
          )}
          <p className="text-sm font-semibold">Wcześniej przypisane:</p>
          <div className="min-h-[3rem]">
            {vehiclesByName
              .filter((vehicle) => vehicle.wasSelected)
              .map((vehicle) => (
                <span key={vehicle.id} className="m-1 rounded bg-neutral-100 p-1 px-3 text-xs">
                  {vehicle.name}
                </span>
              ))}
          </div>
          <p className="text-sm font-semibold">Zaznaczone:</p>
          <div className="flex min-h-[1rem] flex-wrap items-start">
            {selectedVehicles.map((vehicle, i) => (
              <span
                key={vehicle.id}
                onClick={() => removeSelectedVehicle(i)}
                className="m-1 whitespace-nowrap rounded bg-neutral-100 p-1 px-3 text-xs hover:cursor-[url(../../../public/bin-icon.svg),auto]"
              >
                {vehicle.name}
              </span>
            ))}
          </div>
        </div>
        <div className="relative mb-16 mt-6 rounded-md border-2">
          <Combobox.Input
            placeholder="Wyszukaj pojazd"
            className="w-full rounded-md bg-neutral-100 p-1 text-sm shadow"
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Options className="absolute mt-2 max-h-40 w-full overflow-y-auto rounded bg-white py-1 shadow">
            {filteredVehicles.map((vehicle) => (
              <Combobox.Option
                disabled={vehicle.wasSelected}
                className={`${
                  vehicle.wasSelected
                    ? 'bg-neutral-100 text-gray-400 hover:cursor-not-allowed'
                    : ' hover:cursor-pointer hover:bg-primary/40'
                } relative max-w-full rounded p-1 pl-10`}
                key={vehicle.id}
                value={vehicle}
              >
                {({ selected }) => (
                  <>
                    {(selected || vehicle.wasSelected) && (
                      <CheckIcon className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-primary" />
                    )}
                    <p
                      className={`overflow-hidden text-ellipsis whitespace-nowrap ${selected ? ' font-semibold' : ''}`}
                    >
                      {vehicle.name}
                    </p>
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
      <div className="w-full text-right">
        <Button className="mr-4" onClick={onClose}>
          Anuluj
        </Button>
        <Button onClick={handleSubmit} disabled={!(selectedVehicles.length > 0)} variant="primary">
          Dodaj
        </Button>
      </div>
    </Modal>
  );
}
