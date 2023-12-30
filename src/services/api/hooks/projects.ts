import { queryClient } from '@src/App';
import {
  FormProject,
  Project,
  createProject,
  deleteProject,
  getLatestComments,
  getProject,
  getProjectComments,
  getProjects,
  updateProject,
} from '@src/services/api';
import { useQuery, useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { deleteComment } from '../routes/comments';

export const PROJECT = 'PROJECT';
export const PROJECTS = 'PROJECTS';
export const PROJECT_COMMENTS = 'PROJECT_COMMENTS';
export const LATEST = 'LATEST';

export function useProjectsSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: [PROJECTS],
    queryFn: async () => {
      const data = await getProjects();

      data.projects.forEach((project) => {
        queryClient.setQueryData([PROJECT, project._id], project);
      });

      return data;
    },
  });
}

export function useProjectsQuery() {
  return useQuery({
    queryKey: [PROJECTS],
    queryFn: async () => {
      const data = await getProjects();

      data.projects.forEach((project) => {
        queryClient.setQueryData([PROJECT, project._id], project);
      });

      return data;
    },
  });
}

export function useProjectQuery(id: number) {
  return useQuery({
    queryKey: [PROJECT, id],
    queryFn: () => getProject(id),
  });
}

export function useProjectSuspenseQuery(id: number) {
  return useSuspenseQuery({
    queryKey: [PROJECT, id],
    queryFn: () => getProject(id),
  });
}

export function useProjectMutation(id: number) {
  return useMutation({
    mutationKey: [PROJECT, id],
    mutationFn: (project: Project) => updateProject(project),
    onSuccess: () => queryClient.refetchQueries({ queryKey: [PROJECT, id] }),
  });
}

export function useProjectCreate() {
  return useMutation({ mutationFn: (project: FormProject) => createProject(project) });
}

export function useProjectDeleteMutation(id: number) {
  return useMutation({
    mutationKey: [PROJECT, id],
    mutationFn: () => deleteProject(id),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: [PROJECT, id] });
    },
  });
}

export function useProjectUpdateMutation(id: number) {
  return useMutation({
    mutationKey: [PROJECT, id],
    mutationFn: ({ project, formData }: { project: any; formData: Partial<FormProject> }) => {
      const updatedProject = { ...project, ...formData } as Project;
      return updateProject(updatedProject);
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: [PROJECT, id] });
      queryClient.resetQueries({ queryKey: [PROJECT_COMMENTS, id] });
    },
  });
}

export function useProjectComments(projectId: number) {
  return useQuery({ queryKey: [PROJECT_COMMENTS, projectId], queryFn: () => getProjectComments(projectId) });
}

export function useLatestProjectComments() {
  return useQuery({ queryKey: [PROJECT_COMMENTS, LATEST], queryFn: getLatestComments });
}

export function useDeleteComment(projectId: number, commentId: number) {
  return useMutation({
    mutationKey: [PROJECT_COMMENTS, projectId],
    mutationFn: () => deleteComment(projectId, commentId),
    onSuccess: () => {
      const comments = queryClient.getQueryData([PROJECT_COMMENTS, projectId]).comments;
      const filteredComments = comments.filter((msg) => msg._id !== commentId);
      queryClient.setQueryData([PROJECT_COMMENTS, projectId], {
        comments_count: filteredComments.length,
        comments: filteredComments,
      });
      queryClient.invalidateQueries({ queryKey: [PROJECT_COMMENTS, projectId] });
    },
  });
}
