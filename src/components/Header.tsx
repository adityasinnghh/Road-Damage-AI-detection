import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Camera, LayoutDashboard, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: AlertTriangle },
    { path: '/detect', label: 'Detect', icon: Camera },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <AlertTriangle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Road<span className="text-gradient">Guard</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'gap-2',
                      isActive && 'bg-primary/10 text-primary'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="md:hidden flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(isActive && 'bg-primary/10 text-primary')}
                  >
                    <Icon className="w-5 h-5" />
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
