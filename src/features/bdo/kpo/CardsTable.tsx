import { DeleteModal } from '@src/components/deleteModal/DeleteModal';
import { LoadingSpace } from '@src/components/loadings/Loading';
import { Table, TableColumn } from '@src/components/table/Table';
import { useNotifications } from '@src/layouts/notifications/NotificationProvider';
import { strategy } from '@src/lib/strategy';
import { useKpoCardDelete, useKpoCardsQuery } from '@src/services/api/hooks/bdo';
import { Card } from '@src/services/api/routes/bdo';
import { useMemo, useState } from 'react';

export function KPOCardsTableContainer() {
  const { data, isLoading, isError } = useKpoCardsQuery();

  return (
    <div>
      {strategy(
        { data, isLoading, isError },
        {
          loading: <LoadingSpace />,
          exists: (cards) => <CardsTable cards={cards} />,
          error: <p className="text-center text-red-600">Wystąpił błąd.</p>,
        },
      )}
    </div>
  );
}

const columns = [
  { key: 'wasteMass', title: 'Masa odpadów (t)', type: 'text', headCenter: false },
  { key: 'kpoId', title: 'Kpo ID', type: 'text', headCenter: false },
  { key: 'vehicleRegNum', title: 'Nr pojazdu', type: 'text', headCenter: false },
] satisfies TableColumn[];

function CardsTable({ cards }: { cards: Card[] }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<null | string | number>(null);
  const { mutateAsync } = useKpoCardDelete();
  const { notify } = useNotifications();

  const openRemoveDialog = (cardId: string | number) => {
    setSelectedCardId(cardId);
    setIsDeleteModalOpen(true);
  };

  const handleRemove = async () => {
    try {
      await mutateAsync(selectedCardId!);
    } catch (err) {
      notify('Coś poszło nie tak', 'error');
    }
    setIsDeleteModalOpen(false);
  };

  const tableData = useMemo(
    () =>
      cards.map((card) => ({
        id: card._id,
        wasteMass: card.WasteMass,
        kpoId: card.KpoId,
        vehicleRegNum: card.VehicleRegNumber,
      })),
    [cards],
  );

  return (
    <>
      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        onSuccess={handleRemove}
        title="Czy chcesz usunąć kartę?"
      />
      <Table columns={columns} data={tableData} editable={false} removable onRemove={openRemoveDialog} />
    </>
  );
}
