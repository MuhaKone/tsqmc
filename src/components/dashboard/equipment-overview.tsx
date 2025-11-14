import type { Equipment } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/status-badge';
import { Thermometer, Zap, Waves } from 'lucide-react';
import Link from 'next/link';

type EquipmentOverviewProps = {
  equipment: Equipment[];
};

export default function EquipmentOverview({ equipment }: EquipmentOverviewProps) {
  const displayEquipment = equipment.slice(0, 3); // Show first 3 for this component

  return (
    <Card className="bg-card">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {displayEquipment.map((item) => (
            <Link
              key={item.id}
              href={`/equipment/${item.id}`}
              className="group block px-4 py-4 first:pt-0 sm:first:pt-4 sm:first:pl-0 sm:last:pr-0"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <h3 className="font-semibold">{item.name}</h3>
                <StatusBadge status={item.status} className="shrink-0" />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-around gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Thermometer className="h-4 w-4" />
                  <span>{item.sensorData.temperature}°C</span>
                </div>
                <div className="flex items-center gap-1">
                  <Waves className="h-4 w-4" />
                  <span>{item.sensorData.vibration}mm/s</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  <span>{item.sensorData.voltage}V</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
