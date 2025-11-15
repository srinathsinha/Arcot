import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightLeft, CheckCircle2, Loader2, XCircle } from "lucide-react";

export interface RebalanceOperation {
  id: string;
  fromToken: {
    symbol: string;
    icon: string;
    amount: number;
  };
  toToken: {
    symbol: string;
    icon: string;
    amount: number;
  };
  price: number;
  timestamp: string;
  status: "pending" | "completed" | "failed";
}

interface RebalancingFeedProps {
  operations: RebalanceOperation[];
}

export default function RebalancingFeed({ operations }: RebalancingFeedProps) {
  const getStatusBadge = (status: RebalanceOperation["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="gap-1 bg-blue-600 hover:bg-blue-700" data-testid="badge-pending">
            <Loader2 className="w-3 h-3 animate-spin" />
            Pending
          </Badge>
        );
      case "completed":
        return (
          <Badge className="gap-1 bg-green-600 hover:bg-green-700" data-testid="badge-completed">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive" className="gap-1" data-testid="badge-failed">
            <XCircle className="w-3 h-3" />
            Failed
          </Badge>
        );
    }
  };

  return (
    <Card className="flex flex-col" data-testid="card-rebalancing-feed">
      <div className="p-4 border-b border-card-border">
        <h2 className="text-base font-semibold" data-testid="text-feed-title">
          Live Rebalancing Activity
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto max-h-[400px]" data-testid="container-operations">
        {operations.length === 0 ? (
          <div className="flex items-center justify-center p-12 text-center" data-testid="empty-state">
            <p className="text-sm text-muted-foreground">No recent rebalancing activity</p>
          </div>
        ) : (
          <div className="divide-y divide-card-border">
            {operations.map((op) => (
              <div 
                key={op.id} 
                className="p-4 hover-elevate transition-all"
                data-testid={`operation-${op.id}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="flex items-center gap-1" data-testid={`from-${op.id}`}>
                      <span className="text-2xl">{op.fromToken.icon}</span>
                      <span className="font-medium text-sm">{op.fromToken.symbol}</span>
                      <span className="text-sm text-muted-foreground">{op.fromToken.amount}</span>
                    </div>
                    
                    <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
                    
                    <div className="flex items-center gap-1" data-testid={`to-${op.id}`}>
                      <span className="text-2xl">{op.toToken.icon}</span>
                      <span className="font-medium text-sm">{op.toToken.symbol}</span>
                      <span className="text-sm text-muted-foreground">{op.toToken.amount}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-mono text-muted-foreground mb-1" data-testid={`price-${op.id}`}>
                      @ ${op.price.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-xs text-muted-foreground" data-testid={`timestamp-${op.id}`}>
                        {op.timestamp}
                      </span>
                      {getStatusBadge(op.status)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
