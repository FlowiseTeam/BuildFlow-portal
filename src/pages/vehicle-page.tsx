import { DetailCard } from '@components/detailCard/DetailCard';
import { Page } from '@layouts/Page';
import { DetailsPageHeader } from '@src/components/detailsPageHeader/DetailsPageHeader';
import { useParams } from '@src/hooks/useParams';
import { ErrorBoundary } from '@src/components/queryBoundaries/ErrorBoundary';
import { LoadingPageSuspense } from '@src/components/queryBoundaries/LoadingView';
import { PageFallback } from '@src/components/queryBoundaries/PageFallback';
import { VehicleForm } from '@src/features/vehicles/VehicleForm';
import { VehicleProjectsList } from '@src/features/vehicles/VehicleProjectsList';
import {
  useVehicleDeleteMutation,
  useVehicleMutation,
  useVehicleSuspenseQuery,
} from '@src/services/api/hooks/vehicles';
import { useNavigate } from 'react-router-dom';

function VehiclePage() {
  const id = useParams('id');
  const navigate = useNavigate();
  const { data: vehicle } = useVehicleSuspenseQuery(+id);
  const { mutateAsync: deleteVehicle } = useVehicleDeleteMutation(+id);
  const { mutateAsync: onUpdate, isPending } = useVehicleMutation(+id);

  const onDelete = () => {
    deleteVehicle();
    navigate('/app/vehicles');
  };

  return (
    <Page
      header={
        <DetailsPageHeader
          title={vehicle.name}
          backLink="/app/vehicles"
          onDelete={onDelete}
          deleteModalTitle="Czy chcesz usunąć pojazd?"
        />
      }
    >
      <div className="mb-16 mt-8 grid min-h-0 grid-cols-1 items-start gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <DetailCard className="p-2 md:col-span-2 xl:col-span-3">
          <VehicleForm vehicle={vehicle} handleFormSubmit={onUpdate} isPending={isPending} />
        </DetailCard>
        <DetailCard>
          <VehicleProjectsList vehicle={vehicle} />
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
