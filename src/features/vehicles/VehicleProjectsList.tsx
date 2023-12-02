import { XMarkIcon } from '@heroicons/react/20/solid';
import { Button } from '@src/components/button/Button';
import { useState } from 'react';
import { Project } from '@src/services/api/index';
import { Vehicle } from '@src/services/api/routes/vehicles';
import { AddToProjectModal } from '../employees/employeeProjectsList/AddToProjectModal';
import { usePutVehicle } from '@src/services/api/hooks/vehicles';
import { LoadingView } from '@src/components/loadings/Loading';

export function VehicleProjectsList({ vehicle }: { vehicle: Vehicle }) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = usePutVehicle();

  const projects = vehicle.assigned_project;
  console.log(projects);

  const handleAddProjects = (projects: Project[]) => {
    setIsOpen(false);
    const assignedProjects = projects.map((project) => ({
      project_id: project._id,
      project_name: project.name,
      vehicle_id: vehicle._id,
    }));
    const updatedVehicle = {
      ...vehicle,
      assigned_project: [...vehicle.assigned_project, ...assignedProjects],
    } as Vehicle;

    console.log('it is', updatedVehicle);
    mutate(updatedVehicle);
  };

  const handleRemoveProject = (index: number) => {
    const updatedVehicle = { ...vehicle };
    updatedVehicle.assigned_project.splice(index, 1);
    mutate(updatedVehicle);
  };

  return (
    <>
      <AddToProjectModal
        onAdd={handleAddProjects}
        show={isOpen}
        onClose={() => setIsOpen(false)}
        assignedProjects={vehicle.assigned_project}
      />
      <div className="relative h-full">
        {isPending && <LoadingView />}
        <div className="flex items-center justify-between border-b-2 px-4 py-2 font-semibold">
          <p>Przypisane projekty</p>
          <Button onClick={() => !isPending && setIsOpen(true)} size="xs">
            Dodaj
          </Button>
        </div>
        <ul className="my-2 px-4 [&>*:not(:first-of-type)]:border-t-2">
          {projects.map((project, i) => (
            <li className="flex items-center justify-between py-1" key={project.project_id}>
              <span>{project.project_name}</span>
              <Button size="custom" className="p-1" onClick={() => handleRemoveProject(i)}>
                <XMarkIcon className="h-4 w-4" />
              </Button>
            </li>
          ))}
          {!projects.length && <li className="text-sm text-gray-500">Brak przypisanych projektów.</li>}
        </ul>
      </div>
    </>
  );
}
