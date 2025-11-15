import PortfolioView from '../PortfolioView';

export default function PortfolioViewExample() {
  const mockPortfolios = [
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
    }
  ];

  return <PortfolioView portfolios={mockPortfolios} />;
}
