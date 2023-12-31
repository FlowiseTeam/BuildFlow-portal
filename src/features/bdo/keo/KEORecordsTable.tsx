import { DeleteModal } from '@src/components/deleteModal/DeleteModal';
import { Table, TableColumn } from '@src/components/table/Table';
import { useNotifications } from '@src/layouts/notifications/NotificationProvider';
import { useKeoCardDelete } from '@src/services/api/hooks/bdo';
import { KEORecord } from '@src/services/api/routes/bdo';
import { useState, useMemo } from 'react';

// export function KPOCardsTableContainer() {
//   const { data, isLoading } = useKpoCardsQuery();

//   return (
//     <div>
//       {strategy(data, isLoading, {
//         loading: <LoadingSpace />,
//         exists: (cards) => <CardsTable cards={cards} />,
//       })}
//     </div>
//   );
// }

const columns = [
  { key: 'keoId', title: 'Keo ID', type: 'text', headCenter: false },
  { key: 'manufactureDate', title: 'data stworzenia', type: 'date', headCenter: false },
  { key: 'wasteMass', title: 'Masa odpadów (łącznie, t)', type: 'text', headCenter: false },
  { key: 'wasteMassExcluding', title: 'Masa odpadów (poza instalacją, t)', type: 'text', headCenter: false },
  // { key: 'keoId', title: 'Keo ID', type: 'text', headCenter: false },
] satisfies TableColumn[];

export function KEORecordsTable({ records }: { records: KEORecord[] }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<null | string | number>(null);
  const { mutateAsync } = useKeoCardDelete();
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
      records.map((record) => ({
        id: record._id,
        keoId: record.KeoId,
        manufactureDate: record.ManufactureDate,
        wasteMass: record.WasteMassInstallation,
        wasteMassExcluding: record.WasteMassExcludingInstallation,
      })),
    [records],
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
