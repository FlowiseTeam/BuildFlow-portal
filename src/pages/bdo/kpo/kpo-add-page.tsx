import { Page } from '@layouts/Page';
import { LoadingSpace } from '@src/components/loadings/Loading';
import { ErrorBoundary } from '@src/components/queryBoundaries/ErrorBoundary';
import { PageFallback } from '@src/components/queryBoundaries/PageFallback';
import { KPOForm } from '@src/features/bdo/kpo/KPOForm';
import { strategy } from '@src/lib/strategy';
import { useKpoInfoQuery } from '@src/services/api/hooks/bdo';
import { noop } from 'lodash';

function KPOAdd() {
  const { data: kpoInfo, isLoading, isError } = useKpoInfoQuery();

  return (
    <Page title="KPO">
      <div className="mt-16">
        <div className="mx-auto max-w-4xl">
          {strategy(
            { data: kpoInfo, isLoading, isError },
            {
              loading: <LoadingSpace />,
              error: <p className="text-center text-red-600">Wystąpił błąd.</p>,
              exists: (data) => <KPOForm kpoInfo={data} handleFormSubmit={noop} isLoading={false} />,
            },
          )}
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
