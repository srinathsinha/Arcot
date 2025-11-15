import TransactionDetailSidebar from '../TransactionDetailSidebar';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function TransactionDetailSidebarExample() {
  const [open, setOpen] = useState(false);
  
  const mockTransaction = {
    id: "1",
    token: "USDC",
    from: "0xa1b2c3d4e5f67890abcdef",
    to: "0x9876543210abcdef123456",
    timestamp: "2m ago",
    complianceResult: "AML Flag" as const,
    latency: 250,
    riskLevel: "confirmed" as const
  };

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Open Transaction Details</Button>
      <TransactionDetailSidebar
        transaction={mockTransaction}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
