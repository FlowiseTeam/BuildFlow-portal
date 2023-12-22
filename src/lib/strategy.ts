import { UseQueryResult } from '@tanstack/react-query';

type States<T> = { loading: React.ReactNode; exists: (data: T) => React.ReactNode };

export function strategy<T, Error>(queryResult: UseQueryResult<T, Error>, states: States<T>) {
  if (queryResult.isLoading) {
    return states.loading;
  }
  if (queryResult.data) {
    return states.exists(queryResult.data);
  }
  return states.loading;
}
