import AgentConsole from '../AgentConsole';

export default function AgentConsoleExample() {
  const mockLogs = [
    { id: "1", timestamp: "14:32:01", message: "System initialized", type: "success" as const },
    { id: "2", timestamp: "14:32:05", message: "Detected high-risk transaction: 0x1a2b3c...", type: "warning" as const },
    { id: "3", timestamp: "14:32:06", message: "Requesting compliance check...", type: "info" as const },
    { id: "4", timestamp: "14:32:08", message: "Received 402 payment challenge", type: "info" as const },
    { id: "5", timestamp: "14:32:10", message: "Processing payment...", type: "info" as const }
  ];

  return <AgentConsole logs={mockLogs} />;
}
