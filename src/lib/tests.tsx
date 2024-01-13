import { fireEvent as fireEventFn, render as renderFn } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export { renderFn as render, fireEventFn as fireEvent };

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
