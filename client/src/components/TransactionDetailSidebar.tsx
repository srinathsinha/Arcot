import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Copy, CheckCircle2, Loader2, ArrowRight, Send } from "lucide-react";
import { useState } from "react";
import type { RiskyTransaction } from "./RiskyTransactionTable";

interface Message {
  id: string;
  type: "user" | "agent";
  content: string;
  timestamp: string;
}

interface TransactionDetailSidebarProps {
  transaction: RiskyTransaction | null;
  open: boolean;
  onClose: () => void;
}

export default function TransactionDetailSidebar({ 
  transaction, 
  open, 
  onClose 
}: TransactionDetailSidebarProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleReVerify = async () => {
    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsVerifying(false);
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

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const agentMsg: Message = {
      id: `msg-${Date.now()}-agent`,
      type: "agent",
      content: "Analysis complete: This wallet has been flagged 3 times in the past 30 days for similar velocity patterns. Previous transactions totaling $45,000 were cleared after manual review.",
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
    };

    setMessages(prev => [...prev, agentMsg]);
    setIsTyping(false);
  };

  if (!transaction) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:w-[500px] sm:max-w-[500px] overflow-y-auto" data-testid="sidebar-transaction-detail">
        <SheetHeader>
          <SheetTitle className="font-mono text-sm" data-testid="text-transaction-hash">
            Transaction Details
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <Card className="p-4" data-testid="card-overview">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Token</span>
                <span className="font-semibold" data-testid="text-token">{transaction.token}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">From</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs" data-testid="text-from">{transaction.from}</span>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-6 w-6"
                    onClick={() => handleCopy(transaction.from)}
                    data-testid="button-copy-from"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">To</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs" data-testid="text-to">{transaction.to}</span>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-6 w-6"
                    onClick={() => handleCopy(transaction.to)}
                    data-testid="button-copy-to"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="destructive" data-testid="badge-risk">
                  {transaction.complianceResult}
                </Badge>
              </div>
            </div>
          </Card>

          <div data-testid="section-flow">
            <h3 className="text-sm font-semibold mb-3">Verification Flow</h3>
            <Card className="p-4 bg-muted/30">
              <div className="flex items-center gap-2 text-xs">
                <div className="flex flex-col items-center gap-1" data-testid="flow-step-agent">
                  <div className="w-10 h-10 rounded-md bg-primary/10 border-2 border-primary flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-center">Agent</span>
                </div>
                
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                
                <div className="flex flex-col items-center gap-1" data-testid="flow-step-payment">
                  <div className="w-10 h-10 rounded-md bg-green-500/10 border-2 border-green-500 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-center">x402</span>
                </div>
                
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                
                <div className="flex flex-col items-center gap-1" data-testid="flow-step-coinbase">
                  <div className="w-10 h-10 rounded-md bg-green-500/10 border-2 border-green-500 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-center">Wallet</span>
                </div>
                
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                
                <div className="flex flex-col items-center gap-1" data-testid="flow-step-result">
                  <div className="w-10 h-10 rounded-md bg-green-500/10 border-2 border-green-500 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-center">Result</span>
                </div>
              </div>
              
              <div className="mt-4 p-2 bg-card rounded border border-card-border" data-testid="payment-info">
                <div className="text-xs">
                  <span className="text-muted-foreground">Payment: </span>
                  <span className="font-semibold text-green-600">0.02 USDC</span>
                  <span className="text-muted-foreground ml-2">→ Compliance Provider</span>
                </div>
              </div>
            </Card>
          </div>

          <div data-testid="section-actions">
            <Button 
              className="w-full gap-2" 
              onClick={handleReVerify}
              disabled={isVerifying}
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

          <div data-testid="section-chat">
            <h3 className="text-sm font-semibold mb-3">Ask about this transaction</h3>
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
