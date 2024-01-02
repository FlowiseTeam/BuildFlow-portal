import { Page } from '@layouts/Page';
import { Button } from '@src/components/button/Button';
import { LoadingIconInline, LoadingSpace } from '@src/components/loadings/Loading';
import { ErrorBoundary } from '@src/components/queryBoundaries/ErrorBoundary';
import { PageFallback } from '@src/components/queryBoundaries/PageFallback';
import { KEORecordsTable } from '@src/features/bdo/keo/KEORecordsTable';
import { strategy } from '@src/lib/strategy';
import { useKeoRecords } from '@src/services/api/hooks/bdo';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function KEOView() {
  const { data, isLoading } = useKeoRecords();
  const navigate = useNavigate();

  const [totalMass, setTotalMass] = useState<null | number>(null);
  const [totalMassExcluding, setTotalMassExcluding] = useState<null | number>(null);

  useEffect(() => {
    if (data) {
      const mass = data.reduce((acc, cur) => acc + +cur.WasteMassInstallation, 0);
      setTotalMass(mass);
      const massExcluding = data.reduce((acc, cur) => acc + +cur.WasteMassExcludingInstallation, 0);
      setTotalMassExcluding(massExcluding);
    }
  }, [data]);

  return (
    <Page title="KEO">
      <div className="mt-16">
        <div className="my-12">
          <p className="mb-4">
            <strong>Łączna masa wytworzonych odpadów:</strong>
            {totalMass === null ? <LoadingIconInline /> : totalMass + 't'}
          </p>
          <p>W tym</p>
          <p>
            <strong>W wyniku świadczenia usług i/lub działalności w zakresie obiektów liniowych:</strong>
            {totalMassExcluding === null ? <LoadingIconInline /> : totalMassExcluding + 't'}
          </p>
        </div>
        <div className="mb-4">
          <Button variant="primary" onClick={() => navigate('add')}>
            Dodaj nowy wpis do karty
          </Button>
        </div>
        {strategy(
          { data, isLoading },
          {
            loading: <LoadingSpace />,
            exists: (records) => (
              <div className="mb-8">
                <KEORecordsTable records={records} />
              </div>
            ),
          },
        )}
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
