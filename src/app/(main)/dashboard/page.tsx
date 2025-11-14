import { allEquipment } from '@/lib/data';
import type { Equipment, EquipmentStatus } from '@/lib/types';
import StatsCards from '@/components/dashboard/stats-cards';
import EquipmentOverview from '@/components/dashboard/equipment-overview';
import RealtimeAlerts from '@/components/dashboard/realtime-alerts';
import UpcomingMaintenance from '@/components/dashboard/upcoming-maintenance';
import PredictedHealth from '@/components/dashboard/predicted-health';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DashboardPage() {
  const equipment: Equipment[] = allEquipment;

  const statusCounts = equipment.reduce(
    (acc, item) => {
      acc[item.status]++;
      return acc;
    },
    { Healthy: 0, Warning: 0, Critical: 0 } as Record<EquipmentStatus, number>
  );

  return (
    <div className="container mx-auto flex flex-col gap-6">
      <Tabs defaultValue="today">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-semibold">Aperçu</h2>
          <TabsList className="self-start sm:self-center">
            <TabsTrigger value="today">Aujourd'hui</TabsTrigger>
            <TabsTrigger value="7d">7 j</TabsTrigger>
            <TabsTrigger value="30d">30 j</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="today">
          <StatsCards counts={statusCounts} total={equipment.length} />
        </TabsContent>
        <TabsContent value="7d">
          <p className="p-4 text-center text-muted-foreground">7-day data not available.</p>
        </TabsContent>
        <TabsContent value="30d">
          <p className="p-4 text-center text-muted-foreground">30-day data not available.</p>
        </TabsContent>
      </Tabs>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <EquipmentOverview equipment={equipment} />
        <RealtimeAlerts />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
           <UpcomingMaintenance />
        </div>
        <PredictedHealth />
      </div>

      {/* The original live data charts are now on the equipment details page */}
      {/* <section>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        </div>
      </section> */}
    </div>
  );
}
