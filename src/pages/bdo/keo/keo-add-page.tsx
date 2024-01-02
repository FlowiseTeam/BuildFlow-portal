import { Page } from '@layouts/Page';
import { LoadingSpace } from '@src/components/loadings/Loading';
import { ErrorBoundary } from '@src/components/queryBoundaries/ErrorBoundary';
import { PageFallback } from '@src/components/queryBoundaries/PageFallback';
import { KEOForm } from '@src/features/bdo/keo/KEOForm';
import { strategy } from '@src/lib/strategy';
import { useKeoInfoQuery, useKeoRecordCreate } from '@src/services/api/hooks/bdo';
import { KEORecord } from '@src/services/api/routes/bdo';
import { useNavigate } from 'react-router-dom';

function KEOAdd() {
  const { data, isLoading, isError } = useKeoInfoQuery();
  const { mutate } = useKeoRecordCreate();
  const navigate = useNavigate();

  function onSubmit(record: KEORecord) {
    mutate(record);
    navigate('..');
  }

  return (
    <Page title="KEO">
      <div className="mt-16">
        <div className="mx-auto max-w-4xl">
          {strategy(
            { data, isLoading, isError },
            {
              exists: (data) => <KEOForm handleFormSubmit={onSubmit} keoInfo={data} />,
              loading: <LoadingSpace />,
              error: <p className="text-center text-red-600">Wystąpił błąd.</p>,
            },
          )}
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
