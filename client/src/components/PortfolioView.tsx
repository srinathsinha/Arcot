import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export interface EntityPortfolio {
  id: string;
  name: string;
  tokens: {
    symbol: string;
    amount: number;
    currentPercentage: number;
    targetPercentage: number;
    icon: string;
  }[];
}

interface PortfolioViewProps {
  portfolios: EntityPortfolio[];
}

export default function PortfolioView({ portfolios }: PortfolioViewProps) {
  const getDriftColor = (current: number, target: number) => {
    const diff = Math.abs(current - target);
    if (diff < 2) return "text-green-600 dark:text-green-500";
    if (diff < 5) return "text-yellow-600 dark:text-yellow-500";
    return "text-red-600 dark:text-red-500";
  };

  const getProgressColor = (current: number, target: number) => {
    const diff = Math.abs(current - target);
    if (diff < 2) return "bg-green-500";
    if (diff < 5) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="container-portfolios">
      {portfolios.map((portfolio) => (
        <Card key={portfolio.id} className="p-6" data-testid={`card-portfolio-${portfolio.id}`}>
          <h3 className="text-base font-semibold mb-4" data-testid={`text-name-${portfolio.id}`}>
            {portfolio.name}
          </h3>
          
          <div className="space-y-4">
            {portfolio.tokens.map((token, idx) => (
              <div key={idx} data-testid={`token-${portfolio.id}-${token.symbol}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl" data-testid={`icon-${token.symbol}`}>{token.icon}</span>
                    <span className="font-medium text-sm" data-testid={`symbol-${token.symbol}`}>
                      {token.symbol}
                    </span>
                  </div>
                  <span 
                    className={`text-sm font-semibold ${getDriftColor(token.currentPercentage, token.targetPercentage)}`}
                    data-testid={`percentage-${token.symbol}`}
                  >
                    {token.currentPercentage}%
                  </span>
                </div>
                
                <div className="space-y-1">
                  <Progress 
                    value={token.currentPercentage} 
                    className="h-2"
                    data-testid={`progress-${token.symbol}`}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Current</span>
                    <span>Target: {token.targetPercentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
