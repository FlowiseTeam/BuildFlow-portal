import { DetailCard } from '@components/detailCard/DetailCard';
import { FallbackMap } from '@components/fallbackMap/FallbackMap';
import { ProjectChat } from '@features/projectChat/ProjectChat';
import { ProjectForm } from '@features/projectForm/ProjectForm';
import { ProjectResources } from '@features/projectResources/ProjectResources';
import { Page } from '@layouts/Page';
import { getProject, updateProject } from '@services/api';
import { FormProject, Project } from '@services/api-types';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ProjectHeader } from '@features/projectHeader/ProjectHeader';

export function ProjectPage() {
  const id = useParams<{ id: string }>().id;
  if (!id) {
    throw new Error('Project id is not defined');
  }

  const { data: project } = useQuery(['project', id], () => getProject(id), {
    suspense: true,
  });

  if (!project) {
    throw new Error('Something went wrong');
  }

  const { mutateAsync } = useMutation(['project', id], (project: Project) => updateProject(project));

  async function onUpdate(formData: FormProject) {
    const updatedProject = { ...project, ...formData } as Project;
    try {
      await mutateAsync(updatedProject);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Page header={<ProjectHeader title={project.name} projectId={project._id} />}>
      <div className="mb-16 mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <DetailCard className="p-2 md:col-span-3 lg:col-span-3">
          <ProjectForm project={project} handleFormSubmit={onUpdate} />
        </DetailCard>
        <DetailCard className="row-span-2 md:col-start-3 md:row-start-3 xl:col-start-auto xl:row-start-auto">
          <ProjectChat />
        </DetailCard>
        <DetailCard className="min-h-[6rem] sm:col-span-2 lg:col-span-3 xl:col-span-2">
          <ProjectResources categories={{ Pracownicy: project.workers, Pojazdy: [] }} />
        </DetailCard>
        <DetailCard className="sm:col-span-1">
          <FallbackMap />
        </DetailCard>
      </div>
    </Page>
  );
}
