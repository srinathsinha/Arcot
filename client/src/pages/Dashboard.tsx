import { useState } from "react";
import { Button } from "@/components/ui/button";
import TransactionStream, { type Transaction } from "@/components/TransactionStream";
import TreasuryChart, { type TreasuryAllocation } from "@/components/TreasuryChart";
import AgentConsole, { type ConsoleLog } from "@/components/AgentConsole";
import { Play } from "lucide-react";

export default function Dashboard() {
  const [isRunning, setIsRunning] = useState(false);
  const [highlightedTxId, setHighlightedTxId] = useState<string | undefined>();
  const [logs, setLogs] = useState<ConsoleLog[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "tx-1",
      hash: "0x1a2b3c4d5e6f7g8h9i0j1k2l",
      amount: 8200,
      currency: "USDC",
      status: "high-risk",
      from: "0xa1b2c3d4e5f6",
      to: "0x9876543210ab"
    },
    {
      id: "tx-2",
      hash: "0x9z8y7x6w5v4u3t2s1r0q9p8o",
      amount: 1500,
      currency: "USDC",
      status: "approved",
      from: "0xabcdef123456",
      to: "0x654321fedcba"
    },
    {
      id: "tx-3",
      hash: "0xqwertyuiop1234567890abcd",
      amount: 3200,
      currency: "ETH",
      status: "pending",
      from: "0x1234567890ab",
      to: "0xabcdef012345"
    },
    {
      id: "tx-4",
      hash: "0xasdfghjkl0987654321qwert",
      amount: 500,
      currency: "USDC",
      status: "approved",
      from: "0x9988776655aa",
      to: "0xbbccddee1122"
    }
  ]);

  const [treasuryAllocations, setTreasuryAllocations] = useState<TreasuryAllocation[]>([
    { asset: "ETH", percentage: 42, color: "#627EEA" },
    { asset: "USDC", percentage: 45, color: "#2775CA" },
    { asset: "BTC", percentage: 13, color: "#F7931A" }
  ]);

  const addLog = (message: string, type: ConsoleLog["type"] = "info") => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev, { id: `log-${Date.now()}`, timestamp, message, type }]);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const runScenario = async () => {
    setIsRunning(true);
    setLogs([]);
    setHighlightedTxId(undefined);

    await sleep(500);
    addLog("Autonomous agent initialized", "success");
    
    await sleep(800);
    addLog("Scanning transaction stream...", "info");
    
    await sleep(1000);
    setHighlightedTxId("tx-1");
    addLog("Detected high-risk transaction: 0x1a2b3c...", "warning");
    
    await sleep(1200);
    addLog("Initiating compliance check...", "info");
    
    await sleep(1500);
    addLog("Received HTTP 402 payment challenge", "info");
    addLog("  → Price: 0.02 USDC", "info");
    addLog("  → Receiver: 0xC0mpl1anceProvider", "info");
    addLog("  → Network: Base", "info");
    
    await sleep(1000);
    addLog("Constructing payment intent...", "info");
    
    await sleep(1200);
    addLog("Executing payment transaction...", "info");
    
    await sleep(1500);
    addLog("Payment confirmed: 0xSIMULATED_HASH", "success");
    
    await sleep(1000);
    addLog("Requesting identity verification...", "info");
    
    await sleep(1500);
    addLog("Verification complete:", "success");
    addLog("  → Identity verified: true", "success");
    addLog("  → Device risk: low", "success");
    addLog("  → Final risk: low", "success");
    
    await sleep(800);
    setTransactions(prev => prev.map(tx => 
      tx.id === "tx-1" ? { ...tx, status: "approved" } : tx
    ));
    addLog("Transaction approved ✓", "success");
    
    await sleep(1000);
    addLog("Updating treasury state (+8200 USDC)...", "info");
    
    await sleep(800);
    addLog("Treasury drift detected, initiating rebalance...", "warning");
    
    await sleep(1200);
    addLog("Requesting liquidity quote...", "info");
    addLog("  → Swap: 3000 USDC → ETH", "info");
    
    await sleep(1500);
    addLog("Quote received: 0.9 ETH @ $3333.33", "success");
    
    await sleep(1000);
    addLog("Executing swap transaction...", "info");
    
    await sleep(1500);
    addLog("Swap confirmed: 0xSWAP_TX_HASH", "success");
    
    await sleep(800);
    setTreasuryAllocations([
      { asset: "ETH", percentage: 50, color: "#627EEA" },
      { asset: "USDC", percentage: 40, color: "#2775CA" },
      { asset: "BTC", percentage: 10, color: "#F7931A" }
    ]);
    addLog("Treasury rebalanced successfully", "success");
    addLog("  → ETH: 42% → 50%", "info");
    addLog("  → USDC: 45% → 40%", "info");
    addLog("  → BTC: 13% → 10%", "info");
    
    await sleep(1000);
    addLog("Scenario complete. All systems nominal.", "success");
    
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold mb-1" data-testid="text-page-title">
              Autonomous Risk & Compliance Officer
            </h1>
            <p className="text-sm text-muted-foreground" data-testid="text-page-subtitle">
              Real-time transaction monitoring with automated compliance workflows
            </p>
          </div>
          <Button
            onClick={runScenario}
            disabled={isRunning}
            className="gap-2"
            data-testid="button-start-scenario"
          >
            <Play className="w-4 h-4" />
            {isRunning ? "Running..." : "Start Scenario"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TransactionStream 
            transactions={transactions} 
            highlightedId={highlightedTxId}
          />
          <TreasuryChart allocations={treasuryAllocations} />
        </div>

        <AgentConsole logs={logs} />
      </div>
    </div>
  );
}
