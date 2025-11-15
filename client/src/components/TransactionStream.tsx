import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export type TransactionStatus = "pending" | "high-risk" | "approved" | "processing";

export interface Transaction {
  id: string;
  hash: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  from: string;
  to: string;
}

interface TransactionStreamProps {
  transactions: Transaction[];
  highlightedId?: string;
}

export default function TransactionStream({ transactions, highlightedId }: TransactionStreamProps) {
  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="uppercase text-xs tracking-wide" data-testid={`badge-status-pending`}>
            Pending
          </Badge>
        );
      case "high-risk":
        return (
          <Badge variant="destructive" className="uppercase text-xs tracking-wide gap-1" data-testid={`badge-status-high-risk`}>
            <AlertTriangle className="w-3 h-3" />
            High Risk
          </Badge>
        );
      case "approved":
        return (
          <Badge className="uppercase text-xs tracking-wide gap-1 bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800" data-testid={`badge-status-approved`}>
            <CheckCircle2 className="w-3 h-3" />
            Approved
          </Badge>
        );
      case "processing":
        return (
          <Badge className="uppercase text-xs tracking-wide bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800" data-testid={`badge-status-processing`}>
            Processing
          </Badge>
        );
    }
  };

  const truncateHash = (hash: string) => {
    if (hash.length <= 15) return hash;
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  return (
    <Card className="flex flex-col h-full" data-testid="card-transaction-stream">
      <div className="p-4 border-b border-card-border">
        <h2 className="text-base font-semibold" data-testid="text-transaction-stream-title">
          Transaction Stream
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto max-h-[500px]" data-testid="container-transactions">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className={`p-3 border-b border-card-border last:border-b-0 hover-elevate transition-all ${
              highlightedId === tx.id ? "border-l-4 border-l-primary bg-accent/50" : ""
            }`}
            data-testid={`row-transaction-${tx.id}`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="font-mono text-xs text-muted-foreground mb-1" data-testid={`text-hash-${tx.id}`}>
                  {truncateHash(tx.hash)}
                </div>
                <div className="text-sm font-semibold" data-testid={`text-amount-${tx.id}`}>
                  {tx.amount.toLocaleString()} {tx.currency}
                </div>
              </div>
              {getStatusBadge(tx.status)}
            </div>
            <div className="flex gap-2 text-xs text-muted-foreground">
              <span className="font-mono" data-testid={`text-from-${tx.id}`}>{truncateHash(tx.from)}</span>
              <span>→</span>
              <span className="font-mono" data-testid={`text-to-${tx.id}`}>{truncateHash(tx.to)}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
