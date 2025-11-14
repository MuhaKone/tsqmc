import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { EquipmentStatus } from '@/lib/types';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

const statusConfig: Record<
  EquipmentStatus,
  {
    label: string;
    icon?: React.ElementType;
    className: string;
  }
> = {
  Healthy: {
    label: 'Sain',
    className: 'bg-green-500/20 text-green-400 border-transparent hover:bg-green-500/30',
  },
  Warning: {
    label: 'Avertissement',
    className: 'bg-yellow-500/20 text-yellow-400 border-transparent hover:bg-yellow-500/30',
  },
  Critical: {
    label: 'Critique',
    className: 'bg-red-500/20 text-red-400 border-transparent hover:bg-red-500/30',
  },
  Surveillance: {
    label: 'Surveillance',
    className: 'bg-blue-500/20 text-blue-400 border-transparent hover:bg-blue-500/30',
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
