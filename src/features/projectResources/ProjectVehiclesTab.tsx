import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@src/components/button/Button';
import { ProjectResourcesCellsFallback } from './ProjectResourcesCellsFallback';
import { useVehicles } from '@src/services/api/hooks/vehicles';
import { tm } from '@src/lib/tw';

export function ProjectVehiclesTab({
  projectId,
  isEdited,
  handleDeleteVehicle,
  isPending,
}: {
  projectId: number;
  isEdited: boolean;
  handleDeleteVehicle: any;
  isPending: boolean;
}) {
  const { data: vehicles, isLoading, isError } = useVehicles();

  const projectVehicles =
    vehicles?.vehicles.filter((vehicle) => vehicle.assigned_project?.some((proj) => proj.project_id === projectId)) ||
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
                <Button
                  className="ml-4 inline p-1"
                  size="custom"
                  onClick={() => handleDeleteVehicle(projectId, vehicle._id)}
                  disabled={isPending}
                >
                  <TrashIcon
                    className={tm(
                      ' h-4 w-4 cursor-pointer text-neutral-500',
                      isPending && 'bg-neutral-200 text-gray-400',
                    )}
                  />
                </Button>
              )}
            </div>
          </div>
        ))}
    </>
  );
}
