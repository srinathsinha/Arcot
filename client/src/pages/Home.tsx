import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, ArrowRight, Activity, DollarSign, Network, Wallet, BarChart3, Zap, Workflow } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      {/* Hero Section */}
      <div className="border-b border-card-border">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-bold mb-6" data-testid="text-hero-title">
            Arcot
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="text-hero-subtitle">
            Autonomous Risk Compliance Ops and Treasury for on-chain finance
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/monitor">
              <Button size="lg" data-testid="button-get-started">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const element = document.getElementById('how-it-works');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              data-testid="button-learn-more"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="border-b border-card-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center" data-testid="text-problem-title">
              Problem
            </h2>
            <p className="text-2xl text-foreground mb-8 text-center" data-testid="text-problem-description">
              Compliance/Treasury Ops isn't ready for onchain + agentic scale
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6" data-testid="card-problem-1">
                <BarChart3 className="w-8 h-8 text-yellow-600 mb-3" />
                <h3 className="text-base font-semibold mb-2">Scale</h3>
                <p className="text-sm text-muted-foreground">
                  Risk/Compliance systems need to scale from <span className="font-bold text-foreground">millions</span> of daily txns in trad-fi to <span className="font-bold text-foreground">billions</span> for agentic commerce systems
                </p>
              </Card>
              <Card className="p-6" data-testid="card-problem-2">
                <Zap className="w-8 h-8 text-yellow-600 mb-3" />
                <h3 className="text-base font-semibold mb-2">Speed</h3>
                <p className="text-sm text-muted-foreground">
                  Transactions need to get validated proactively in <span className="font-bold text-foreground">seconds</span> not reactively in <span className="font-bold text-foreground">weeks</span>
                </p>
              </Card>
              <Card className="p-6" data-testid="card-problem-3">
                <Workflow className="w-8 h-8 text-yellow-600 mb-3" />
                <h3 className="text-base font-semibold mb-2">Flexibility</h3>
                <p className="text-sm text-muted-foreground">
                  Need to eliminate reliance on human workforce for sudden spikes in scale
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Product Modules */}
      <div className="border-b border-card-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-12 text-center" data-testid="text-modules-title">
            Product Modules
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Link href="/monitor">
              <Card className="p-8 hover-elevate active-elevate-2 cursor-pointer transition-all group" data-testid="card-monitor">
                <div className="flex items-center justify-between mb-4">
                  <Shield className="w-12 h-12 text-primary" />
                  <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">Monitor</h2>
                <p className="text-muted-foreground mb-6">
                  Track global transaction flows, review flagged activities, and interact with compliance agents through intelligent workflows
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">Global Activity</Badge>
                  <Badge variant="secondary" className="text-xs">Agent Analysis</Badge>
                  <Badge variant="secondary" className="text-xs">x402 Verification</Badge>
                </div>
              </Card>
            </Link>

            <Link href="/treasury">
              <Card className="p-8 hover-elevate active-elevate-2 cursor-pointer transition-all group" data-testid="card-treasury">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-12 h-12 text-primary" />
                  <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">Treasury</h2>
                <p className="text-muted-foreground mb-6">
                  Oversee multi-entity portfolios, monitor allocation drift, and observe autonomous agent rebalancing in real-time
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">Multi-Entity View</Badge>
                  <Badge variant="secondary" className="text-xs">Drift Metrics</Badge>
                  <Badge variant="secondary" className="text-xs">Agent Operations</Badge>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </div>

      {/* How Arcot Works */}
      <div id="how-it-works" className="bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-12 text-center" data-testid="text-how-it-works-title">
            How Arcot Works
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-6" data-testid="step-1">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Transaction Monitoring</h3>
                  <p className="text-sm text-muted-foreground">
                    Agents continuously monitor onchain activity, flagging suspicious transactions based on darknet exposure, sanctions lists, velocity patterns, and geographic risk indicators.
                  </p>
                </div>
              </div>

              <div className="flex gap-6" data-testid="step-2">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">x402 Payment Protocol</h3>
                  <p className="text-sm text-muted-foreground">
                    Compliance checks use HTTP 402 payment challenges. Sender and receiver agents pay micro-amounts (0.002-0.003 USDC) to access verification services, creating an auditable payment trail.
                  </p>
                </div>
              </div>

              <div className="flex gap-6" data-testid="step-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <Network className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Agent to Agent verification of Risk/Compliance</h3>
                  <p className="text-sm text-muted-foreground">
                    Sender and receiver agents independently verify transaction parties. Alert agents generate risk assessments. QA agents review findings and produce final verdicts—all coordinated autonomously.
                  </p>
                </div>
              </div>

              <div className="flex gap-6" data-testid="step-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Treasury Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Portfolio agents track allocation drift across multiple entities. When thresholds are exceeded, rebalancing agents execute swaps via Hyperliquid or other DEXs—maintaining target allocations without human intervention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
