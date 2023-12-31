import { Tab } from '@headlessui/react';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { ProjectResourcesCellsFallback } from './ProjectResourcesCellsFallback';
import { Button } from '@src/components/button/Button';
import { useState } from 'react';
import { AddEmployeeToProjectModal } from './AddEmployeeToProjectModal';
import { TrashIcon } from '@heroicons/react/24/outline';
import { queryClient } from '@src/App';
import { Project, FormProject } from '@src/services/api/index';
import { useEmployeesQuery } from '@src/services/api/hooks/employees';
import { ProjectVehiclesTab } from './ProjectVehiclesTab';
import { AddVehicleToProjectModal } from './AddVehicleToProjectModal';
import { useVehicles } from '@src/services/api/hooks/vehicles';
import { tm } from '@src/lib/tw';

export function ProjectResources({
  className,
  project,
  isEdited,
  onUpdate,
  isDeleting,
}: {
  className?: string;
  project: Project;
  isEdited: boolean;
  onUpdate: UseMutateAsyncFunction<any, unknown, Partial<FormProject>, unknown>;
  isDeleting: boolean;
}) {
  const [tab, setTab] = useState(0);
  const { data, isLoading, isError } = useEmployeesQuery();
  const { data: vehicles } = useVehicles();
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);

  const projectEmployees = data?.employees.filter((e) => project.employees.includes(e._id)) || [];

  const handleDeleteEmployee = async (employeeId: number) => {
    const updatedEmployees = project.employees.filter((id) => employeeId !== id);
    queryClient.setQueryData(['project', project._id], { ...project, employees: updatedEmployees });
    onUpdate({ ...project, employees: updatedEmployees });
  };

  return (
    <>
      <AddEmployeeToProjectModal
        show={isAddEmployeeModalOpen}
        project={project}
        allEmployees={data?.employees || []}
        onClose={() => setIsAddEmployeeModalOpen(false)}
      />
      <AddVehicleToProjectModal
        show={isAddVehicleModalOpen}
        project={project}
        allVehicles={vehicles?.vehicles || []}
        onClose={() => setIsAddVehicleModalOpen(false)}
      />

      <div className={`${className}`}>
        <Tab.Group onChange={setTab}>
          <Tab.List className="flex  justify-between bg-stone-200/75 p-1 pb-0">
            <div>
              <Tab
                className={({ selected }) =>
                  ` rounded-[16px] rounded-b-none px-2 py-2 text-sm font-medium leading-5 ${selected ? 'bg-white' : ''}`
                }
              >
                Pracownicy
              </Tab>
              <Tab
                className={({ selected }) =>
                  ` rounded-[16px] rounded-b-none px-2 py-2 text-sm font-medium leading-5 ${selected ? 'bg-white' : ''}`
                }
              >
                Pojazdy
              </Tab>
            </div>
            <div className="mt-[2px]">
              {!isLoading && (
                <Button
                  onClick={() => {
                    tab === 0 && setIsAddEmployeeModalOpen(true);
                    tab === 1 && setIsAddVehicleModalOpen(true);
                  }}
                  size="xs"
                >
                  Dodaj
                </Button>
              )}
            </div>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="my-4 grid max-h-[20rem] auto-rows-auto overflow-y-auto [&>*:not(:first-of-type)]:border-t-2">
              {isLoading && <ProjectResourcesCellsFallback />}
              {isError && (
                <p className="text-center text-sm italic text-gray-700">Nie udało się pobrać listy pracowników</p>
              )}
              {projectEmployees.map((employee) => (
                <div key={employee._id} className="mx-4 flex justify-between py-1">
                  <p>{`${employee.first_name} ${employee.last_name}`}</p>
                  <div>
                    <span className="basis-1/4">{employee.role}</span>
                    {isEdited && (
                      <Button
                        className="text-red ml-4 inline p-1"
                        size="custom"
                        onClick={() => handleDeleteEmployee(employee._id)}
                        disabled={isDeleting}
                      >
                        <TrashIcon
                          className={tm(
                            'h-4 w-4 cursor-pointer text-neutral-500',
                            isDeleting && 'bg-neutral-200 text-gray-400',
                          )}
                        />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </Tab.Panel>
            <Tab.Panel className="my-4 grid max-h-[20rem] auto-rows-auto overflow-y-auto [&>*:not(:first-of-type)]:border-t-2">
              <ProjectVehiclesTab project={project} isEdited={isEdited} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}
