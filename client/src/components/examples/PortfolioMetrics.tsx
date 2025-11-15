import PortfolioMetrics from '../PortfolioMetrics';

export default function PortfolioMetricsExample() {
  const mockMetrics = {
    totalValue: 2450000,
    driftPercentage: 3.2,
    lastRebalance: "15m ago",
    activeOperations: 2
  };

  return <PortfolioMetrics metrics={mockMetrics} />;
}
