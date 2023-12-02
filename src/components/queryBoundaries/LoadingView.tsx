import { Page } from '@src/layouts/Page';
import { Suspense } from 'react';

export function LoadingView() {
  return (
    <Page>
      <div className="flex h-full w-full items-center justify-center">
        <div className="loading-cell">
          <div className="loading-fade"></div>
        </div>
      </div>
    </Page>
  );
}

export function LoadingPageSuspense({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingView />}>{children}</Suspense>;
}
