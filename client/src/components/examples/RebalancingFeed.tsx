import RebalancingFeed from '../RebalancingFeed';

export default function RebalancingFeedExample() {
  const mockOperations = [
    {
      id: "1",
      fromToken: { symbol: "USDC", icon: "💵", amount: 3000 },
      toToken: { symbol: "ETH", icon: "◆", amount: 0.9 },
      price: 3333,
      timestamp: "2m ago",
      status: "completed" as const
    },
    {
      id: "2",
      fromToken: { symbol: "ETH", icon: "◆", amount: 1.5 },
      toToken: { symbol: "BTC", icon: "₿", amount: 0.075 },
      price: 65000,
      timestamp: "5m ago",
      status: "pending" as const
    },
    {
      id: "3",
      fromToken: { symbol: "BTC", icon: "₿", amount: 0.1 },
      toToken: { symbol: "USDC", icon: "💵", amount: 6500 },
      price: 65000,
      timestamp: "8m ago",
      status: "completed" as const
    }
  ];

  return <RebalancingFeed operations={mockOperations} />;
}
