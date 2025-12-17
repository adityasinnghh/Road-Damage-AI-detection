import { cn } from '@/lib/utils';
import { DetectionResult } from '@/types/damage';
import { SeverityBadge } from './SeverityBadge';

interface DetectionOverlayProps {
  detection: (DetectionResult & { detectedClass?: string }) | null;
  isScanning: boolean;
}

export function DetectionOverlay({ detection, isScanning }: DetectionOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Scanning animation */}
      {isScanning && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
        </div>
      )}

      {/* Corner brackets */}
      <div className="absolute inset-4">
        {/* Top left */}
        <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-primary/60 rounded-tl-lg" />
        {/* Top right */}
        <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-primary/60 rounded-tr-lg" />
        {/* Bottom left */}
        <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-primary/60 rounded-bl-lg" />
        {/* Bottom right */}
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-primary/60 rounded-br-lg" />
      </div>

      {/* Detection box */}
      {detection && (
        <div
          className="absolute border-2 border-primary rounded-lg transition-all duration-300 bg-primary/10"
          style={{
            left: `${detection.boundingBox.x}%`,
            top: `${detection.boundingBox.y}%`,
            width: `${detection.boundingBox.width}%`,
            height: `${detection.boundingBox.height}%`,
          }}
        >
          {/* Label */}
          <div className="absolute -top-8 left-0 flex items-center gap-2">
            <span className="text-xs font-semibold bg-primary text-primary-foreground px-2 py-1 rounded capitalize">
              {detection.detectedClass || detection.type}
            </span>
            <span className="text-xs font-mono bg-background/90 px-2 py-1 rounded text-foreground">
              {(detection.confidence * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      )}

      {/* Status indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <div
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-full glass-strong',
            isScanning ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <div
            className={cn(
              'w-2 h-2 rounded-full',
              isScanning ? 'bg-primary animate-pulse' : 'bg-muted-foreground'
            )}
          />
          <span className="text-sm font-medium">
            {isScanning ? 'Scanning...' : 'Ready'}
          </span>
        </div>
      </div>
    </div>
  );
}
