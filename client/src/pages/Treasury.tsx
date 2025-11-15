import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import PortfolioView, { type EntityPortfolio } from "@/components/PortfolioView";
import PortfolioMetrics, { type Metrics } from "@/components/PortfolioMetrics";
import RebalancingFeed, { type RebalanceOperation } from "@/components/RebalancingFeed";

export default function Treasury() {
  const metrics: Metrics = {
    totalValue: 2450000,
    driftPercentage: 3.2,
    lastRebalance: "15m ago",
    activeOperations: 2
  };

  const portfolios: EntityPortfolio[] = [
    {
      id: "1",
      name: "Market Maker A",
      tokens: [
        { symbol: "ETH", amount: 50, currentPercentage: 45, targetPercentage: 40, icon: "◆" },
        { symbol: "USDC", amount: 100000, currentPercentage: 40, targetPercentage: 45, icon: "💵" },
        { symbol: "BTC", amount: 2, currentPercentage: 15, targetPercentage: 15, icon: "₿" }
      ]
    },
    {
      id: "2",
      name: "Liquidity Pool B",
      tokens: [
        { symbol: "ETH", amount: 30, currentPercentage: 50, targetPercentage: 45, icon: "◆" },
        { symbol: "USDC", amount: 50000, currentPercentage: 35, targetPercentage: 40, icon: "💵" },
        { symbol: "BTC", amount: 1.5, currentPercentage: 15, targetPercentage: 15, icon: "₿" }
      ]
    },
    {
      id: "3",
      name: "Reserve Fund C",
      tokens: [
        { symbol: "ETH", amount: 20, currentPercentage: 38, targetPercentage: 40, icon: "◆" },
        { symbol: "USDC", amount: 75000, currentPercentage: 48, targetPercentage: 45, icon: "💵" },
        { symbol: "BTC", amount: 1, currentPercentage: 14, targetPercentage: 15, icon: "₿" }
      ]
    }
  ];

  const operations: RebalanceOperation[] = [
    {
      id: "1",
      fromToken: { symbol: "USDC", icon: "💵", amount: 3000 },
      toToken: { symbol: "ETH", icon: "◆", amount: 0.9 },
      price: 3333,
      timestamp: "2m ago",
      status: "completed"
    },
    {
      id: "2",
      fromToken: { symbol: "ETH", icon: "◆", amount: 1.5 },
      toToken: { symbol: "BTC", icon: "₿", amount: 0.075 },
      price: 65000,
      timestamp: "5m ago",
      status: "pending"
    },
    {
      id: "3",
      fromToken: { symbol: "BTC", icon: "₿", amount: 0.1 },
      toToken: { symbol: "USDC", icon: "💵", amount: 6500 },
      price: 65000,
      timestamp: "8m ago",
      status: "completed"
    },
    {
      id: "4",
      fromToken: { symbol: "USDC", icon: "💵", amount: 5000 },
      toToken: { symbol: "ETH", icon: "◆", amount: 1.5 },
      price: 3333,
      timestamp: "12m ago",
      status: "completed"
    }
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-treasury">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2 mb-4" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-xl font-semibold mb-1" data-testid="text-page-title">
            Treasury Management
          </h1>
          <p className="text-sm text-muted-foreground" data-testid="text-page-subtitle">
            Automated portfolio rebalancing and drift tracking
          </p>
        </div>

        <div className="space-y-6">
          <PortfolioMetrics metrics={metrics} />
          <PortfolioView portfolios={portfolios} />
          <RebalancingFeed operations={operations} />
        </div>
      </div>
    </div>
  );
}
