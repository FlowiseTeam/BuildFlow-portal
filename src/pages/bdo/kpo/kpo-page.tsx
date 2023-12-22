import { Page } from '@layouts/Page';
import { Button } from '@src/components/button/Button';
import { ErrorBoundary } from '@src/components/queryBoundaries/ErrorBoundary';
import { PageFallback } from '@src/components/queryBoundaries/PageFallback';
import { KPOCardsTableContainer } from '@src/features/bdo/kpo/CardsTable';
import { useNavigate } from 'react-router-dom';

function KPOView() {
  const navigate = useNavigate();

  return (
    <Page title="KPO">
      <div className="mt-16">
        <Button variant="primary" onClick={() => navigate('add')}>
          Dodaj kartę
        </Button>
        <div className="mt-12">
          <KPOCardsTableContainer />
        </div>
      </div>
    </Page>
  );
}

export function KPOPage() {
  return (
    <ErrorBoundary fallback={<PageFallback title="KPO" message="Wystąpił błąd" />}>
      <KPOView />
    </ErrorBoundary>
  );
}
