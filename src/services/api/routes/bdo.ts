import { bdoAxiosApi as http } from '../setup';

export interface CardPost {
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
  KpoId: any;
  _id: string;
}

export interface KpoInfo {
  carriers: {
    _id: string;
    companyId: number;
    name: string;
    registrationNumber: number;
    nip: number;
    type: string;
  }[];
  receivers: {
    _id: string;
    companyId: number;
    name: string;
    registrationNumber: number;
    nip: number;
    EupIds: {
      code: string;
      address: string;
    }[];
    type: string;
  }[];
  wasteCodes: {
    _id: string;
    code: string;
    description: string;
    type: string;
    WasteCodeId: number;
  }[];
  commons: {
    _id: string;
    commonId: number;
    name: string;
    type: string;
  }[];
}

export interface KeoCard {
  _id: string;
  KeoId: string;
  name: string;
}

export interface KeoInfo {
  cards: KeoCard[];
  commons: { _id: string; commonId: number; name: string; type: string }[];
}

export interface KEORecord {
  KeoId: string;
  WasteMassInstallation: number;
  WasteMassExcludingInstallation: number;
  WasteFromServices: string;
  CommuneId?: string;
  ManufactureDate: string;
  HazardousWasteReclassification: boolean;
}

export const getKpoInfo = (): Promise<KpoInfo> => http.get('bdo-info/kpo').then((data) => data.data);

export const postKpoCard = (card: unknown) => http.post('kpo', card);

export const getKpoCards = (): Promise<Card[]> => http.get('kpo').then((data) => data.data.cards);

export const getKeoInfo = (): Promise<KeoInfo> => http.get('bdo-info/keo').then((data) => data.data);

export const postKeoRecord = (record: KEORecord) => http.post('keo', record);

export const deleteKpoCard = (id: string | number) => http.delete(`kpo/${id}`);
