import { cn } from '@/lib/utils';
import { SeverityLevel } from '@/types/damage';

interface SeverityBadgeProps {
  severity: SeverityLevel;
  className?: string;
}

const severityConfig: Record<SeverityLevel, { label: string; className: string }> = {
  low: {
    label: 'Low',
    className: 'bg-success/20 text-success border-success/30',
  },
  medium: {
    label: 'Medium',
    className: 'bg-warning/20 text-warning border-warning/30',
  },
  high: {
    label: 'High',
    className: 'bg-primary/20 text-primary border-primary/30',
  },
  critical: {
    label: 'Critical',
    className: 'bg-critical/20 text-critical border-critical/30',
  },
};

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const config = severityConfig[severity];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        config.className,
        className
      )}
    >
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full mr-1.5',
          severity === 'low' && 'bg-success',
          severity === 'medium' && 'bg-warning',
          severity === 'high' && 'bg-primary',
          severity === 'critical' && 'bg-critical animate-pulse'
        )}
      />
      {config.label}
    </span>
  );
}
