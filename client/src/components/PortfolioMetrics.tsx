import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, Clock } from "lucide-react";

export interface Metrics {
  totalValue: number;
  driftPercentage: number;
  lastRebalance: string;
  activeOperations: number;
}

interface PortfolioMetricsProps {
  metrics: Metrics;
}

export default function PortfolioMetrics({ metrics }: PortfolioMetricsProps) {
  const getDriftColor = (drift: number) => {
    const absDrift = Math.abs(drift);
    if (absDrift < 2) return "text-green-600 dark:text-green-500";
    if (absDrift < 5) return "text-yellow-600 dark:text-yellow-500";
    return "text-red-600 dark:text-red-500";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" data-testid="container-metrics">
      <Card className="p-4" data-testid="card-total-value">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total Portfolio Value</p>
            <p className="text-2xl font-semibold" data-testid="text-total-value">
              ${metrics.totalValue.toLocaleString()}
            </p>
          </div>
          <TrendingUp className="w-8 h-8 text-primary/30" />
        </div>
      </Card>

      <Card className="p-4" data-testid="card-drift">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Overall Drift</p>
            <p className={`text-2xl font-semibold ${getDriftColor(metrics.driftPercentage)}`} data-testid="text-drift">
              {metrics.driftPercentage > 0 ? "+" : ""}{metrics.driftPercentage}%
            </p>
          </div>
          {metrics.driftPercentage >= 0 ? (
            <TrendingUp className={`w-8 h-8 ${getDriftColor(metrics.driftPercentage)}/30`} />
          ) : (
            <TrendingDown className={`w-8 h-8 ${getDriftColor(metrics.driftPercentage)}/30`} />
          )}
        </div>
      </Card>

      <Card className="p-4" data-testid="card-last-rebalance">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Last Rebalance</p>
            <p className="text-2xl font-semibold" data-testid="text-last-rebalance">
              {metrics.lastRebalance}
            </p>
          </div>
          <Clock className="w-8 h-8 text-primary/30" />
        </div>
      </Card>

      <Card className="p-4" data-testid="card-active-ops">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Active Operations</p>
            <p className="text-2xl font-semibold" data-testid="text-active-ops">
              {metrics.activeOperations}
            </p>
          </div>
          <Activity className="w-8 h-8 text-primary/30" />
        </div>
      </Card>
    </div>
  );
}
