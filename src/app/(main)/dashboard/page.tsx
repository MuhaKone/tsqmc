import { allEquipment } from '@/lib/data';
import type { EquipmentStatus } from '@/lib/types';
import StatsCards from '@/components/dashboard/stats-cards';
import EquipmentCard from '@/components/dashboard/equipment-card';

export default function DashboardPage() {
  const equipment = allEquipment;

  const statusCounts = equipment.reduce(
    (acc, item) => {
      acc[item.status]++;
      return acc;
    },
    { Healthy: 0, Warning: 0, Critical: 0 } as Record<EquipmentStatus, number>
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back, here's an overview of your equipment health.
        </p>
      </div>

      <StatsCards counts={statusCounts} total={equipment.length} />

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-4">
          Equipment Overview
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {equipment.map((item) => (
            <EquipmentCard key={item.id} equipment={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
