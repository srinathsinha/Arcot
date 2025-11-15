import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";

export interface ConsoleLog {
  id: string;
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

interface AgentConsoleProps {
  logs: ConsoleLog[];
}

export default function AgentConsole({ logs }: AgentConsoleProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogIcon = (type: ConsoleLog["type"]) => {
    switch (type) {
      case "info":
        return "→";
      case "success":
        return "✓";
      case "warning":
        return "⚠";
      case "error":
        return "✗";
    }
  };

  const getLogColor = (type: ConsoleLog["type"]) => {
    switch (type) {
      case "info":
        return "text-foreground";
      case "success":
        return "text-green-600 dark:text-green-500";
      case "warning":
        return "text-yellow-600 dark:text-yellow-500";
      case "error":
        return "text-red-600 dark:text-red-500";
    }
  };

  return (
    <Card className="flex flex-col h-full" data-testid="card-agent-console">
      <div className="p-4 border-b border-card-border flex items-center gap-2">
        <h2 className="text-base font-semibold" data-testid="text-console-title">
          Agent Console
        </h2>
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" data-testid="indicator-status" />
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto max-h-64 p-4 bg-muted/30 font-mono text-xs leading-relaxed"
        data-testid="container-logs"
      >
        {logs.length === 0 ? (
          <div className="text-muted-foreground" data-testid="text-empty-logs">
            Waiting for scenario to start...
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="mb-1" data-testid={`log-${log.id}`}>
              <span className="text-muted-foreground mr-2" data-testid={`log-timestamp-${log.id}`}>
                [{log.timestamp}]
              </span>
              <span className={getLogColor(log.type)} data-testid={`log-message-${log.id}`}>
                {getLogIcon(log.type)} {log.message}
              </span>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
