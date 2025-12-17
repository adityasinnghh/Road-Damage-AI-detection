import { useState } from 'react';
import { Header } from '@/components/Header';
import { StatCard } from '@/components/StatCard';
import { DamageCard } from '@/components/DamageCard';
import { SeverityBadge } from '@/components/SeverityBadge';
import { Button } from '@/components/ui/button';
import { mockDamageReports, statsData } from '@/data/mockData';
import { SeverityLevel } from '@/types/damage';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Filter,
  MapPin,
  List,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewMode = 'list' | 'map';
type StatusFilter = 'all' | 'pending' | 'verified' | 'resolved';

const severityFilters: (SeverityLevel | 'all')[] = ['all', 'critical', 'high', 'medium', 'low'];

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [severityFilter, setSeverityFilter] = useState<SeverityLevel | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filteredReports = mockDamageReports.filter((report) => {
    if (severityFilter !== 'all' && report.severity !== severityFilter) return false;
    if (statusFilter !== 'all' && report.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />

      <main className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-7xl space-y-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Damage Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Monitor and manage road damage reports across the city.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="gap-2"
              >
                <List className="w-4 h-4" />
                List
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('map')}
                className="gap-2"
              >
                <MapPin className="w-4 h-4" />
                Map
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Detections"
              value={statsData.totalDetections}
              icon={AlertTriangle}
              trend={{ value: 12, isPositive: true }}
              variant="primary"
            />
            <StatCard
              title="Critical Issues"
              value={statsData.criticalIssues}
              icon={AlertTriangle}
              trend={{ value: 5, isPositive: false }}
              variant="critical"
            />
            <StatCard
              title="Resolved Today"
              value={statsData.resolvedToday}
              icon={CheckCircle2}
              variant="success"
            />
            <StatCard
              title="Avg Response Time"
              value={statsData.avgResponseTime}
              icon={Clock}
              trend={{ value: 8, isPositive: true }}
              variant="warning"
            />
          </div>

          {/* Filters */}
          <div className="glass-strong rounded-xl p-4 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Filter className="w-4 h-4" />
              Filters
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  Severity
                </span>
                <div className="flex flex-wrap gap-2">
                  {severityFilters.map((level) => (
                    <Button
                      key={level}
                      variant={severityFilter === level ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setSeverityFilter(level)}
                      className={cn(
                        'capitalize',
                        severityFilter === level && level !== 'all' && 'shadow-glow'
                      )}
                    >
                      {level === 'all' ? (
                        'All'
                      ) : (
                        <SeverityBadge severity={level} className="border-0 bg-transparent p-0" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  Status
                </span>
                <div className="flex flex-wrap gap-2">
                  {(['all', 'pending', 'verified', 'resolved'] as StatusFilter[]).map((status) => (
                    <Button
                      key={status}
                      variant={statusFilter === status ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setStatusFilter(status)}
                      className="capitalize"
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          {viewMode === 'list' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <DamageCard
                    key={report.id}
                    report={report}
                  />
                ))
              ) : (
                <div className="col-span-full py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Reports Found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters to see more results.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gradient-card border border-border rounded-2xl overflow-hidden shadow-elevated">
              <div className="aspect-[16/9] bg-muted/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="w-16 h-16 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold">Map View</h3>
                    <p className="text-muted-foreground">
                      Interactive map coming soon. Connect to a mapping API to visualize damage
                      locations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mini list below map placeholder */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Recent Reports</span>
                  <span className="text-sm text-muted-foreground">
                    {filteredReports.length} total
                  </span>
                </div>
                <div className="space-y-2">
                  {filteredReports.slice(0, 3).map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/20"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-sm font-medium capitalize">{report.type}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {report.address}
                          </p>
                        </div>
                      </div>
                      <SeverityBadge severity={report.severity} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
