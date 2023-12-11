import { bdoAxiosApi as http } from '../setup';

export interface Card {
  CarrierCompanyId: string;
  ReceiverCompanyId: string;
  ReceiverEupId: string;
  WasteCodeId: number;
  VehicleRegNumber: string;
  WasteMass: number;
  PlannedTransportTime: '2023-11-30T23:54:38.888Z';
  WasteProcessId: number;
  CertificateNumberAndBoxNumbers: string;
  AdditionalInfo: string;
  WasteCodeExtended: boolean;
  WasteCodeExtendedDescription: string;
  HazardousWasteReclassification: boolean;
  HazardousWasteReclassificationDescription: string;
  IsWasteGenerating: boolean;
  WasteGeneratedTerytPk: string;
  WasteGeneratingAdditionalInfo: string;
}

type Id = string | number;

export const getCards = (): Promise<unknown> => http.get('/kpo');

export const getCard = (id: Id): Promise<unknown> => http.get(`/kpo/${id}`);

export const postCard = (card: any) => http.post('/kpo', card);

export const deleteCard = (id: Id) => http.delete(`/kpo/${id}`);
