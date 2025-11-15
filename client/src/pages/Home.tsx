import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, TrendingUp, Zap, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-hero-title">
            Autonomous Risk & Compliance Officer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-hero-subtitle">
            AI-powered transaction monitoring and treasury management for crypto-native banks
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="p-6" data-testid="card-feature-1">
            <Shield className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Real-time Compliance</h3>
            <p className="text-sm text-muted-foreground">
              Monitor transactions globally with instant AML, sanctions, and geographic risk checks powered by x402 payments
            </p>
          </Card>

          <Card className="p-6" data-testid="card-feature-2">
            <TrendingUp className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Automated Rebalancing</h3>
            <p className="text-sm text-muted-foreground">
              Maintain optimal portfolio allocations across entities with autonomous treasury management and drift detection
            </p>
          </Card>

          <Card className="p-6" data-testid="card-feature-3">
            <Zap className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Sub-second compliance checks and &lt;5s AI-powered query responses for instant decision-making
            </p>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/monitor">
            <Card className="p-8 hover-elevate active-elevate-2 cursor-pointer transition-all group" data-testid="card-monitor">
              <div className="flex items-center justify-between mb-4">
                <Shield className="w-12 h-12 text-primary" />
                <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Monitor</h2>
              <p className="text-muted-foreground mb-4">
                View global transaction activity, flagged transactions, and compliance workflows with x402 payment integration
              </p>
              <div className="flex gap-2 flex-wrap">
                <div className="text-xs bg-muted px-2 py-1 rounded">Global Map</div>
                <div className="text-xs bg-muted px-2 py-1 rounded">Risk Analysis</div>
                <div className="text-xs bg-muted px-2 py-1 rounded">AI Chat</div>
              </div>
            </Card>
          </Link>

          <Link href="/treasury">
            <Card className="p-8 hover-elevate active-elevate-2 cursor-pointer transition-all group" data-testid="card-treasury">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-12 h-12 text-primary" />
                <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Treasury</h2>
              <p className="text-muted-foreground mb-4">
                Manage portfolios across entities, track drift metrics, and monitor automated rebalancing operations
              </p>
              <div className="flex gap-2 flex-wrap">
                <div className="text-xs bg-muted px-2 py-1 rounded">Portfolio View</div>
                <div className="text-xs bg-muted px-2 py-1 rounded">Drift Tracking</div>
                <div className="text-xs bg-muted px-2 py-1 rounded">Live Feed</div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
