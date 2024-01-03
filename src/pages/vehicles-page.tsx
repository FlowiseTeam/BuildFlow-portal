import { Button } from '@src/components/button/Button';
import { AddVehicleModal } from '@src/features/vehicles/AddVehicleModal';
import { VehiclesTable } from '@src/features/vehicles/VehiclesTable';
import { useToggle } from '@src/hooks/useToggle';
import { Page } from '@src/layouts/Page';

export function VehiclesPage() {
  const [isAddProjectModalOpen, toggleIsAddProjectModalOpen] = useToggle();

  return (
    <Page title="Pojazdy">
      <AddVehicleModal
        show={isAddProjectModalOpen}
        onClose={toggleIsAddProjectModalOpen}
        onSuccess={toggleIsAddProjectModalOpen}
      />
      <div className="mt-8 flex flex-col">
        <div className="flex items-end justify-end">
          <Button variant="primary" onClick={toggleIsAddProjectModalOpen}>
            Dodaj pojazd
          </Button>
        </div>
        <div className="mb-24 mt-8 w-0 min-w-full">
          <VehiclesTable />
        </div>
      </div>
    </Page>
  );
}
