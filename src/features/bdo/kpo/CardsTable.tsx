import { LoadingSpace } from '@src/components/loadings/Loading';
import { Table, TableColumn } from '@src/components/table/Table';
import { strategy } from '@src/lib/strategy';
import { useKpoCardsQuery } from '@src/services/api/hooks/bdo';
import { Card } from '@src/services/api/routes/bdo';
import { useMemo } from 'react';

export function KPOCardsTableContainer() {
  const cardsResult = useKpoCardsQuery();

  return (
    <div>
      {strategy(cardsResult, {
        loading: <LoadingSpace />,
        exists: (cards) => <CardsTable cards={cards} />,
      })}
    </div>
  );
}

const columns = [
  { key: 'wasteMass', title: 'Masa śmieci', type: 'text', headCenter: false },
  { key: 'kpoId', title: 'Kpo ID', type: 'text', headCenter: false },
  { key: 'vehicleRegNum', title: 'Nr pojazdu', type: 'text', headCenter: false },
] satisfies TableColumn[];

function CardsTable({ cards }: { cards: Card[] }) {
  const tableData = useMemo(
    () =>
      cards.map((card) => ({
        id: card.WasteCodeId,
        wasteMass: card.WasteMass,
        kpoId: card.KpoId,
        vehicleRegNum: card.VehicleRegNumber,
      })),
    [cards],
  );

  return <Table columns={columns} data={tableData} editable={false} />;
}
