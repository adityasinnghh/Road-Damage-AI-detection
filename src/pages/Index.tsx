import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import {
  Camera,
  MapPin,
  AlertTriangle,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: 'Real-Time Detection',
    description: 'AI-powered camera analysis detects potholes and road cracks while you drive.',
  },
  {
    icon: MapPin,
    title: 'GPS Tracking',
    description: 'Automatic location tagging with precise coordinates for every detected issue.',
  },
  {
    icon: AlertTriangle,
    title: 'Severity Classification',
    description: 'Smart classification system rates damage from low to critical priority.',
  },
  {
    icon: BarChart3,
    title: 'Centralized Dashboard',
    description: 'All reports aggregated in a unified dashboard for municipal review.',
  },
];

const benefits = [
  'Reduce vehicle damage claims',
  'Prioritize road repairs efficiently',
  'Real-time municipal updates',
  'Community-driven reporting',
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium animate-fade-in">
              <Shield className="w-4 h-4 text-primary" />
              <span>AI-Powered Road Safety</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight animate-fade-in-up">
              Detect Road Damage
              <span className="block text-gradient">In Real Time</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Smartphone-based AI detection system that identifies potholes and road cracks,
              automatically uploading GPS locations and severity levels to municipal dashboards.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Link to="/detect">
                <Button variant="hero" size="xl" className="group">
                  Start Detecting
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="xl">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered system makes road damage detection simple and efficient.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-gradient-card border border-border rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-gradient-card border border-border rounded-3xl p-8 md:p-12 shadow-elevated">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Safer Roads,
                  <span className="block text-gradient">Smarter Cities</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Help municipalities stay ahead of road maintenance with instant,
                  crowd-sourced damage reports powered by artificial intelligence.
                </p>
                <Link to="/detect">
                  <Button variant="default" size="lg" className="group">
                    Get Started
                    <Zap className="w-4 h-4 ml-2 group-hover:animate-pulse" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/50 animate-slide-in-right"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 RoadGuard II developed by ADi team.</p>
        </div>
      </footer>
    </div>
  );
}
