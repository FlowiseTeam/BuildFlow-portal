import { useQuery } from 'react-query';
import { getProjects } from '@services/api';
import { Page } from '@layouts/Page';
import { Project } from '@data/types';
import { ArrowsUpDownIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { Modal } from '@components/modal/Modal';
import { AddProject } from '@features/add-project/AddProject';

export function ProjectsPage() {
  const { data } = useQuery<Project[]>('projects', getProjects, { suspense: true });
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const activeProject = data?.find((project) => project.id === activeProjectId);

  if (!data) {
    return <div>Something went wrong</div>;
  }

  return (
    <Page title="Projekty">
      <Modal title="project" show={!!activeProject} onClose={() => setActiveProjectId(null)}>
        <div>xd</div>
      </Modal>
      <AddProject show={isAddProjectModalOpen} onClose={() => setIsAddProjectModalOpen(false)} />
      <div className="flex flex-col mt-8">
        <div className="flex justify-between">
          <button>szukaj</button>
          <button onClick={() => setIsAddProjectModalOpen(true)}>dodaj projekt</button>
        </div>
        <div className="ml-auto">lista / kafelki</div>
        <div>
          <table className="w-full text-sm text-left  dark:text-gray-400 font-roboto ">
            <thead className="text-xs  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nazwa
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Adres
                    <ArrowsUpDownIcon className="w-3 h-3 ml-2" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  <div className="flex items-center justify-center">
                    Termin rozp.
                    <ArrowsUpDownIcon className="w-3 h-3 ml-2" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  <div className="flex items-center justify-center">
                    Termin ukoń.
                    <ArrowsUpDownIcon className="w-3 h-3 ml-2" />
                  </div>
                </th>
                <th scope="col" className=" py-3 text-center">
                  Ilość prac
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Status
                </th>
                <th className="sr-only">edytuj</th>
              </tr>
            </thead>
            <tbody className="[&>*:nth-child(2n)]:bg-neutral-100 text-gray-700">
              {data.map((project) => (
                <tr className="px-6 py-4" key={project.id}>
                  <th className="px-6 py-4" scope="row">
                    {project.title}
                  </th>
                  <td className="px-6 py-4">{project.address}</td>
                  <td className="text-center px-6 py-4">{project.startDate}</td>
                  <td className="text-center px-6 py-4">{project.endDate}</td>
                  <td className="text-center px-6 py-4">{project.tasks}</td>
                  <td className="text-center px-6 py-4">{project.status}</td>
                  <td>
                    <button onClick={() => setActiveProjectId(project.id)}>edytuj</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}
