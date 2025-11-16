import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AlertTriangle, ArrowRight, TrendingUp, CheckCircle2, Loader2, ChevronDown } from "lucide-react";
import { useState } from "react";

interface SwapRecommendation {
  fromToken: string;
  fromAmount: number;
  toToken: string;
  toAmount: number;
  exchange: string;
  reason: string;
  currentDrift: number;
  targetDrift: number;
}

interface GuardrailAlertProps {
  recommendation: SwapRecommendation | null;
}

interface APIDebug {
  request?: {
    method: string;
    url: string;
    headers?: Record<string, string>;
    body?: any;
  };
  response?: {
    status: number;
    body?: any;
  };
  payment?: {
    from: string;
    to: string;
    amount: string;
    asset: string;
    tx_hash?: string;
  };
}

interface AgentStep {
  id: string;
  agent: string;
  action: string;
  status: "pending" | "in_progress" | "completed";
  timestamp?: string;
  debug?: APIDebug;
}

export default function PortfolioGuardrailAlert({ recommendation }: GuardrailAlertProps) {
  const [showExecutionModal, setShowExecutionModal] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [expandedDebug, setExpandedDebug] = useState<Record<number, boolean>>({});
  
  const initialSteps: AgentStep[] = [
    { 
      id: "1", 
      agent: "Portfolio Agent", 
      action: "Detected drift threshold breach", 
      status: "pending",
      debug: {
        request: {
          method: "POST",
          url: "https://arcot.internal/api/portfolio/check-drift",
          body: {
            portfolio_id: "market_maker_a",
            threshold: 0.05
          }
        },
        response: {
          status: 200,
          body: {
            drift_detected: true,
            current_drift: 0.085,
            threshold: 0.05,
            recommendation: "rebalance_required"
          }
        }
      }
    },
    { 
      id: "2", 
      agent: "Risk Agent", 
      action: "Validate swap parameters", 
      status: "pending",
      debug: {
        request: {
          method: "POST",
          url: "https://arcot.internal/api/risk/validate-swap",
          body: {
            from_token: "ETH",
            from_amount: 15,
            to_token: "USDC",
            to_amount: 50000,
            exchange: "hyperliquid"
          }
        },
        response: {
          status: 200,
          body: {
            approved: true,
            risk_score: 12,
            max_slippage: "0.5%",
            confidence: 0.98
          }
        }
      }
    },
    { 
      id: "3", 
      agent: "Hyperliquid Agent", 
      action: "Get quote from Hyperliquid DEX", 
      status: "pending",
      debug: {
        request: {
          method: "POST",
          url: "https://api.hyperliquid.xyz/info",
          headers: {
            "Content-Type": "application/json"
          },
          body: {
            type: "spotClearinghouseState",
            user: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0"
          }
        },
        response: {
          status: 200,
          body: {
            balances: [
              { coin: "ETH", hold: "15.0", total: "15.0" },
              { coin: "USDC", hold: "0", total: "125000" }
            ],
            quote: {
              from: "ETH",
              to: "USDC",
              amount_in: "15.0",
              amount_out: "50125.50",
              price: "3341.70",
              slippage: "0.25%"
            }
          }
        }
      }
    },
    { 
      id: "4", 
      agent: "Treasury Agent", 
      action: "Execute swap transaction", 
      status: "pending",
      debug: {
        payment: {
          from: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0",
          to: "Hyperliquid: ETH/USDC Pool",
          amount: "15.0",
          asset: "ETH",
          tx_hash: "0x8f5e2b9a1c3d4e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f"
        },
        request: {
          method: "POST",
          url: "https://api.hyperliquid.xyz/exchange",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer <CDP_WALLET_SIG>"
          },
          body: {
            action: {
              type: "order",
              orders: [{
                asset: "ETH",
                isBuy: false,
                limitPx: "3341.70",
                sz: "15.0",
                orderType: { limit: { tif: "Ioc" } }
              }]
            }
          }
        },
        response: {
          status: 200,
          body: {
            status: "ok",
            response: {
              type: "order",
              data: {
                statuses: [{
                  filled: { totalSz: "15.0", avgPx: "3341.85" }
                }]
              }
            }
          }
        }
      }
    },
    { 
      id: "5", 
      agent: "QA Agent", 
      action: "Verify settlement and update allocations", 
      status: "pending",
      debug: {
        request: {
          method: "POST",
          url: "https://arcot.internal/api/qa/verify-settlement",
          body: {
            tx_hash: "0x8f5e2b9a1c3d4e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f",
            expected_from: "ETH",
            expected_to: "USDC",
            expected_amount_out: 50000
          }
        },
        response: {
          status: 200,
          body: {
            verified: true,
            actual_amount_out: "50127.75",
            drift_after_swap: 0.021,
            allocation_updated: true,
            portfolio_state: {
              ETH: { current: "40.2%", target: "40%" },
              USDC: { current: "44.8%", target: "45%" },
              BTC: { current: "15.0%", target: "15%" }
            }
          }
        }
      }
    }
  ];
  
  const [agentSteps, setAgentSteps] = useState<AgentStep[]>(initialSteps);

  if (!recommendation) return null;

  const resetSteps = () => {
    setAgentSteps([...initialSteps]);
    setExecuting(false);
  };

  const handleExecuteSwap = async () => {
    resetSteps(); // Reset steps before starting
    setExecuting(true);
    setShowExecutionModal(true);

    // Simulate agent workflow execution
    const steps = [...initialSteps];
    
    for (let i = 0; i < steps.length; i++) {
      // Set current step to in_progress
      steps[i].status = "in_progress";
      setAgentSteps([...steps]);
      
      // Wait 1.5 seconds
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mark as completed with timestamp
      steps[i].status = "completed";
      steps[i].timestamp = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      setAgentSteps([...steps]);
    }

    setExecuting(false);
  };

  const getStatusIcon = (status: AgentStep["status"]) => {
    if (status === "completed") return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    if (status === "in_progress") return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
    return <div className="w-5 h-5 rounded-full border-2 border-muted" />;
  };

  const getStatusColor = (status: AgentStep["status"]) => {
    if (status === "completed") return "border-green-600 bg-green-600";
    if (status === "in_progress") return "border-blue-600 bg-blue-600";
    return "border-muted bg-muted";
  };

  return (
    <>
      <Card className="border-yellow-600/50 bg-yellow-50 dark:bg-yellow-950/20" data-testid="card-guardrail-alert">
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold" data-testid="text-alert-title">
                  Portfolio Guardrail Alert
                </h3>
                <Badge variant="destructive" className="text-xs">
                  Action Required
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3" data-testid="text-alert-description">
                {recommendation.reason}
              </p>

              <div className="flex items-center gap-4 text-sm mb-4">
                <div data-testid="text-current-drift">
                  <span className="text-muted-foreground">Current Drift:</span>{" "}
                  <span className="font-semibold text-red-600">{recommendation.currentDrift}%</span>
                </div>
                <div data-testid="text-target-drift">
                  <span className="text-muted-foreground">Target:</span>{" "}
                  <span className="font-semibold text-green-600">{recommendation.targetDrift}%</span>
                </div>
              </div>

              <div className="p-4 bg-background border border-card-border rounded-md" data-testid="card-recommendation">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-center" data-testid="swap-from">
                      <div className="text-lg font-semibold">{recommendation.fromAmount} {recommendation.fromToken}</div>
                      <div className="text-xs text-muted-foreground">From</div>
                    </div>
                    
                    <ArrowRight className="w-5 h-5 text-primary" />
                    
                    <div className="text-center" data-testid="swap-to">
                      <div className="text-lg font-semibold">{recommendation.toAmount} {recommendation.toToken}</div>
                      <div className="text-xs text-muted-foreground">To</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                      <TrendingUp className="w-4 h-4" />
                      <span data-testid="text-exchange">via {recommendation.exchange}</span>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={handleExecuteSwap}
                      disabled={executing}
                      data-testid="button-execute-swap"
                    >
                      Execute Swap
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Agent Execution Modal */}
      <Dialog open={showExecutionModal} onOpenChange={setShowExecutionModal}>
        <DialogContent className="sm:max-w-[600px]" data-testid="modal-swap-execution">
          <DialogHeader>
            <DialogTitle data-testid="text-modal-title">Agent-to-Agent Swap Execution</DialogTitle>
            <DialogDescription data-testid="text-modal-description">
              Multi-agent workflow executing swap via {recommendation.exchange}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Swap Summary */}
            <Card className="p-4 bg-muted/50">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-semibold">{recommendation.fromAmount} {recommendation.fromToken}</span>
                  <ArrowRight className="w-4 h-4 inline mx-2" />
                  <span className="font-semibold">{recommendation.toAmount} {recommendation.toToken}</span>
                </div>
                <Badge variant="secondary" data-testid="badge-exchange">
                  {recommendation.exchange}
                </Badge>
              </div>
            </Card>

            {/* Agent Timeline */}
            <div className="relative" data-testid="section-agent-timeline">
              <div className="absolute left-[10px] top-2 bottom-2 w-[2px] bg-card-border" />
              
              <div className="space-y-3">
                {agentSteps.map((step, index) => (
                  <div key={step.id} className="relative pl-8" data-testid={`agent-step-${index}`}>
                    <div 
                      className={`absolute left-0 w-5 h-5 rounded-full border-2 ${getStatusColor(step.status)} flex items-center justify-center`}
                      style={{ top: '2px' }}
                    >
                      {step.status === "completed" && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>

                    <Card className="p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(step.status)}
                          <div>
                            <div className="font-medium text-sm" data-testid={`agent-name-${index}`}>
                              {step.agent}
                            </div>
                            <div className="text-xs text-muted-foreground" data-testid={`agent-action-${index}`}>
                              {step.action}
                            </div>
                          </div>
                        </div>
                        {step.timestamp && (
                          <span className="text-xs text-muted-foreground" data-testid={`agent-time-${index}`}>
                            {step.timestamp}
                          </span>
                        )}
                      </div>

                      {/* API Details */}
                      {step.debug && step.status === "completed" && (
                        <Collapsible 
                          open={expandedDebug[index]} 
                          onOpenChange={(open) => setExpandedDebug(prev => ({ ...prev, [index]: open }))}
                          className="mt-2"
                        >
                          <CollapsibleTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full justify-between text-xs h-7"
                              data-testid={`button-expand-debug-${index}`}
                            >
                              View API Details
                              <ChevronDown className={`w-3 h-3 transition-transform ${expandedDebug[index] ? "rotate-180" : ""}`} />
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-2">
                            <div className="bg-muted/50 border rounded-md p-3 space-y-3 text-xs font-mono">
                              {step.debug.payment && (
                                <div>
                                  <div className="font-semibold mb-1 font-sans">Agent-to-Agent Payment</div>
                                  <div className="p-2 bg-background rounded border text-xs">
                                    <div className="mb-1">
                                      <span className="text-muted-foreground">From:</span> {step.debug.payment.from}
                                    </div>
                                    <div className="mb-1">
                                      <span className="text-muted-foreground">To:</span> {step.debug.payment.to}
                                    </div>
                                    <div className="mb-1">
                                      <span className="text-muted-foreground">Amount:</span> {step.debug.payment.amount} {step.debug.payment.asset}
                                    </div>
                                    {step.debug.payment.tx_hash && (
                                      <div>
                                        <span className="text-muted-foreground">TX Hash:</span>{" "}
                                        <a 
                                          href={`https://basescan.org/tx/${step.debug.payment.tx_hash}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-primary hover:underline"
                                        >
                                          {step.debug.payment.tx_hash.slice(0, 20)}...
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              {step.debug.request && (
                                <div>
                                  <div className="font-semibold mb-1 font-sans">
                                    {step.debug.payment ? "Exchange API Request" : "API Request"}
                                  </div>
                                  <div className="text-muted-foreground mb-1">
                                    {step.debug.request.method} {step.debug.request.url}
                                  </div>
                                  {step.debug.request.headers && (
                                    <div className="mb-2">
                                      <div className="text-muted-foreground">Headers:</div>
                                      <pre className="whitespace-pre-wrap overflow-x-auto text-xs">
                                        {JSON.stringify(step.debug.request.headers, null, 2)}
                                      </pre>
                                    </div>
                                  )}
                                  {step.debug.request.body && (
                                    <div>
                                      <div className="text-muted-foreground">Body:</div>
                                      <pre className="whitespace-pre-wrap overflow-x-auto text-xs">
                                        {JSON.stringify(step.debug.request.body, null, 2)}
                                      </pre>
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              {step.debug.response && (
                                <div>
                                  <div className="font-semibold mb-1 font-sans">
                                    Response ({step.debug.response.status})
                                  </div>
                                  <pre className="whitespace-pre-wrap overflow-x-auto text-xs">
                                    {JSON.stringify(step.debug.response.body, null, 2)}
                                  </pre>
                                </div>
                              )}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )}
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Completion Message */}
            {!executing && agentSteps.every(s => s.status === "completed") && (
              <Card className="p-4 border-green-600/50 bg-green-50 dark:bg-green-950/20" data-testid="card-success">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-semibold text-sm">Swap Completed Successfully</div>
                    <div className="text-xs text-muted-foreground">
                      Portfolio drift reduced from {recommendation.currentDrift}% to {recommendation.targetDrift}%
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          <div className="flex justify-end gap-3">
            {!executing && agentSteps.every(s => s.status === "completed") && (
              <Button 
                variant="outline" 
                onClick={() => {
                  resetSteps();
                }}
                data-testid="button-reset"
              >
                Run Again
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => setShowExecutionModal(false)}
              disabled={executing}
              data-testid="button-close-modal"
            >
              {executing ? "Executing..." : "Close"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
