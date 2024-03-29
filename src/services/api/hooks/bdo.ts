import { useMutation, useQuery } from '@tanstack/react-query';
import {
  KEORecord,
  deleteKpoCard,
  getKeoInfo,
  getKpoCards,
  getKpoInfo,
  postKeoRecord,
  postKpoCard,
} from '../routes/bdo';
import { queryClient } from '@src/App';

export const useKpoInfoQuery = () => {
  return useQuery({
    queryKey: ['bdo-info/kpo'],
    queryFn: getKpoInfo,
  });
};

export const useKpoCardMutation = () => {
  return useMutation({
    mutationFn: (card: any) => postKpoCard(card),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['kpo-cards'] });
    },
  });
};

export const useKpoCardsQuery = () => {
  return useQuery({
    queryKey: ['kpo-cards'],
    queryFn: getKpoCards,
  });
};

export const useKeoInfoQuery = () => useQuery({ queryKey: ['bdo-info/keo'], queryFn: getKeoInfo });

export const useKeoRecordCreate = () => useMutation({ mutationFn: (record: KEORecord) => postKeoRecord(record) });

export const useKeoCardDelete = () =>
  useMutation({
    mutationFn: (id: string | number) => deleteKpoCard(id),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['kpo-cards'] });
    },
  });
