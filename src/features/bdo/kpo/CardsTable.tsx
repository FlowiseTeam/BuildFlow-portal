import { DeleteModal } from '@src/components/deleteModal/DeleteModal';
import { LoadingSpace } from '@src/components/loadings/Loading';
import { Table, TableColumn } from '@src/components/table/Table';
import { useNotifications } from '@src/layouts/notifications/NotificationProvider';
import { strategy } from '@src/lib/strategy';
import { useKpoCardDelete, useKpoCardsQuery, useKpoInfoQuery} from '@src/services/api/hooks/bdo';
import { Card, KpoInfo } from '@src/services/api/routes/bdo';
import { useMemo, useState } from 'react';

export function KPOCardsTableContainer() {

  const { data: cards, isLoading: isCardsLoading, isError: isCardsError } = useKpoCardsQuery();
  const { data: kpoInfo, isLoading: isKpoInfoLoading, isError: isKpoInfoError } = useKpoInfoQuery();

  const isLoading = isCardsLoading || isKpoInfoLoading;
  const isError = isCardsError || isKpoInfoError;

  return (
    <div>
      {strategy(
        { data: cards, isLoading, isError },
        {
          loading: <LoadingSpace />,
          exists: (cards) => kpoInfo && <CardsTable cards={cards} kpoInfo={kpoInfo} />,
          error: <p className="text-center text-red-600">Wystąpił błąd.</p>,
        },
      )}
    </div>
  );
}

const columns = [
  { key: 'recevierName', title: 'Firma odbierająca', type: 'text', headCenter: false },
  { key: 'carrierName', title: 'Firma transportująca', type: 'text', headCenter: false },
  { key: 'vehicleRegNum', title: 'Nr pojazdu', type: 'text', headCenter: false },
  { key: 'wasteMass', title: 'Masa odpadów (t)', type: 'text', headCenter: false },
  { key: 'time', title: 'Data transportu', type: 'text', headCenter: false },
  { key: 'kpoId', title: 'Kpo ID', type: 'text', headCenter: false },
] satisfies TableColumn[];

function CardsTable({ cards, kpoInfo }: { cards: Card[]; kpoInfo: KpoInfo }) {
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
    () => cards.map((card) => {
      const date = new Date(card.PlannedTransportTime);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

      const receiverName = kpoInfo.receivers.find(receiver => receiver.companyId.toString() === card.ReceiverCompanyId)?.name;
      const carrierName = kpoInfo.carriers.find(carrier => carrier.companyId.toString() === card.CarrierCompanyId)?.name;

      return {
        id: card._id,
        wasteMass: card.WasteMass,
        time: formattedDate,
        kpoId: card.KpoId,
        vehicleRegNum: card.VehicleRegNumber,
        recevierName: receiverName,
        carrierName: carrierName
      };
}),
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
