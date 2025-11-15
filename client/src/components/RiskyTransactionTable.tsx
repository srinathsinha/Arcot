import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield } from "lucide-react";

export interface RiskyTransaction {
  id: string;
  token: string;
  amount: number;
  from: string;
  to: string;
  timestamp: string;
  complianceResult: "AML Flag" | "Sanctions Match" | "Velocity Check" | "Geographic Risk" | "Pattern Detection";
  latency: number;
  riskLevel: "suspicious" | "confirmed";
}

interface RiskyTransactionTableProps {
  transactions: RiskyTransaction[];
  onTransactionClick: (transaction: RiskyTransaction) => void;
  selectedId?: string;
}

export default function RiskyTransactionTable({ 
  transactions, 
  onTransactionClick,
  selectedId 
}: RiskyTransactionTableProps) {
  const truncateAddress = (address: string) => {
    if (address.length <= 15) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getComplianceBadge = (result: RiskyTransaction["complianceResult"]) => {
    const variants: Record<string, any> = {
      "AML Flag": "destructive",
      "Sanctions Match": "destructive",
      "Velocity Check": "default",
      "Geographic Risk": "default",
      "Pattern Detection": "default"
    };
    
    return (
      <Badge variant={variants[result]} className="text-xs">
        {result}
      </Badge>
    );
  };

  const getLatencyColor = (latency: number) => {
    if (latency < 100) return "text-green-600 dark:text-green-500";
    if (latency < 300) return "text-yellow-600 dark:text-yellow-500";
    return "text-red-600 dark:text-red-500";
  };

  return (
    <Card className="flex flex-col" data-testid="card-risky-transactions">
      <div className="p-4 border-b border-card-border">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-yellow-600" />
          <h2 className="text-base font-semibold" data-testid="text-table-title">
            Flagged Transactions
          </h2>
          <Badge variant="secondary" className="ml-auto" data-testid="badge-count">
            {transactions.length}
          </Badge>
        </div>
      </div>
      <div className="overflow-x-auto" data-testid="container-table">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center" data-testid="empty-state">
            <Shield className="w-12 h-12 text-green-500 mb-3" />
            <p className="text-sm text-muted-foreground">No risky transactions detected</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[15%]">Token</TableHead>
                <TableHead className="w-[20%]">From</TableHead>
                <TableHead className="w-[20%]">To</TableHead>
                <TableHead className="w-[15%]">Time</TableHead>
                <TableHead className="w-[20%]">Compliance</TableHead>
                <TableHead className="w-[10%] text-right">Latency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow
                  key={tx.id}
                  onClick={() => onTransactionClick(tx)}
                  className={`cursor-pointer hover-elevate transition-all ${
                    selectedId === tx.id ? "border-l-4 border-l-primary bg-accent/30" : ""
                  }`}
                  data-testid={`row-transaction-${tx.id}`}
                >
                  <TableCell className="font-medium" data-testid={`cell-token-${tx.id}`}>
                    {tx.token}
                  </TableCell>
                  <TableCell className="font-mono text-xs" data-testid={`cell-from-${tx.id}`}>
                    {truncateAddress(tx.from)}
                  </TableCell>
                  <TableCell className="font-mono text-xs" data-testid={`cell-to-${tx.id}`}>
                    {truncateAddress(tx.to)}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground" data-testid={`cell-time-${tx.id}`}>
                    {tx.timestamp}
                  </TableCell>
                  <TableCell data-testid={`cell-compliance-${tx.id}`}>
                    {getComplianceBadge(tx.complianceResult)}
                  </TableCell>
                  <TableCell className={`text-right text-xs font-mono ${getLatencyColor(tx.latency)}`} data-testid={`cell-latency-${tx.id}`}>
                    {tx.latency}ms
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
