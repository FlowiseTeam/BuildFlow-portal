import { Listbox } from '@headlessui/react';
import { Button } from '@src/components/button/Button';
import { Modal } from '@src/components/modal/Modal';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { CheckIcon } from '@heroicons/react/20/solid';
import { Project, getProjects } from '@src/services/api/index';

interface AddToProjectModalProps {
  show: boolean;
  onClose: () => void;
  onAdd: (projects: Project[]) => void;
  assignedProjects: any;
}

export function AddToProjectModal({ show, onClose, onAdd, assignedProjects }: AddToProjectModalProps) {
  const { data } = useQuery(['projects'], () => getProjects());
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);

  const assignedProjectIds = assignedProjects.map((project) => project.project_id);
  const unassignedProjects = data?.projects.filter((project) => !assignedProjectIds.includes(project._id));

  const handleDeleteProject = (index: number) => {
    setSelectedProjects((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    setSelectedProjects([]);
    onAdd(selectedProjects);
  };

  const closeModal = () => {
    setSelectedProjects([]);
    onClose();
  };

  return (
    <Modal title="Przypisz do projektu" show={show} onClose={closeModal} maxW="max-w-[32rem]">
      <div>
        <p className="text-sm font-semibold">Dopisano do:</p>
        <ul className="flex min-h-[2rem] flex-wrap items-start">
          {selectedProjects.map((project, index) => (
            <li
              key={project._id}
              onClick={() => handleDeleteProject(index)}
              className="m-1 whitespace-nowrap rounded bg-neutral-100 p-1 px-3 text-xs hover:cursor-[url(../../../public/bin-icon.svg),auto]"
            >
              {project.name}
            </li>
          ))}
        </ul>
      </div>
      <Listbox value={selectedProjects} onChange={setSelectedProjects} multiple>
        <div className="relative mx-auto">
          <Listbox.Button className="w-full" as="div">
            <Button className="w-full whitespace-nowrap">Wybierz projekty</Button>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-2 max-h-64 w-full overflow-y-scroll rounded bg-white py-1 shadow">
            {unassignedProjects?.map((project) => (
              <Listbox.Option value={project} key={project._id} className="relative">
                {({ selected }) => (
                  <>
                    {selected && (
                      <CheckIcon className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-primary" />
                    )}
                    <p
                      className={`relative px-1 py-1 pl-10 hover:cursor-pointer hover:bg-black/10 ${
                        selected ? 'bg-primary-light/40' : ''
                      }`}
                    >
                      {project.name}
                    </p>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
      <div className="mt-6 w-full text-right">
        <Button className="mr-4" onClick={closeModal}>
          Anuluj
        </Button>
        <Button variant="primary" onClick={handleAdd} disabled={selectedProjects.length < 1}>
          Dodaj
        </Button>
      </div>
    </Modal>
  );
}
