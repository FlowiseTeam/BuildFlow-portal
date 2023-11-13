import { Combobox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { Button } from '@src/components/button/Button';
import { Modal } from '@src/components/modal/Modal';
import { Project, updateProject, Employee } from '@src/services/api/index';
import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@src/App';

export function AddEmployeeToProjectModal({
  project,
  allEmployees,
  onClose,
  show,
}: {
  project: Project;
  allEmployees: Employee[];
  onClose: () => void;
  show: boolean;
}) {
  const [selectedEmployees, setSelectedEmployees] = useState<{ name: string; id: number; wasSelected: boolean }[]>([]);
  const [query, setQuery] = useState('');

  const { mutateAsync: onUpdate } = useMutation({
    mutationKey: ['project', project._id],
    mutationFn: (employeeIds: number[]) => {
      const updatedProject = { ...project, employees: [...project.employees, ...employeeIds] } as Project;
      return updateProject(updatedProject);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });

  const employeesByName = useMemo(
    () =>
      allEmployees
        .sort((a, b) => (a.last_name < b.last_name ? 1 : -1))
        .map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          id: employee._id,
          wasSelected: project.employees.includes(employee._id),
        })),
    [allEmployees],
  );

  const filteredEmployees =
    query === ''
      ? employeesByName
      : employeesByName.filter((employee) => employee.name.toLowerCase().trim()!.includes(query.toLowerCase().trim()));

  const removeSelectedEmployee = (index: number) => {
    setSelectedEmployees((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  const handleSubmit = async () => {
    const employeeIds = selectedEmployees.map((employee) => employee.id);
    await onUpdate(employeeIds);
    queryClient.invalidateQueries({ queryKey: ['project', project._id] });
    setSelectedEmployees([]);
    onClose();
  };

  return (
    <Modal className="max-w-sm" onClose={onClose} show={show} title="Dodaj pracowników">
      <Combobox value={selectedEmployees} onChange={setSelectedEmployees} multiple>
        <div>
          <p className="text-sm font-semibold">Wcześniej przypisani:</p>
          <div className="min-h-[3rem]">
            {employeesByName
              .filter((employee) => employee.wasSelected)
              .map((employee) => (
                <span key={employee.id} className="m-1 rounded bg-neutral-100 p-1 px-3 text-xs">
                  {employee.name}
                </span>
              ))}
          </div>
          <p className="text-sm font-semibold">Zaznaczeni:</p>
          <div className="flex min-h-[1rem] flex-wrap items-start">
            {selectedEmployees.map((employee, i) => (
              <span
                key={employee.id}
                onClick={() => removeSelectedEmployee(i)}
                className="m-1 whitespace-nowrap rounded bg-neutral-100 p-1 px-3 text-xs hover:cursor-[url(../../../public/bin-icon.svg),auto]"
              >
                {employee.name}
              </span>
            ))}
          </div>
        </div>
        <div className="relative mb-16 mt-6 rounded-md border-2">
          <Combobox.Input
            placeholder="Wyszukaj pracownika"
            className="w-full rounded-md bg-neutral-100 p-1 text-sm shadow"
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Options className="absolute mt-2 max-h-40 w-full overflow-y-auto rounded bg-white py-1 shadow">
            {filteredEmployees.map((employee) => (
              <Combobox.Option
                disabled={employee.wasSelected}
                className={`${
                  employee.wasSelected
                    ? 'bg-neutral-100 text-gray-400 hover:cursor-not-allowed'
                    : ' hover:cursor-pointer hover:bg-primary/40'
                } relative max-w-full rounded p-1 pl-10`}
                key={employee.id}
                value={employee}
              >
                {({ selected }) => (
                  <>
                    {(selected || employee.wasSelected) && (
                      <CheckIcon className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-primary" />
                    )}
                    <p
                      className={`overflow-hidden text-ellipsis whitespace-nowrap ${selected ? ' font-semibold' : ''}`}
                    >
                      {employee.name}
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
        <Button onClick={handleSubmit} disabled={!(selectedEmployees.length > 0)} variant="primary">
          Dodaj
        </Button>
      </div>
    </Modal>
  );
}
