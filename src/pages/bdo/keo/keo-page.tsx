import { Page } from '@layouts/Page';
import { Button } from '@src/components/button/Button';
import { ErrorBoundary } from '@src/components/queryBoundaries/ErrorBoundary';
import { PageFallback } from '@src/components/queryBoundaries/PageFallback';
import { useNavigate } from 'react-router-dom';

function KEOView() {
  const navigate = useNavigate();

  return (
    <Page title="KEO">
      <div className="mt-16">
        <div className="my-12">
          <p className="mb-4">
            <strong>Łączna masa wytworzonych odpadów:</strong> 27,64t
          </p>
          <p>W tym</p>
          <p>
            <strong>W wyniku świadczenia usług i/lub działalności w zakresie obiektów liniowych:</strong> 27,64t
          </p>
        </div>

        <Button variant="primary" onClick={() => navigate('add')}>
          Dodaj nowy wpis do karty
        </Button>
      </div>
    </Page>
  );
}

export function KEOPage() {
  return (
    <ErrorBoundary fallback={<PageFallback title="KEO" message="Wystąpił błąd" />}>
      <KEOView />
    </ErrorBoundary>
  );
}
