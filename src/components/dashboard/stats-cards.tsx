import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { EquipmentStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

type StatsCardsProps = {
  counts: Record<EquipmentStatus, number>;
  total: number;
};

const cardStyles = 'bg-card border-border';
const titleStyles = 'text-sm font-medium text-muted-foreground';
const valueStyles = 'text-3xl font-bold text-foreground';

export default function StatsCards({ counts, total }: StatsCardsProps) {
  return (
    <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card className={cn(cardStyles)}>
        <CardHeader className="p-4">
          <CardTitle className={cn(titleStyles)}>Équipements au total</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className={cn(valueStyles)}>{total}</p>
          <p className="text-xs text-muted-foreground">+3 ajoutés</p>
        </CardContent>
      </Card>
      <Card className={cn(cardStyles)}>
        <CardHeader className="p-4">
          <CardTitle className={cn(titleStyles)}>Sains</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className={cn(valueStyles)}>{counts.Healthy}</p>
          <p className="text-xs text-muted-foreground">Stable</p>
        </CardContent>
      </Card>
      <Card className={cn(cardStyles)}>
        <CardHeader className="p-4">
          <CardTitle className={cn(titleStyles)}>Avertissements</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className={cn(valueStyles)}>{counts.Warning}</p>
          <p className="text-xs text-muted-foreground">+5 vs 7 j</p>
        </CardContent>
      </Card>
      <Card className={cn(cardStyles)}>
        <CardHeader className="p-4">
          <CardTitle className={cn(titleStyles)}>Critiques</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className={cn(valueStyles)}>{counts.Critical}</p>
          <p className="text-xs text-muted-foreground">Revue immédiate</p>
        </CardContent>
      </Card>
    </div>
  );
}

    