import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Copy, CheckCircle2, Loader2, AlertTriangle, Send, ExternalLink, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import type { RiskyTransaction } from "./RiskyTransactionTable";

interface Message {
  id: string;
  type: "user" | "agent";
  content: string;
  timestamp: string;
}

interface VerificationStep {
  id: string;
  status: "pending" | "completed" | "in-progress" | "alert";
  title: string;
  subtitle?: string;
  timestamp: string;
  payment?: number;
  details?: string;
  alertInfo?: {
    riskScore: number;
    connectedAddresses: number;
    knownEntity: string;
    recommendation: string;
    chainalysisLink: string;
  };
}

interface TransactionDetailSidebarProps {
  transaction: RiskyTransaction | null;
  open: boolean;
  onClose: () => void;
}

const initialSteps: VerificationStep[] = [
  {
    id: "1",
    status: "completed",
    title: "Call Compliance Agent",
    subtitle: "From: Locus Agent Marketplace",
    timestamp: "2:34:12 PM",
  },
  {
    id: "2",
    status: "completed",
    title: "Verify sender wallet",
    payment: 0.002,
    details: "Approved • 0xa1b2...3d4e",
    timestamp: "2:34:15 PM",
  },
  {
    id: "3",
    status: "completed",
    title: "Verify receiver wallet",
    payment: 0.003,
    details: "Approved • 0x9876...10ab",
    timestamp: "2:34:18 PM",
  },
  {
    id: "4",
    status: "alert",
    title: "Alert detected",
    subtitle: "Linked to darknet market activity",
    timestamp: "2:34:19 PM",
    alertInfo: {
      riskScore: 85,
      connectedAddresses: 12,
      knownEntity: "Silk Road 2.0 cluster",
      recommendation: "Flag for manual review",
      chainalysisLink: "#"
    }
  }
];

export default function TransactionDetailSidebar({ 
  transaction, 
  open, 
  onClose 
}: TransactionDetailSidebarProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [alertExpanded, setAlertExpanded] = useState(false);
  const [verificationSteps, setVerificationSteps] = useState<VerificationStep[]>(initialSteps);

  // Reset steps when transaction changes or sidebar opens
  useEffect(() => {
    if (open && transaction) {
      setVerificationSteps(initialSteps);
      setAlertExpanded(false);
      setMessages([]);
    }
  }, [open, transaction]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleReVerify = async () => {
    setIsVerifying(true);
    setAlertExpanded(false);

    // Reset all steps to pending
    const resetSteps = initialSteps.map(step => ({
      ...step,
      status: "pending" as const,
      timestamp: ""
    }));
    setVerificationSteps(resetSteps);

    // Execute steps sequentially with delays
    for (let i = 0; i < initialSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const now = new Date();
      const timestamp = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      
      setVerificationSteps(prev => 
        prev.map((step, idx) => {
          if (idx === i) {
            return {
              ...step,
              status: "in-progress" as const,
              timestamp
            };
          }
          return step;
        })
      );

      // Complete the step after a brief delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setVerificationSteps(prev => 
        prev.map((step, idx) => {
          if (idx === i) {
            return {
              ...initialSteps[i],
              timestamp
            };
          }
          return step;
        })
      );
    }

    setIsVerifying(false);
    setAlertExpanded(true);
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      type: "user",
      content: chatInput,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
    };

    setMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setIsTyping(true);

    // Add a new investigation step with $0.00 payment
    const now = new Date();
    const timestamp = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    
    const newStep: VerificationStep = {
      id: `investigation-${Date.now()}`,
      status: "in-progress",
      title: "Additional Investigation",
      subtitle: "Free follow-up included in contract",
      timestamp,
      payment: 0.00,
      details: "Analyzing wallet history..."
    };

    setVerificationSteps(prev => [...prev, newStep]);

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const agentMsg: Message = {
      id: `msg-${Date.now()}-agent`,
      type: "agent",
      content: "Analysis complete: This wallet has been flagged 3 times in the past 30 days for similar velocity patterns. Previous transactions totaling $45,000 were cleared after manual review.",
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
    };

    setMessages(prev => [...prev, agentMsg]);
    setIsTyping(false);

    // Complete the investigation step
    setVerificationSteps(prev => 
      prev.map(step => 
        step.id === newStep.id 
          ? { ...step, status: "completed" as const, details: "Analysis complete" }
          : step
      )
    );
  };

  const getStatusIcon = (status: VerificationStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "in-progress":
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
      case "alert":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "pending":
        return <div className="w-5 h-5 rounded-full border-2 border-muted" />;
    }
  };

  const getStatusColor = (status: VerificationStep["status"]) => {
    switch (status) {
      case "completed":
        return "border-green-600 bg-green-600";
      case "in-progress":
        return "border-blue-600 bg-blue-600";
      case "alert":
        return "border-red-600 bg-red-600";
      case "pending":
        return "border-muted bg-muted";
    }
  };

  const formatAmount = (amount: number, token: string) => {
    if (token === "USDC" && amount >= 1000) {
      return `$${amount.toLocaleString()}`;
    }
    return `${amount.toLocaleString()} ${token}`;
  };

  if (!transaction) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:w-[500px] sm:max-w-[500px] overflow-y-auto" data-testid="sidebar-transaction-detail">
        <SheetHeader>
          <SheetTitle className="text-sm" data-testid="text-transaction-title">
            Transaction Details
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Compressed Header with Amount */}
          <div className="flex items-center gap-2 text-sm border border-card-border rounded-lg p-3" data-testid="section-header">
            <span className="font-semibold" data-testid="text-amount">
              {formatAmount(transaction.amount, transaction.token)}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="font-mono text-xs text-muted-foreground" data-testid="text-from">
              {transaction.from.slice(0, 6)}...{transaction.from.slice(-4)}
            </span>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-5 w-5"
              onClick={() => handleCopy(transaction.from)}
              data-testid="button-copy-from"
            >
              <Copy className="w-3 h-3" />
            </Button>
            <span className="text-muted-foreground">→</span>
            <span className="font-mono text-xs text-muted-foreground" data-testid="text-to">
              {transaction.to.slice(0, 6)}...{transaction.to.slice(-4)}
            </span>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-5 w-5"
              onClick={() => handleCopy(transaction.to)}
              data-testid="button-copy-to"
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Badge variant="destructive" className="ml-auto text-xs" data-testid="badge-risk">
              {transaction.complianceResult}
            </Badge>
          </div>

          {/* Vertical Status Tracker */}
          <div data-testid="section-verification">
            <h3 className="text-sm font-semibold mb-4">Verification Timeline</h3>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[10px] top-2 bottom-2 w-[2px] bg-card-border" />
              
              <div className="space-y-4">
                {verificationSteps.map((step, index) => (
                  <div key={step.id} className="relative pl-8" data-testid={`step-${step.id}`}>
                    {/* Status dot */}
                    <div 
                      className={`absolute left-0 w-5 h-5 rounded-full border-2 ${getStatusColor(step.status)} flex items-center justify-center`}
                      style={{ top: '2px' }}
                    >
                      {step.status === "completed" && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>

                    {/* Step card */}
                    <Card className={`p-3 ${step.status === "alert" ? "border-red-600/50" : ""}`}>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(step.status)}
                          <span className="font-medium text-sm">{step.title}</span>
                        </div>
                        {step.payment !== undefined && (
                          <Badge variant="secondary" className="text-xs font-mono" data-testid={`payment-${step.id}`}>
                            ${step.payment.toFixed(3)} USDC
                          </Badge>
                        )}
                      </div>
                      
                      {step.subtitle && (
                        <p className="text-xs text-muted-foreground mb-1">{step.subtitle}</p>
                      )}
                      
                      {step.details && (
                        <p className="text-xs text-muted-foreground font-mono">{step.details}</p>
                      )}
                      
                      {step.timestamp && (
                        <p className="text-xs text-muted-foreground mt-1">{step.timestamp}</p>
                      )}

                      {/* Alert details */}
                      {step.alertInfo && (
                        <Collapsible open={alertExpanded} onOpenChange={setAlertExpanded} className="mt-2">
                          <CollapsibleTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full justify-between text-xs h-7"
                              data-testid="button-expand-alert"
                            >
                              View Compliance Report
                              <ChevronDown className={`w-3 h-3 transition-transform ${alertExpanded ? "rotate-180" : ""}`} />
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-2">
                            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-md p-3 space-y-2 text-xs" data-testid="alert-details">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Risk Score:</span>
                                <span className="font-semibold text-red-600">{step.alertInfo.riskScore}/100</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Connected Addresses:</span>
                                <span className="font-semibold">{step.alertInfo.connectedAddresses}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Known Entity:</span>
                                <span className="font-semibold">{step.alertInfo.knownEntity}</span>
                              </div>
                              <div className="pt-2 border-t border-red-200 dark:border-red-900">
                                <p className="text-muted-foreground mb-2">Recommendation:</p>
                                <p className="font-semibold">{step.alertInfo.recommendation}</p>
                              </div>
                              <a 
                                href={step.alertInfo.chainalysisLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-primary hover:underline mt-2"
                                data-testid="link-chainalysis"
                              >
                                View on Chainalysis
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )}
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Re-verify button */}
          <div data-testid="section-actions">
            <Button 
              className="w-full gap-2" 
              onClick={handleReVerify}
              disabled={isVerifying}
              variant="outline"
              data-testid="button-reverify"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Re-verify Transaction"
              )}
            </Button>
          </div>

          {/* Chat Interface */}
          <div data-testid="section-chat">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Ask about this transaction</h3>
              <Badge variant="secondary" className="text-xs">Free follow-up</Badge>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-2 max-h-60 overflow-y-auto" data-testid="chat-messages">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                    data-testid={`message-${msg.id}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        msg.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start" data-testid="typing-indicator">
                    <div className="bg-muted rounded-lg px-4 py-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., has this wallet seen suspicious activity?"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  data-testid="input-chat"
                />
                <Button 
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim() || isTyping}
                  data-testid="button-send"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
