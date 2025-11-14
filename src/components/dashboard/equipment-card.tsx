import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/status-badge';
import type { Equipment } from '@/lib/types';
import { ArrowRight, MapPin } from 'lucide-react';

type EquipmentCardProps = {
  equipment: Equipment;
};

export default function EquipmentCard({ equipment }: EquipmentCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 w-full">
        <Image
          src={equipment.imageUrl}
          alt={equipment.name}
          fill
          className="object-cover"
          data-ai-hint={equipment.imageHint}
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold">{equipment.name}</CardTitle>
          <StatusBadge status={equipment.status} />
        </div>
        <CardDescription className="flex items-center gap-1.5 pt-1 text-xs">
          <MapPin className="h-3 w-3" />
          {equipment.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">Type: {equipment.type}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/equipment/${equipment.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
