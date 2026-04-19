import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, ArrowRight, Activity, DollarSign, Network, Wallet, BarChart3, Zap, Workflow, SearchCheck } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      <div className="border-b border-card-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div>
              <Badge variant="secondary" className="mb-5">Demo mode: simulated x402 + CDP traces</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight" data-testid="text-hero-title">
                Autonomous Risk, Compliance Operations & Treasury AI for On-Chain Finance
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mb-8" data-testid="text-hero-subtitle">
                Give your institution a real-time control plane for on-chain risk, compliance decisions, and treasury moves, with every step executed and auditable onchain.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/monitor">
                  <Button size="lg" data-testid="button-get-started">
                    View Demo
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
                  How Arcot Works
                </Button>
              </div>
            </div>
            <div className="rounded-lg border border-card-border bg-card p-5 shadow-sm" data-testid="hero-flow">
              <div className="flex items-center justify-between gap-3 border-b border-card-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-red-50 dark:bg-red-950/20 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">8,200 USDC inflow</p>
                    <p className="text-xs text-muted-foreground">New wallet, risky geography, darknet signal</p>
                  </div>
                </div>
                <Badge variant="destructive" className="shrink-0">AML Flag</Badge>
              </div>

              <div className="py-5">
                <div className="rounded-md bg-primary text-primary-foreground p-4">
                  <p className="text-sm font-semibold">Arcot Compliance Agent</p>
                  <p className="text-xs opacity-90 mt-1">Checks both wallets, pays tools, records every API call.</p>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="flex items-start gap-3 rounded-md border border-card-border p-3">
                  <DollarSign className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold">Pays ChainGuard Compliance</p>
                      <Badge variant="outline" className="text-[10px]">HTTP 402 + X-PAYMENT</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">0.005 USDC total spend across sender and receiver checks.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-md border border-card-border p-3">
                  <SearchCheck className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold">Returns risk verdict</p>
                      <Badge variant="outline" className="text-[10px]">Locus / x402 Bazaar</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Receiver links to Silk Road 2.0 cluster with 87/100 risk score.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-md border border-card-border p-3">
                  <Wallet className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold">Hands off to Treasury</p>
                      <Badge variant="outline" className="text-[10px]">CDP Agent Wallet</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Approved inflows trigger guardrails and a Hyperliquid rebalance review.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="border-b border-card-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center" data-testid="text-problem-title">
              Onchain finance still runs on manual risk ops.
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6" data-testid="card-problem-1">
                <BarChart3 className="w-8 h-8 text-yellow-600 mb-3" />
                <p className="text-sm text-muted-foreground">
                  High-risk inflows are flagged, but humans often review them days or weeks after funds move.
                </p>
              </Card>
              <Card className="p-6" data-testid="card-problem-2">
                <Zap className="w-8 h-8 text-yellow-600 mb-3" />
                <p className="text-sm text-muted-foreground">
                  Compliance, risk, and treasury teams work in different tools, with no unified view of onchain exposure.
                </p>
              </Card>
              <Card className="p-6" data-testid="card-problem-3">
                <Workflow className="w-8 h-8 text-yellow-600 mb-3" />
                <p className="text-sm text-muted-foreground">
                  No one is giving agents the ability to pay other tools on demand, so risk analysis stays shallow.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* System Pillars */}
      <div className="border-b border-card-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">
            What Arcot Is
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6" data-testid="card-pillar-1">
                <Shield className="w-8 h-8 text-primary mb-3" />
                <Badge variant="outline" className="mb-3 text-[10px]">System Pillar</Badge>
                <h3 className="text-base font-semibold mb-2">Autonomous AML & Sanctions Intelligence</h3>
                <p className="text-sm text-muted-foreground">
                  Agents continuously scan transaction flows, trigger deeper checks, and use x402 payments to call third-party intelligence providers.
                </p>
              </Card>
              <Card className="p-6" data-testid="card-pillar-2">
                <Wallet className="w-8 h-8 text-primary mb-3" />
                <Badge variant="outline" className="mb-3 text-[10px]">System Pillar</Badge>
                <h3 className="text-base font-semibold mb-2">Autonomous Treasury Operations</h3>
                <p className="text-sm text-muted-foreground">
                  Agents track allocation drift and liquidity risk, then execute rebalancing moves using CDP Agent Wallets.
                </p>
              </Card>
              <Card className="p-6" data-testid="card-pillar-3">
                <SearchCheck className="w-8 h-8 text-primary mb-3" />
                <Badge variant="outline" className="mb-3 text-[10px]">System Pillar</Badge>
                <h3 className="text-base font-semibold mb-2">Machine-to-Machine Toolchains</h3>
                <p className="text-sm text-muted-foreground">
                  Agents discover, pay, and chain tools from Locus and x402 Bazaar without billing dashboards or manual invoices.
                </p>
              </Card>
          </div>
        </div>
      </div>

      {/* Product Modules */}
      <div className="border-b border-card-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-12 text-center" data-testid="text-modules-title">
            The Arcot Product
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
                  Track global transaction flows, investigate flagged inflows, and inspect every x402 payment and tool call your agents made.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">Global Activity</Badge>
                  <Badge variant="secondary" className="text-xs">Agent Trails</Badge>
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
                  Oversee multi-entity portfolios, monitor allocation drift, and watch agents execute rebalancing operations via CDP wallets.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">Multi-Entity View</Badge>
                  <Badge variant="secondary" className="text-xs">Drift Metrics</Badge>
                  <Badge variant="secondary" className="text-xs">Agent Execution</Badge>
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
                  <h3 className="text-lg font-semibold mb-2">Detect</h3>
                  <p className="text-sm text-muted-foreground">
                    A high-risk inflow hits your address. Arcot flags it using rules and pattern analysis.
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
                  <h3 className="text-lg font-semibold mb-2">Verify and Pay</h3>
                  <p className="text-sm text-muted-foreground">
                    An agent calls a Locus-discoverable tool, receives HTTP 402 Payment Required, pays with a CDP Agent Wallet, and retries with X-PAYMENT.
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
                  <h3 className="text-lg font-semibold mb-2">Decide</h3>
                  <p className="text-sm text-muted-foreground">
                    The tool returns a verdict and Arcot recommends block, allow, or escalate with the full API trail visible.
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
                  <h3 className="text-lg font-semibold mb-2">Act</h3>
                  <p className="text-sm text-muted-foreground">
                    If approved, Treasury reviews the portfolio impact and runs an agent-to-agent Hyperliquid rebalancing flow.
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
