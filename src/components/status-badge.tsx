import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { EquipmentStatus } from '@/lib/types';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

const statusConfig: Record<
  EquipmentStatus | 'Surveillance',
  {
    label: string;
    icon?: React.ElementType;
    className: string;
  }
> = {
  Healthy: {
    label: 'Sain',
    className: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-transparent',
  },
  Warning: {
    label: 'Avertissement',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-transparent',
  },
  Critical: {
    label: 'Critique',
    className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-transparent',
  },
  Surveillance: {
    label: 'Surveillance',
    className: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-transparent',
  }
};

type StatusBadgeProps = {
  status: EquipmentStatus | 'Surveillance';
  className?: string;
  showIcon?: boolean;
};

export function StatusBadge({ status, className, showIcon = false }: StatusBadgeProps) {
  const config = statusConfig[status];
  if (!config) return null;
  
  const Icon = config.icon;

  return (
    <Badge
      className={cn('flex w-fit items-center justify-center gap-1.5', config.className, className)}
    >
      {showIcon && Icon && <Icon className="h-3.5 w-3.5" />}
      <span>{config.label}</span>
    </Badge>
  );
}
