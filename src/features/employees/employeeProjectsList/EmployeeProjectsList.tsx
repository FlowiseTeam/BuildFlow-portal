import { XMarkIcon } from '@heroicons/react/20/solid';
import { Button } from '@src/components/button/Button';
import { useState } from 'react';
import { AddToProjectModal } from './AddToProjectModal';
import { queryClient } from '@src/App';
import { Employee, updateEmployee, Project } from '@src/services/api/index';

export function EmployeeProjectsList({ employee, isEdited }: { employee: Employee; isEdited: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddProjects = async (projects: Project[]) => {
    setIsOpen(false);
    const addedProjects = projects.map((project) => ({
      project_id: project._id,
      project_name: project.name,
      employee_id: employee._id,
    }));
    const updatedEmployee = { ...employee, assigned_project: [...employee.assigned_project, ...addedProjects] };
    try {
      await updateEmployee(updatedEmployee);
      queryClient.setQueryData(['employee', employee._id], updatedEmployee);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveProject = (index: number) => {
    const updatedEmployee = { ...employee };
    updatedEmployee.assigned_project.splice(index, 1);
    updateEmployee(updatedEmployee);
    queryClient.setQueryData(['employee', employee._id], updatedEmployee);
  };

  const xd = employee.assigned_project || [];

  return (
    <>
      <AddToProjectModal
        onAdd={handleAddProjects}
        show={isOpen}
        onClose={() => setIsOpen(false)}
        assignedProjects={employee.assigned_project || []}
      />
      <div>
        <header className="flex items-center justify-between border-b-2 px-4 py-2 font-semibold">
          <p>Przypisane projekty</p>
          <Button onClick={() => setIsOpen(true)} size="xs">
            Dodaj
          </Button>
        </header>
        <ul className="my-2 px-4 [&>*:not(:first-of-type)]:border-t-2">
          {xd.map((project, i) => (
            <li className="flex items-center justify-between py-1" key={project.project_id}>
              <span>{project.project_name}</span>
              {isEdited && (
                <Button size="custom" className="p-1" onClick={() => handleRemoveProject(i)}>
                  <XMarkIcon className="h-4 w-4" />
                </Button>
              )}
            </li>
          ))}
          {!xd && <li className="text-gray-500">Brak uprawnień.</li>}
        </ul>
      </div>
    </>
  );
}
