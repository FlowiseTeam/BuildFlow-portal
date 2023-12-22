import { useMutation, useQuery } from '@tanstack/react-query';
import { KEORecord, getKeoInfo, getKpoCards, getKpoInfo, postKeoRecord, postKpoCard } from '../routes/bdo';

export const useKpoInfoQuery = () => {
  return useQuery({
    queryKey: ['bdo-info/kpo'],
    queryFn: getKpoInfo,
  });
};

export const useKpoCardMutation = () => {
  return useMutation({
    mutationFn: (card: any) => postKpoCard(card),
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
