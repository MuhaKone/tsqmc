import { getEquipmentById, getMaintenanceLogs } from '@/lib/data';
import { notFound } from 'next/navigation';
import EquipmentDetails from '@/components/equipment/equipment-details';

type EquipmentDetailPageProps = {
  params: { id: string };
};

export default function EquipmentDetailPage({ params }: EquipmentDetailPageProps) {
  const equipment = getEquipmentById(params.id);
  
  if (!equipment) {
    notFound();
  }

  const maintenanceLogs = getMaintenanceLogs(params.id);

  return <EquipmentDetails equipment={equipment} initialLogs={maintenanceLogs} />;
}
