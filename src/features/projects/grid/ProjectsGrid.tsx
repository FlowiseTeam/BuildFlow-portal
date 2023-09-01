import { EditProjectModal } from '@src/features/edit-project/EditProjectModal';
import { useState } from 'react';
import { ProjectGridItem } from './components/ProjectGridItem';
import { Project } from '@src/services/api/index';

export function ProjectsGrid({ projects, refetch }: { projects: Project[]; refetch: () => void }) {
  const [activeProject, setActiveProject] = useState<null | Project>(null);

  return (
    <>
      <EditProjectModal onClose={() => setActiveProject(null)} activeProject={activeProject} refetch={refetch} />
      <div className="grid  gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectGridItem key={project._id} project={project} setActiveProject={setActiveProject} />
        ))}
      </div>
    </>
  );
}
