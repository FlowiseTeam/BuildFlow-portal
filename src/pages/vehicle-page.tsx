import { DetailCard } from '@components/detailCard/DetailCard';
import { Page } from '@layouts/Page';
import { DetailsPageHeader } from '@src/components/detailsPageHeader/DetailsPageHeader';
import { useReducer } from 'react';
import { useParams } from '@src/hooks/useParams';
import { ErrorBoundary } from '@src/components/queryBoundaries/ErrorBoundary';
import { LoadingPageSuspense } from '@src/components/queryBoundaries/LoadingView';
import { PageFallback } from '@src/components/queryBoundaries/PageFallback';
import { useVehicleQuery } from '@src/features/project/hooks/useVehiclesQuery';
import { VehicleForm } from '@src/features/vehicles/VehicleForm';
import { VehicleProjectsList } from '@src/features/vehicles/VehicleProjectsList';

function VehiclePage() {
  const id = useParams('id');
  const { vehicle, onDelete, onUpdate } = useVehicleQuery(+id);
  const [isEdited, toggleIsEdited] = useReducer((v) => !v, false);

  return (
    <Page
      header={
        <DetailsPageHeader
          title={vehicle.name}
          backLink="/app/vehicles"
          onDelete={onDelete}
          deleteModalTitle="Czy chcesz usunąć pojazd?"
          toggleEdit={toggleIsEdited}
          isEdited={isEdited}
        />
      }
    >
      <div className="mb-16 mt-8 grid min-h-0 grid-cols-1 items-start gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <DetailCard className="p-2 md:col-span-2 xl:col-span-3">
          <VehicleForm vehicle={vehicle} disabled={!isEdited} handleFormSubmit={onUpdate} />
        </DetailCard>
        <DetailCard>
          <VehicleProjectsList vehicle={vehicle} isEdited={isEdited} />
        </DetailCard>
      </div>
    </Page>
  );
}

export default function () {
  return (
    <ErrorBoundary fallback={<PageFallback title="Pojazd" message="Nie udało się załadować pojazdu." />}>
      <LoadingPageSuspense>
        <VehiclePage />
      </LoadingPageSuspense>
    </ErrorBoundary>
  );
}
