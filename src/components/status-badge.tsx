import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { EquipmentStatus } from '@/lib/types';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

const statusConfig: Record<
  EquipmentStatus,
  {
    label: string;
    icon: React.ElementType;
    className: string;
  }
> = {
  Healthy: {
    label: 'Healthy',
    icon: CheckCircle2,
    className: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400 border-green-200 dark:border-green-800/60',
  },
  Warning: {
    label: 'Warning',
    icon: AlertTriangle,
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/60',
  },
  Critical: {
    label: 'Critical',
    icon: XCircle,
    className: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400 border-red-200 dark:border-red-800/60',
  },
};

type StatusBadgeProps = {
  status: EquipmentStatus;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      className={cn('flex w-fit items-center gap-1.5', config.className, className)}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{config.label}</span>
    </Badge>
  );
}
