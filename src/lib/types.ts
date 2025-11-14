export type EquipmentStatus = 'Healthy' | 'Warning' | 'Critical';

export type Equipment = {
  id: string;
  name: string;
  type: string;
  location: string;
  status: EquipmentStatus;
  imageUrl: string;
  imageHint: string;
  sensorData: {
    temperature: number;
    vibration: number;
    voltage: number;
    current: number;
  };
};

export type MaintenanceLog = {
  id: string;
  author: string;
  date: string;
  comment: string;
};

export type PartStatus = 'En stock' | 'Stock bas' | 'En rupture';

export type Part = {
  id: string;
  name: string;
  sku: string;
  stock: number;
  threshold: number;
  location: string;
  status: PartStatus;
};
