import type { Equipment, EquipmentStatus, MaintenanceLog } from './types';
import { PlaceHolderImages } from './placeholder-images';

const equipmentImages = PlaceHolderImages;

export const allEquipment: Equipment[] = [
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
