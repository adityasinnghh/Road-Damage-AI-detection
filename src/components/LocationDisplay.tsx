import { MapPin, Navigation, Signal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationDisplayProps {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  isTracking: boolean;
  className?: string;
}

export function LocationDisplay({
  latitude,
  longitude,
  accuracy,
  isTracking,
  className,
}: LocationDisplayProps) {
  return (
    <div
      className={cn(
        'glass-strong rounded-xl p-4 space-y-3',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Navigation className={cn('w-4 h-4', isTracking ? 'text-primary' : 'text-muted-foreground')} />
          <span className="text-sm font-medium">GPS Location</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Signal
            className={cn(
              'w-4 h-4',
              isTracking ? 'text-success' : 'text-muted-foreground'
            )}
          />
          <span
            className={cn(
              'text-xs font-medium',
              isTracking ? 'text-success' : 'text-muted-foreground'
            )}
          >
            {isTracking ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      {latitude !== null && longitude !== null ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-mono text-foreground">
              {latitude.toFixed(6)}, {longitude.toFixed(6)}
            </span>
          </div>
          {accuracy !== null && (
            <p className="text-xs text-muted-foreground">
              Accuracy: ±{accuracy.toFixed(0)}m
            </p>
          )}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Waiting for location data...
        </p>
      )}
    </div>
  );
}
