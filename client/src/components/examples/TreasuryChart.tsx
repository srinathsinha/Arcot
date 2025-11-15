import TreasuryChart from '../TreasuryChart';

export default function TreasuryChartExample() {
  const mockAllocations = [
    { asset: "ETH", percentage: 42, color: "#627EEA" },
    { asset: "USDC", percentage: 45, color: "#2775CA" },
    { asset: "BTC", percentage: 13, color: "#F7931A" }
  ];

  return <TreasuryChart allocations={mockAllocations} />;
}
