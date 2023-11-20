import { Page } from '@layouts/Page';
import { ErrorBoundary } from '@src/components/queryBoundaries/ErrorBoundary';
import { PageFallback } from '@src/components/queryBoundaries/PageFallback';
import { KPOForm } from '@src/features/bdo/kpo/KPOForm';
import { Project } from '@src/services/api';

function KPOAdd() {
  return (
    <Page title="KPO">
      <div className="mt-16">
        <div className="mx-auto max-w-4xl">
          <KPOForm
            handleFormSubmit={function (project: Project): Promise<void> {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
      </div>
    </Page>
  );
}

export function KPOAddPage() {
  return (
    <ErrorBoundary fallback={<PageFallback title="KPO" message="Wystąpił błąd" />}>
      <KPOAdd />
    </ErrorBoundary>
  );
}
