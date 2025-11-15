import RiskyTransactionTable from '../RiskyTransactionTable';
import { useState } from 'react';

export default function RiskyTransactionTableExample() {
  const [selectedId, setSelectedId] = useState<string>();
  
  const mockTransactions = [
    {
      id: "1",
      token: "USDC",
      from: "0xa1b2c3d4e5f6",
      to: "0x9876543210ab",
      timestamp: "2m ago",
      complianceResult: "AML Flag" as const,
      latency: 250,
      riskLevel: "confirmed" as const
    },
    {
      id: "2",
      token: "ETH",
      from: "0xabcdef123456",
      to: "0x654321fedcba",
      timestamp: "5m ago",
      complianceResult: "Velocity Check" as const,
      latency: 180,
      riskLevel: "suspicious" as const
    },
    {
      id: "3",
      token: "BTC",
      from: "0x1234567890ab",
      to: "0xabcdef012345",
      timestamp: "8m ago",
      complianceResult: "Geographic Risk" as const,
      latency: 95,
      riskLevel: "suspicious" as const
    }
  ];

  return (
    <RiskyTransactionTable 
      transactions={mockTransactions} 
      onTransactionClick={(tx) => setSelectedId(tx.id)}
      selectedId={selectedId}
    />
  );
}
