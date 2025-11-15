'use client';

import type { Equipment, MaintenanceLog } from '@/lib/types';
import { StatusBadge } from '../status-badge';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LiveDataTab from './live-data-tab';
import AiAnalysisTab from './ai-analysis-tab';
import MaintenanceLogTab from './maintenance-log-tab';
import { MapPin, Wrench } from 'lucide-react';
import { Card } from '../ui/card';

type EquipmentDetailsProps = {
  equipment: Equipment;
  initialLogs: MaintenanceLog[];
};

export default function EquipmentDetails({
  equipment,
  initialLogs,
}: EquipmentDetailsProps) {
  return (
    <div className="flex flex-col gap-8">
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-3">
          <div className="relative h-60 md:h-full min-h-[200px]">
            <Image
              src={equipment.imageUrl}
              alt={equipment.name}
              fill
              className="object-cover"
              data-ai-hint={equipment.imageHint}
            />
          </div>
          <div className="p-6 md:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {equipment.name}
              </h1>
              <div className="shrink-0">
                <StatusBadge status={equipment.status} />
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Wrench className="h-4 w-4" />
                <span>{equipment.type}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{equipment.location}</span>
              </div>
            </div>
            <p className="mt-4 text-foreground/80">
              Detailed monitoring and analysis for {equipment.name}. Use the
              tabs below to view live data, run AI-powered diagnostics, and
              review maintenance history.
            </p>
          </div>
        </div>
      </Card>
      <Tabs defaultValue="live-data">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-10">
          <TabsTrigger value="live-data">Live Data</TabsTrigger>
          <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
          <TabsTrigger value="maintenance-log">Maintenance Log</TabsTrigger>
        </TabsList>
        <TabsContent value="live-data" className="mt-6">
          <LiveDataTab equipment={equipment} />
        </TabsContent>
        <TabsContent value="ai-analysis" className="mt-6">
          <AiAnalysisTab equipment={equipment} />
        </TabsContent>
        <TabsContent value="maintenance-log" className="mt-6">
          <MaintenanceLogTab initialLogs={initialLogs} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

    