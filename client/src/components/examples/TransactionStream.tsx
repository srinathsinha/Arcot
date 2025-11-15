import TransactionStream from '../TransactionStream';

export default function TransactionStreamExample() {
  const mockTransactions = [
    {
      id: "1",
      hash: "0x1a2b3c4d5e6f7g8h9i",
      amount: 8200,
      currency: "USDC",
      status: "high-risk" as const,
      from: "0xa1b2c3d4e5f6",
      to: "0x9876543210ab"
    },
    {
      id: "2",
      hash: "0x9z8y7x6w5v4u3t2s1r",
      amount: 1500,
      currency: "USDC",
      status: "approved" as const,
      from: "0xabcdef123456",
      to: "0x654321fedcba"
    },
    {
      id: "3",
      hash: "0xqwertyuiop1234567",
      amount: 3200,
      currency: "ETH",
      status: "pending" as const,
      from: "0x1234567890ab",
      to: "0xabcdef012345"
    }
  ];

  return <TransactionStream transactions={mockTransactions} highlightedId="1" />;
}
