import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, DollarSign } from "lucide-react";

export interface ApprovedTransaction {
  id: string;
  numericId: number;
  token: string;
  amount: number;
  from: string;
  to: string;
  timestamp: string;
  approvedBy: string;
  status: "approved" | "processed" | "settled" | "executed";
}

interface RecentTransactionsTableProps {
  transactions: ApprovedTransaction[];
}

export default function RecentTransactionsTable({ transactions }: RecentTransactionsTableProps) {
  const truncateAddress = (address: string) => {
    if (address.length <= 15) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getStatusBadge = (status: ApprovedTransaction["status"]) => {
    const variants: Record<string, { variant: any; label: string }> = {
      "approved": { variant: "default", label: "Approved" },
      "processed": { variant: "secondary", label: "Processed" },
      "settled": { variant: "default", label: "Settled" },
      "executed": { variant: "default", label: "Executed" }
    };
    
    const config = variants[status];
    return (
      <Badge variant={config.variant} className="text-xs gap-1">
        <CheckCircle2 className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const formatAmount = (amount: number, token: string) => {
    if (token === "USDC" && amount >= 1000) {
      return `$${amount.toLocaleString()}`;
    }
    return `${amount.toLocaleString()} ${token}`;
  };

  return (
    <Card className="flex flex-col" data-testid="card-recent-transactions">
      <div className="p-4 border-b border-card-border">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-600" />
          <h2 className="text-base font-semibold" data-testid="text-table-title">
            Recent Transactions
          </h2>
          <Badge variant="secondary" className="ml-auto" data-testid="badge-count">
            {transactions.length}
          </Badge>
        </div>
      </div>
      <div className="overflow-x-auto" data-testid="container-table">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center" data-testid="empty-state">
            <CheckCircle2 className="w-12 h-12 text-green-500 mb-3" />
            <p className="text-sm text-muted-foreground">No recent transactions</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[18%]">From</TableHead>
                <TableHead className="w-[18%]">To</TableHead>
                <TableHead className="w-[15%]">Amount</TableHead>
                <TableHead className="w-[12%]">Time</TableHead>
                <TableHead className="w-[20%]">Approved By</TableHead>
                <TableHead className="w-[17%]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow
                  key={tx.id}
                  className="hover-elevate transition-all"
                  data-testid={`row-transaction-${tx.id}`}
                >
                  <TableCell className="font-mono text-xs" data-testid={`cell-from-${tx.id}`}>
                    {truncateAddress(tx.from)}
                  </TableCell>
                  <TableCell className="font-mono text-xs" data-testid={`cell-to-${tx.id}`}>
                    {truncateAddress(tx.to)}
                  </TableCell>
                  <TableCell className="font-semibold" data-testid={`cell-amount-${tx.id}`}>
                    {formatAmount(tx.amount, tx.token)}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground" data-testid={`cell-time-${tx.id}`}>
                    {tx.timestamp}
                  </TableCell>
                  <TableCell className="text-xs" data-testid={`cell-approved-by-${tx.id}`}>
                    {tx.approvedBy}
                  </TableCell>
                  <TableCell data-testid={`cell-status-${tx.id}`}>
                    {getStatusBadge(tx.status)}
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
