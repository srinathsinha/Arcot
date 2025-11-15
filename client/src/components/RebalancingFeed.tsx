import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowRightLeft, CheckCircle2, Loader2, XCircle, Activity } from "lucide-react";

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
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-600" />
          <h2 className="text-base font-semibold" data-testid="text-feed-title">
            Live Rebalancing Activity
          </h2>
          <Badge variant="secondary" className="ml-auto" data-testid="badge-count">
            {operations.length}
          </Badge>
        </div>
      </div>
      <div className="overflow-x-auto" data-testid="container-operations">
        {operations.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center" data-testid="empty-state">
            <Activity className="w-12 h-12 text-green-500 mb-3" />
            <p className="text-sm text-muted-foreground">No recent rebalancing activity</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[25%]">From</TableHead>
                <TableHead className="w-[25%]">To</TableHead>
                <TableHead className="w-[15%]">Price</TableHead>
                <TableHead className="w-[15%]">Time</TableHead>
                <TableHead className="w-[20%]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {operations.map((op) => (
                <TableRow
                  key={op.id}
                  className="hover-elevate transition-all"
                  data-testid={`operation-${op.id}`}
                >
                  <TableCell data-testid={`cell-from-${op.id}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{op.fromToken.icon}</span>
                      <div>
                        <div className="font-semibold text-sm">{op.fromToken.amount} {op.fromToken.symbol}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell data-testid={`cell-to-${op.id}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{op.toToken.icon}</span>
                      <div>
                        <div className="font-semibold text-sm">{op.toToken.amount} {op.toToken.symbol}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm" data-testid={`cell-price-${op.id}`}>
                    ${op.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground" data-testid={`cell-timestamp-${op.id}`}>
                    {op.timestamp}
                  </TableCell>
                  <TableCell data-testid={`cell-status-${op.id}`}>
                    {getStatusBadge(op.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </Card>
  );
}
