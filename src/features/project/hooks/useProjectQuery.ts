import { queryClient } from '@src/main';
import { getProject, updateProject, deleteProject } from '@src/services/api';
import { FormProject, Project } from '@src/services/api-types';
import { useQuery, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export function useProjectQuery(id: number) {
  const navigate = useNavigate();

  const { data: project } = useQuery(['project', id], () => getProject(id), {
    suspense: true,
  });

  if (!project) {
    throw new Error('Something went wrong');
  }

  const { mutateAsync: onUpdate } = useMutation(
    ['project', id],
    (formData: Partial<FormProject>) => {
      const updatedProject = { ...project, ...formData } as Project;
      return updateProject(updatedProject);
    },
    {
      onSuccess: (_, project) => {
        queryClient.setQueryData(['project', id], project);
      },
    },
  );

  const { mutateAsync: onDelete } = useMutation(['project', id], () => deleteProject(Number(id)), {
    onSuccess: () => {
      queryClient.resetQueries(['project', id]);
      queryClient.resetQueries(['project-messages', id]);
      navigate('/app/projects');
    },
  });

  return { project, onUpdate, onDelete };
}
