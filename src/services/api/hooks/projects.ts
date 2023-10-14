import { getLatestComments, getProject, getProjectComments } from '@src/services/api';
import { useQuery } from 'react-query';

export function useProjectComments(projectId: number) {
  return useQuery(['project-messages', projectId], () => getProjectComments(projectId));
}

export function useProjects(projectId: number) {
  return useQuery(['projects', projectId], () => getProject(projectId));
}

export function useLatestProjectComments() {
  return useQuery(['project-comments', 'latest'], getLatestComments);
}
