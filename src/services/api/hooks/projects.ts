import { queryClient } from '@src/App';
import {
  FormProject,
  Project,
  deleteProject,
  getLatestComments,
  getProject,
  getProjectComments,
  getProjects,
  updateProject,
} from '@src/services/api';
import { useQuery, useSuspenseQuery, useMutation } from '@tanstack/react-query';

export function useProjectsSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const data = await getProjects();

      data.projects.forEach((project) => {
        queryClient.setQueryData(['project', project._id], project);
      });

      return data;
    },
  });
}

export function useProjectsQuery() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const data = await getProjects();

      data.projects.forEach((project) => {
        queryClient.setQueryData(['project', project._id], project);
      });

      return data;
    },
  });
}

export function useProjectQuery(id: number) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => getProject(id),
  });
}

export function useProjectSuspenseQuery(id: number) {
  return useSuspenseQuery({
    queryKey: ['project', id],
    queryFn: () => getProject(id),
  });
}

export function useProjectMutation(id: number) {
  return useMutation({ mutationKey: ['project', id], mutationFn: (project: Project) => updateProject(project) });
}

export function useProjectDeleteMutation(id: number) {
  return useMutation({
    mutationKey: ['project', id],
    mutationFn: () => deleteProject(id),
    onSuccess: () => {
      queryClient.resetQueries;
    },
  });
}

export function useProjectUpdateMutation(id: number) {
  return useMutation({
    mutationKey: ['project', id],
    mutationFn: ({ project, formData }: { project: any; formData: Partial<FormProject> }) => {
      const updatedProject = { ...project, ...formData } as Project;
      return updateProject(updatedProject);
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ['project', id] });
      queryClient.resetQueries({ queryKey: ['project-messages', id] });
    },
  });
}

export function useProjectComments(projectId: number) {
  return useQuery({ queryKey: ['project-messages', projectId], queryFn: () => getProjectComments(projectId) });
}

export function useLatestProjectComments() {
  return useQuery({ queryKey: ['project-comments', 'latest'], queryFn: getLatestComments });
}
