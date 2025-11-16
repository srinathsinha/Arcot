import PortfolioView, { type EntityPortfolio } from "@/components/PortfolioView";
import PortfolioMetrics, { type Metrics } from "@/components/PortfolioMetrics";
import RebalancingFeed, { type RebalanceOperation } from "@/components/RebalancingFeed";
import RecentTransactionsTable, { type ApprovedTransaction } from "@/components/RecentTransactionsTable";
import PortfolioGuardrailAlert from "@/components/PortfolioGuardrailAlert";

export default function Treasury() {
  const metrics: Metrics = {
    totalValue: 2450000,
    driftPercentage: 8.5, // High drift to trigger guardrail alert
    lastRebalance: "15m ago",
    activeOperations: 2
  };

  // Guardrail alert triggers when drift exceeds 5%
  const guardrailRecommendation = metrics.driftPercentage > 5.0 ? {
    fromToken: "ETH",
    fromAmount: 15,
    toToken: "USDC",
    toAmount: 50000,
    exchange: "Hyperliquid",
    reason: "Coinbase Commerce portfolio drift exceeded 5% threshold. ETH allocation is 8.5% above target.",
    currentDrift: 8.5,
    targetDrift: 2.0,
  } : null;

  const portfolios: EntityPortfolio[] = [
    {
      id: "1",
      name: "Coinbase Commerce",
      tokens: [
        { symbol: "ETH", amount: 50, currentPercentage: 45, targetPercentage: 40, icon: "◆" },
        { symbol: "USDC", amount: 100000, currentPercentage: 40, targetPercentage: 45, icon: "💵" },
        { symbol: "BTC", amount: 2, currentPercentage: 15, targetPercentage: 15, icon: "₿" }
      ]
    },
    {
      id: "2",
      name: "Stripe Treasury",
      tokens: [
        { symbol: "ETH", amount: 30, currentPercentage: 50, targetPercentage: 45, icon: "◆" },
        { symbol: "USDC", amount: 50000, currentPercentage: 35, targetPercentage: 40, icon: "💵" },
        { symbol: "BTC", amount: 1.5, currentPercentage: 15, targetPercentage: 15, icon: "₿" }
      ]
    },
    {
      id: "3",
      name: "Shopify Payments",
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

  const recentTransactions: ApprovedTransaction[] = [
    {
      id: "tx-101",
      numericId: 101,
      token: "USDC",
      amount: 50000,
      from: "0xa1b2c3d4e5f6",
      to: "0x9876543210ab",
      timestamp: "3m ago",
      approvedBy: "Compliance Agent",
      status: "settled"
    },
    {
      id: "tx-102",
      numericId: 102,
      token: "ETH",
      amount: 12.5,
      from: "0xabcdef123456",
      to: "0x654321fedcba",
      timestamp: "7m ago",
      approvedBy: "Risk Manager",
      status: "processed"
    },
    {
      id: "tx-103",
      numericId: 103,
      token: "BTC",
      amount: 0.85,
      from: "0x1234567890ab",
      to: "0xabcdef012345",
      timestamp: "11m ago",
      approvedBy: "Compliance Agent",
      status: "settled"
    },
    {
      id: "tx-104",
      numericId: 104,
      token: "USDC",
      amount: 125000,
      from: "0x9988776655aa",
      to: "0xbbccddee1122",
      timestamp: "15m ago",
      approvedBy: "Treasury Ops",
      status: "settled"
    }
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-treasury">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold mb-1" data-testid="text-page-title">
            Treasury Management
          </h1>
          <p className="text-sm text-muted-foreground" data-testid="text-page-subtitle">
            Automated portfolio rebalancing and drift tracking
          </p>
        </div>

        <div className="space-y-6">
          <PortfolioMetrics metrics={metrics} />
          <PortfolioGuardrailAlert recommendation={guardrailRecommendation} />
          <PortfolioView portfolios={portfolios} />
          <div className="grid lg:grid-cols-2 gap-6">
            <RebalancingFeed operations={operations} />
            <RecentTransactionsTable transactions={recentTransactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
