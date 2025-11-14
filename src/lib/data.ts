import type { Equipment, EquipmentStatus, MaintenanceLog, Part } from './types';
import { PlaceHolderImages } from './placeholder-images';

const equipmentImages = PlaceHolderImages;

export let allEquipment: Equipment[] = [
  {
    id: 'em-001',
    name: 'Main Factory Motor',
    type: 'Electric Motor',
    location: 'Factory Floor A',
    status: 'Healthy',
    imageUrl: equipmentImages[0].imageUrl,
    imageHint: equipmentImages[0].imageHint,
    sensorData: {
      temperature: 55,
      vibration: 10,
      voltage: 238,
      current: 15,
    },
  },
  {
    id: 'ps-002',
    name: 'Coolant Pump Station',
    type: 'Pumping Station',
    location: 'Sector B-2',
    status: 'Warning',
    imageUrl: equipmentImages[1].imageUrl,
    imageHint: equipmentImages[1].imageHint,
    sensorData: {
      temperature: 85,
      vibration: 45,
      voltage: 225,
      current: 20,
    },
  },
  {
    id: 'dc-003',
    name: 'Primary Server Rack',
    type: 'Data Center Rack',
    location: 'Data Center 1',
    status: 'Healthy',
    imageUrl: equipmentImages[2].imageUrl,
    imageHint: equipmentImages[2].imageHint,
    sensorData: {
      temperature: 40,
      vibration: 2,
      voltage: 240,
      current: 30,
    },
  },
  {
    id: 'cb-004',
    name: 'Assembly Line Conveyor',
    type: 'Conveyor Belt',
    location: 'Assembly Hall',
    status: 'Critical',
    imageUrl: equipmentImages[3].imageUrl,
    imageHint: equipmentImages[3].imageHint,
    sensorData: {
      temperature: 110,
      vibration: 60,
      voltage: 195,
      current: 25,
    },
  },
  {
    id: 'wt-005',
    name: 'Wind Turbine #3',
    type: 'Wind Turbine',
    location: 'West Ridge',
    status: 'Healthy',
    imageUrl: equipmentImages[4].imageUrl,
    imageHint: equipmentImages[4].imageHint,
    sensorData: {
      temperature: 30,
      vibration: 15,
      voltage: 480,
      current: 150,
    },
  },
  {
    id: 'hvac-006',
    name: 'Office HVAC Unit',
    type: 'HVAC Unit',
    location: 'Rooftop - Main Building',
    status: 'Warning',
    imageUrl: equipmentImages[5].imageUrl,
    imageHint: equipmentImages[5].imageHint,
    sensorData: {
      temperature: 75,
      vibration: 30,
      voltage: 208,
      current: 40,
    },
  },
];

export const allParts: Part[] = [
  { id: 'part-001', name: 'Roulement à billes 6203-2RS', sku: 'RB-6203-2RS', stock: 50, threshold: 10, location: 'Magasin A, Allée 3', status: 'En stock' },
  { id: 'part-002', name: 'Filtre à huile HF160', sku: 'FH-HF160', stock: 8, threshold: 5, location: 'Magasin B, Étagère 2', status: 'Stock bas' },
  { id: 'part-003', name: 'Courroie trapézoïdale A-36', sku: 'CT-A36', stock: 22, threshold: 5, location: 'Magasin A, Allée 5', status: 'En stock' },
  { id: 'part-004', name: 'Joint d\'étanchéité 50x72x10', sku: 'JE-507210', stock: 0, threshold: 10, location: 'Magasin C, Casier 12', status: 'En rupture' },
  { id: 'part-005', name: 'Fusible 10A rapide', sku: 'FU-10A-F', stock: 150, threshold: 50, location: 'Magasin Elec, Tiroir 1', status: 'En stock' },
  { id: 'part-006', name: 'Graisse palier ISO VG68', sku: 'GR-VG68', stock: 12, threshold: 15, location: 'Magasin B, Allée 1', status: 'Stock bas' },
];


// This is a temporary in-memory solution. 
// In a real application, this would be a database call.
export const addEquipment = (equipment: Equipment) => {
    allEquipment.unshift(equipment);
};


export const getEquipmentById = (id: string): Equipment | undefined => {
  return allEquipment.find((eq) => eq.id === id);
};

export const getMaintenanceLogs = (equipmentId: string): MaintenanceLog[] => {
  // Mock logs
  return [
    {
      id: 'log-1',
      author: 'Mamady Condé',
      date: '2024-05-20T10:30:00Z',
      comment:
        'Routine inspection completed. All parameters are normal. No action required.',
    },
    {
      id: 'log-2',
      author: 'Aïssatou Barry',
      date: '2024-05-22T15:00:00Z',
      comment:
        'Noticed slight increase in vibration. Will monitor closely over the next 48 hours.',
    },
  ].filter(() => Math.random() > 0.3); // return random set of logs
};

export const generateTimeSeriesData = (base: number, points: number, variance: number) => {
    let value = base;
    return Array.from({ length: points }, (_, i) => {
        const date = new Date();
        date.setMinutes(date.getMinutes() - (points - i));
        value += (Math.random() - 0.5) * variance;
        if (value < base - variance * 5) value = base - variance * 5;
        if (value > base + variance * 5) value = base + variance * 5;
        return {
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            value: Math.round(value),
        };
    });
};
