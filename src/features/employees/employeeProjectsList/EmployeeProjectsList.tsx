import { XMarkIcon } from '@heroicons/react/20/solid';
import { Button } from '@src/components/button/Button';
import { useState } from 'react';
import { AddToProjectModal } from './AddToProjectModal';
import { queryClient } from '@src/App';
import { Employee, updateEmployee, Project } from '@src/services/api/index';
import { useEmployeeMutation } from '@src/services/api/hooks/employees';
import { LoadingView } from '@src/components/loadings/Loading';

export function EmployeeProjectsList({ employee, isEdited }: { employee: Employee; isEdited: boolean }) {
  const { mutateAsync, isPending } = useEmployeeMutation(employee._id);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddProjects = async (projects: Project[]) => {
    setIsOpen(false);
    const addedProjects = projects.map((project) => ({
      project_id: project._id,
      project_name: project.name,
      employee_id: employee._id,
    }));
    const updatedEmployee = {
      ...employee,
      assigned_project: [...employee.assigned_project, ...addedProjects],
    } as Employee;
    mutateAsync(updatedEmployee);
  };

  const handleRemoveProject = (index: number) => {
    const updatedEmployee = { ...employee };
    updatedEmployee.assigned_project.splice(index, 1);
    mutateAsync(updatedEmployee);
  };

  const { assigned_project } = employee;

  return (
    <>
      <AddToProjectModal
        onAdd={handleAddProjects}
        show={isOpen}
        onClose={() => setIsOpen(false)}
        assignedProjects={assigned_project}
      />
      <div className="relative">
        {isPending && <LoadingView />}
        <header className="flex items-center justify-between border-b-2 px-4 py-2 font-semibold">
          <p>Przypisane projekty</p>
          <Button onClick={() => setIsOpen(true)} size="xs">
            Dodaj
          </Button>
        </header>
        <EmployeeProjects projects={assigned_project} onRemove={handleRemoveProject} isEdited={isEdited} />
      </div>
    </>
  );
}

function EmployeeProjects({ projects, onRemove, isEdited }) {
  return (
    <ul className="my-2 px-4 [&>*:not(:first-of-type)]:border-t-2">
      {projects.map((project, i) => (
        <li className="flex items-center justify-between py-1" key={project.project_id}>
          <span>{project.project_name}</span>
          {isEdited && (
            <Button size="custom" className="p-1" onClick={() => onRemove(i)}>
              <XMarkIcon className="h-4 w-4" />
            </Button>
          )}
        </li>
      ))}
      {projects.length === 0 && <li className="text-gray-500">Brak przypisanych projektów.</li>}
    </ul>
  );
}
