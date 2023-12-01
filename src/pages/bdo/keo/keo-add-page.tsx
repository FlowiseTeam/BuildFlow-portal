import { Page } from '@layouts/Page';
import { ErrorBoundary } from '@src/components/queryBoundaries/ErrorBoundary';
import { PageFallback } from '@src/components/queryBoundaries/PageFallback';
import { KEOForm } from '@src/features/bdo/keo/KEOForm';
import { noop } from 'lodash';

function KEOAdd() {
  return (
    <Page title="KEO">
      <div className="mt-16">
        <div className="mx-auto max-w-4xl">
          <KEOForm handleFormSubmit={noop} />
        </div>
      </div>
    </Page>
  );
}

export function KEOAddPage() {
  return (
    <ErrorBoundary fallback={<PageFallback title="KEO" message="Wystąpił błąd" />}>
      <KEOAdd />
    </ErrorBoundary>
  );
}
