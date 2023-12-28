import { Page } from '@layouts/Page';
import { LoadingSpace } from '@src/components/loadings/Loading';
import { ErrorBoundary } from '@src/components/queryBoundaries/ErrorBoundary';
import { PageFallback } from '@src/components/queryBoundaries/PageFallback';
import { KEOForm } from '@src/features/bdo/keo/KEOForm';
import { useKeoInfoQuery, useKeoRecordCreate } from '@src/services/api/hooks/bdo';
import { KEORecord } from '@src/services/api/routes/bdo';
import { useNavigate } from 'react-router-dom';

function KEOAdd() {
  const { data } = useKeoInfoQuery();
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
          {state(data).behave({
            exists: (keoInfo) => <KEOForm handleFormSubmit={onSubmit} keoInfo={keoInfo} />,
            pending: <LoadingSpace />,
          })}
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

class FetchState<T> {
  #data: T;

  constructor(data: T) {
    this.#data = data;
  }

  #isNotUndefined() {
    return typeof this.#data !== 'undefined' && this.#data !== null;
  }

  public behave({ exists, pending }: { exists: (data: NonNullable<T>) => React.ReactNode; pending: React.ReactNode }) {
    if (this.#isNotUndefined()) {
      return exists(this.#data!);
    }
    return pending;
  }
}

function state<T>(data: T) {
  return new FetchState(data);
}
