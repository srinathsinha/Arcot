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
            <div className="rounded-lg border border-card-border bg-card shadow-sm overflow-hidden" data-testid="hero-flow">
              <div className="bg-muted/50 px-5 py-4 border-b border-card-border">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Demo Walkthrough</p>
                <h2 className="text-xl font-semibold mt-1">Start with one flagged inflow. End with a treasury action.</h2>
              </div>

              <div className="p-5 space-y-5">
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-md bg-red-600 text-white flex items-center justify-center text-sm font-semibold shrink-0">1</div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-semibold">Monitor flags 8,200 USDC</p>
                      <Badge variant="destructive">AML Flag</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">A new wallet sends funds from a risky geography with a darknet signal.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold shrink-0">2</div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-semibold">Arcot pays for deeper verification</p>
                      <Badge variant="outline">HTTP 402</Badge>
                      <Badge variant="outline">X-PAYMENT</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">The agent pays ChainGuard 0.005 USDC, retries the request, and stores the full API trace.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold shrink-0">3</div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-semibold">Treasury reviews the impact</p>
                      <Badge variant="outline">Hyperliquid</Badge>
                      <Badge variant="outline">CDP Wallet</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">An approved inflow breaches the USDC guardrail and opens a 5,000 USDC to ETH rebalance.</p>
                  </div>
                </div>

                <Link href="/monitor">
                  <Button className="w-full mt-2" data-testid="button-start-walkthrough">
                    Open the Monitor Demo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
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
