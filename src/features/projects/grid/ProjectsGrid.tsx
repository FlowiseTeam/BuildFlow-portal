import { CalendarDaysIcon, TruckIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Button } from '@src/components/button/Button';
import { FallbackMap } from '@src/components/fallbackMap/FallbackMap';
import { EditProjectModal } from '@src/features/edit-project/EditProjectModal';
import { Project } from '@src/services/api-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const statusButtonStyles = {
  Zawieszony: 'bg-red-400 hover:bg-red-500',
  'W trakcie': 'bg-yellow-300 hover:bg-yellow-400',
  Zakończony: 'bg-green-400 hover:bg-green-500',
};

export function ProjectsGrid({ projects, refetch }: { projects: Project[]; refetch: () => void }) {
  const [activeProject, setActiveProject] = useState<null | Project>(null);
  const navigate = useNavigate();

  return (
    <>
      <EditProjectModal onClose={() => setActiveProject(null)} activeProject={activeProject} refetch={refetch} />
      <div className="grid  gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <div key={project._id} className="flex flex-col overflow-hidden rounded-xl shadow">
            <div className="map-wrapper relative">
              <Button
                onClick={() => setActiveProject(project)}
                size="xs"
                variant="none"
                className={`absolute ml-2 mt-2 ${statusButtonStyles[project.status]}`}
              >
                {project.status}
              </Button>
              <div className="h-80">
                <FallbackMap />
              </div>
            </div>
            <div
              onClick={() => navigate(String(project._id))}
              className="flex flex-grow items-center bg-neutral-100  px-4 py-2 text-sm hover:cursor-pointer"
            >
              <div className="flex-grow ">
                <p>{`${project.street},`}</p>
                <p>{project.city}</p>
              </div>
              <div className="text-center">
                <UserGroupIcon className="mx-auto h-6 w-full" />
                <p>{project.employees.length}</p>
              </div>
              <div className="ml-6 text-center">
                <TruckIcon className="mx-auto h-6 w-full" />
                {/* TODO: add vehicles */}
                <p>{0}</p>
              </div>
              <div className="ml-6">
                <CalendarDaysIcon className="mx-auto h-6 w-full" />
                <p>{new Date(project.end_date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
