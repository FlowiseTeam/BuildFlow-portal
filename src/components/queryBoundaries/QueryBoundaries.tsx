import { Suspense } from 'react';
import { QueryErrorResetBoundary } from 'react-query';
import { LoadingView } from './LoadingView';
import { ErrorBoundary } from './ErrorBoundary';

export const QueryBoundaries = ({ children }: { children: React.ReactNode }) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary onReset={reset}>
        <Suspense fallback={<LoadingView />}>{children}</Suspense>
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);
