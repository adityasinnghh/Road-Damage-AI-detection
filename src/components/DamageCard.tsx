import { DamageReport } from '@/types/damage';
import { SeverityBadge } from './SeverityBadge';
import { MapPin, Clock, Percent } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface DamageCardProps {
  report: DamageReport;
  className?: string;
}

const typeLabels: Record<DamageReport['type'], string> = {
  pothole: 'Pothole',
  crack: 'Road Crack',
  depression: 'Depression',
  patch: 'Damaged Patch',
};

const statusStyles = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  verified: 'bg-primary/10 text-primary border-primary/20',
  resolved: 'bg-success/10 text-success border-success/20',
};

export function DamageCard({ report, className }: DamageCardProps) {
  return (
    <div
      className={cn(
        'bg-gradient-card border border-border rounded-xl p-5 shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-0.5 animate-fade-in',
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg">{typeLabels[report.type]}</h3>
          <span
            className={cn(
              'inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-md border capitalize',
              statusStyles[report.status]
            )}
          >
            {report.status}
          </span>
        </div>
        <SeverityBadge severity={report.severity} />
      </div>

      <div className="space-y-2.5 text-sm">
        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="line-clamp-2">{report.address}</span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span>{formatDistanceToNow(report.timestamp, { addSuffix: true })}</span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Percent className="w-4 h-4 flex-shrink-0" />
          <span>Confidence: {(report.confidence * 100).toFixed(0)}%</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground font-mono">
            {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
          </span>
          <span className="text-muted-foreground">ID: {report.id}</span>
        </div>
      </div>
    </div>
  );
}
