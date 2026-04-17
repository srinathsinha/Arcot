import { useState } from "react";
import GlobalMap, { type MapHotspot } from "@/components/GlobalMap";
import RiskyTransactionTable, { type RiskyTransaction } from "@/components/RiskyTransactionTable";
import TransactionDetailSidebar from "@/components/TransactionDetailSidebar";

export default function RiskCompliance() {
  const [selectedTransaction, setSelectedTransaction] = useState<RiskyTransaction | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterRegion, setFilterRegion] = useState<string | null>(null);

  const hotspots: MapHotspot[] = [
    { id: "1", lat: 40, lng: -74, riskLevel: "suspicious", count: 5, region: "North America" },
    { id: "2", lat: 51, lng: 0, riskLevel: "cleared", count: 8, region: "Europe" },
    { id: "3", lat: 35, lng: 139, riskLevel: "confirmed", count: 3, region: "Asia" },
    { id: "4", lat: -33, lng: 151, riskLevel: "cleared", count: 2, region: "Australia" },
    { id: "5", lat: -23, lng: -46, riskLevel: "suspicious", count: 4, region: "South America" },
  ];

  const [transactions, setTransactions] = useState<RiskyTransaction[]>([
    {
      id: "tx-1",
      numericId: 9821,
      token: "USDC",
      amount: 8200,
      from: "0x19a3c8e7b9f24d6a81f2b77f5c0bb7c2",
      to: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0",
      timestamp: "2m ago",
      complianceResult: "AML Flag",
      latency: 250,
      riskLevel: "confirmed"
    },
    {
      id: "tx-2",
      numericId: 9822,
      token: "ETH",
      amount: 12.5,
      from: "0xabcdef123456",
      to: "0x654321fedcba",
      timestamp: "5m ago",
      complianceResult: "Velocity Check",
      latency: 180,
      riskLevel: "suspicious"
    },
    {
      id: "tx-3",
      numericId: 9823,
      token: "BTC",
      amount: 0.85,
      from: "0x1234567890ab",
      to: "0xabcdef012345",
      timestamp: "8m ago",
      complianceResult: "Geographic Risk",
      latency: 95,
      riskLevel: "suspicious"
    },
    {
      id: "tx-4",
      numericId: 9824,
      token: "USDC",
      amount: 125000,
      from: "0x9988776655aa",
      to: "0xbbccddee1122",
      timestamp: "12m ago",
      complianceResult: "Sanctions Match",
      latency: 320,
      riskLevel: "confirmed"
    },
    {
      id: "tx-5",
      numericId: 9825,
      token: "ETH",
      amount: 3.2,
      from: "0xffeeddccbbaa",
      to: "0x112233445566",
      timestamp: "15m ago",
      complianceResult: "Pattern Detection",
      latency: 210,
      riskLevel: "suspicious"
    }
  ]);

  const handleTransactionClick = (transaction: RiskyTransaction) => {
    setSelectedTransaction(transaction);
    setSidebarOpen(true);
  };

  const handleMarkerClick = (region: string) => {
    setFilterRegion(region === filterRegion ? null : region);
  };

  const handleDecision = (transaction: RiskyTransaction, decision: "approved" | "rejected") => {
    setTransactions((current) =>
      current.map((tx) =>
        tx.id === transaction.id ? { ...tx, decisionStatus: decision } : tx,
      ),
    );
    setSelectedTransaction((current) =>
      current?.id === transaction.id ? { ...current, decisionStatus: decision } : current,
    );
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-risk-compliance">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold mb-1" data-testid="text-page-title">
            Risk and Compliance Monitor
          </h1>
          <p className="text-sm text-muted-foreground" data-testid="text-page-subtitle">
            Real-time transaction monitoring and compliance workflows
          </p>
        </div>

        <div className="space-y-6">
          <GlobalMap hotspots={hotspots} onMarkerClick={handleMarkerClick} />
          
          <RiskyTransactionTable
            transactions={transactions}
            onTransactionClick={handleTransactionClick}
            selectedId={selectedTransaction?.id}
          />

          <TransactionDetailSidebar
            transaction={selectedTransaction}
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onDecision={handleDecision}
          />
        </div>
      </div>
    </div>
  );
}
