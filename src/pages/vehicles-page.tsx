import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
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
        <div className="flex items-end justify-between">
          <div className="relative">
            <div className="absolute left-3 top-[6px] text-gray-400">
              <MagnifyingGlassIcon className="h-4 w-4" />
            </div>
            <input
              name="filter"
              placeholder="Wyszukaj"
              className="rounded-full border-2 px-2 py-1 pl-8 text-xs   outline-gray-500"
            />
          </div>
          <Button variant="primary" onClick={toggleIsAddProjectModalOpen}>
            dodaj pojazd
          </Button>
        </div>
        <div className="mb-24 mt-8 w-0 min-w-full">
          <VehiclesTable />
        </div>
      </div>
    </Page>
  );
}
