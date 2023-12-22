type States<T> = { loading: React.ReactNode; exists: (data: NonNullable<T>) => React.ReactNode };

export function strategy<T>(data: T, isLoading: boolean, states: States<T>) {
  if (isLoading) {
    return states.loading;
  }
  if (data) {
    return states.exists(data);
  }
  return states.loading;
}
