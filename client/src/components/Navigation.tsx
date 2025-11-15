import { Link, useLocation } from "wouter";
import { Home, Shield, TrendingUp } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();

  const tabs = [
    { path: "/", label: "Home", icon: Home },
    { path: "/monitor", label: "Monitor", icon: Shield },
    { path: "/treasury", label: "Treasury", icon: TrendingUp },
  ];

  return (
    <nav className="border-b border-card-border bg-background sticky top-0 z-50" data-testid="navigation">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center h-16">
          <div className="flex items-center gap-8">
            <div className="font-bold text-xl" data-testid="text-logo">
              Arcot
            </div>
            <div className="flex gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = location === tab.path;
                
                return (
                  <Link key={tab.path} href={tab.path}>
                    <button
                      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover-elevate"
                      }`}
                      data-testid={`tab-${tab.label.toLowerCase()}`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
