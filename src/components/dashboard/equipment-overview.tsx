'use client';
import type { Equipment } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/status-badge';
import { Thermometer, Zap, Waves, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';

type EquipmentOverviewProps = {
  equipment: Equipment[];
};

export default function EquipmentOverview({
  equipment,
}: EquipmentOverviewProps) {
  const [showAll, setShowAll] = useState(false);
  const displayEquipment = showAll ? equipment : equipment.slice(0, 3);

  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle className="text-lg">Aperçu des équipements</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-1 divide-y divide-border">
          {displayEquipment.map((item) => (
            <Link
              key={item.id}
              href={`/equipment/${item.id}`}
              className="group block py-4 first:pt-0 last:pb-0"
            >
              <div className="flex flex-row items-start justify-between gap-2">
                <h3 className="flex-1 truncate font-semibold">
                  {item.name}
                </h3>
                <StatusBadge status={item.status} className="shrink-0" />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-around gap-x-4 gap-y-2 text-xs text-muted-foreground">
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
        {!showAll && equipment.length > 3 && (
          <div className="mt-4 border-t border-border pt-4">
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setShowAll(true)}
            >
              <ChevronDown className="mr-2 h-4 w-4" />
              Voir plus
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
