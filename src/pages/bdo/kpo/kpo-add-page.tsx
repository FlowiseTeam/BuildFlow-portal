import { Page } from '@layouts/Page';
import { ErrorBoundary } from '@src/components/queryBoundaries/ErrorBoundary';
import { PageFallback } from '@src/components/queryBoundaries/PageFallback';
import { KPOForm } from '@src/features/bdo/kpo/KPOForm';
import { useKpoInfoQuery } from '@src/services/api/hooks/bdo';
import { noop } from 'lodash';

function KPOAdd() {
  const { data: kpoInfo, isLoading } = useKpoInfoQuery();

  return (
    <Page title="KPO">
      <div className="mt-16">
        <div className="mx-auto max-w-4xl">
          <KPOForm isLoading={isLoading} kpoInfo={kpoInfo} handleFormSubmit={noop} />
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
