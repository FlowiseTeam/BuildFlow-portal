type States<T> = {
  loading: React.ReactNode;
  exists: (data: NonNullable<T>) => React.ReactNode;
  error?: React.ReactNode;
};

type Props<T> = {
  data: T;
  isLoading: boolean;
  isError?: boolean;
};

export function strategy<T>(props: Props<T>, states: States<T>) {
  if (props.isError) {
    return states.error;
  }
  if (props.isLoading) {
    return states.loading;
  }
  if (props.data) {
    return states.exists(props.data);
  }

  return states.loading;
}
