import { Page } from '@layouts/Page';
import { ErrorBoundary } from '@src/components/queryBoundaries/ErrorBoundary';
import { PageFallback } from '@src/components/queryBoundaries/PageFallback';

function KEOView() {
  return <Page title="Pracownicy">xdd</Page>;
}

export function KEOPage() {
  return (
    <ErrorBoundary fallback={<PageFallback title="KEO" message="Wystąpił błąd" />}>
      <KEOView />
    </ErrorBoundary>
  );
}
