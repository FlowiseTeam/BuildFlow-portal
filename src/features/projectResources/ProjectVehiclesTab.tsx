import { TrashIcon } from '@heroicons/react/20/solid';
import { Button } from '@src/components/button/Button';
import { Project } from '@src/services/api';
import { ProjectResourcesCellsFallback } from './ProjectResourcesCellsFallback';
import { useVehicleDetach, useVehicleMutation, useVehicles } from '@src/services/api/hooks/vehicles';

export function ProjectVehiclesTab({ project, isEdited }: { project: Project; isEdited: boolean }) {
  const { data: vehicles, isLoading, isError } = useVehicles();
  // const { mutate } = useVehicleMutation();

  const projectVehicles =
    vehicles?.vehicles.filter((vehicle) => vehicle.assigned_project?.some((proj) => proj.project_id === project._id)) ||
    [];

  return (
    <>
      {isLoading && <ProjectResourcesCellsFallback />}
      {isError && <p className="text-center text-sm italic text-gray-700">Nie udało się pobrać listy pracowników</p>}
      {!isLoading &&
        !isError &&
        projectVehicles.map((vehicle) => (
          <div key={vehicle._id} className="mx-4 flex justify-between py-1">
            <p>{vehicle.name}</p>
            <div>
              {isEdited && (
                // <Button className="ml-4 inline p-1" size="custom" onClick={() => handleDeleteEmployee(employee._id)}>
                //   <TrashIcon className=" h-4 w-4 cursor-pointer text-neutral-500" />
                // </Button>
                <RemoveVehicle id={vehicle._id} />
              )}
            </div>
          </div>
        ))}
    </>
  );
}

function RemoveVehicle({ id }: { id: number }) {
  const { mutate } = useVehicleDetach(id);
  return (
    <Button className="ml-4 inline p-1" size="custom" onClick={() => mutate(id)}>
      <TrashIcon className=" h-4 w-4 cursor-pointer text-neutral-500" />
    </Button>
  );
}
