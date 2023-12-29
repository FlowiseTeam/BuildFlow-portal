import axios from 'axios';
import { PROJECTS_API_URL, imagesApi, projectsAxiosApi } from '..';

export interface Comment {
  created_at: string;
  images: { url: string }[];
  message: string;
  project_id: number;
  status: string;
  updated_at: string;
  _id: number;
}

export interface CommentsQuery {
  comments: Comment[];
  comments_count: number;
}

export const getProjectComments = async (projectId: number): Promise<CommentsQuery> =>
  (await projectsAxiosApi.get(`/projects/${projectId}/comments`)).data;

export const getLatestComments = async (): Promise<Comment[]> =>
  (await projectsAxiosApi.get('/projects/comments/latest')).data;

export const getImage = () => async (url: string) => await imagesApi.get(url);

export const createComment = async (projectId: number, commentData: FormData) =>
  projectsAxiosApi.post(`${PROJECTS_API_URL}/projects/${projectId}/comments`, commentData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
// axios({
//   method: 'post',
//   url: `${PROJECTS_API_URL}/projects/${projectId}/comments`,
//   data: commentData,
//   headers: { 'Content-Type': 'multipart/form-data' },
// });

export const deleteComment = (projectId: number, commentId: number) =>
  projectsAxiosApi.delete(`projects/${projectId}/comments/${commentId}`);
