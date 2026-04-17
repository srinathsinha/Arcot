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
  onSwapComplete?: () => void;
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

export default function PortfolioGuardrailAlert({ recommendation, onSwapComplete }: GuardrailAlertProps) {
  const [showExecutionModal, setShowExecutionModal] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [swapCompleted, setSwapCompleted] = useState(false);
  const [expandedDebug, setExpandedDebug] = useState<Record<number, boolean>>({});
  const [currentDrift, setCurrentDrift] = useState(recommendation?.currentDrift || 0);
  
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
            usdc_guardrail_max: 0.4
          }
        },
        response: {
          status: 200,
          body: {
            guardrail_breached: true,
            current_usdc_allocation: 0.46,
            usdc_guardrail_max: 0.4,
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
            from_token: "USDC",
            from_amount: 5000,
            to_token: "ETH",
            to_amount: 1.5,
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
      agent: "Hyperliquid Trading Agent", 
      action: "Request quote and place order via Hyperliquid exchange API", 
      status: "pending",
      debug: {
        request: {
          method: "POST",
          url: "https://api.hyperliquid.xyz/exchange",
          headers: {
            "Content-Type": "application/json"
          },
          body: {
            action: {
              type: "order",
              coin: "ETH",
              isBuy: true,
              sz: "1.5",
              limitPx: "3330.50",
              reduceOnly: false,
              tif: "Ioc"
            },
            nonce: 1731698400000,
            signature: "<EIP-712-signed-typed-data>",
            vaultAddress: null,
            meta: {
              token_from: "USDC",
              token_to: "ETH",
              amount_notional: "5000 USDC",
              venue: "Hyperliquid",
              order_type: "limit Ioc",
              max_slippage: "0.5%",
              estimated_gas_fees: "0.12 USDC",
              network_fees: "0.08 USDC",
              exchange_fee: "12.34 USDC",
              agent_fee: "2.50 USDC",
              usage_permission: "single_transaction_only"
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
                coin: "ETH",
                isBuy: true,
                sz: "1.5",
                limitPx: "3330.50",
                filledSz: "1.5",
                avgPx: "3329.90",
                fee: "12.34",
                orderId: "123456789",
                status: "filled"
              }
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
          amount: "5000",
          asset: "USDC",
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
                isBuy: true,
                limitPx: "3341.70",
                sz: "1.5",
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
                  filled: { totalSz: "1.5", avgPx: "3341.85" }
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
            expected_from: "USDC",
            expected_to: "ETH",
            expected_amount_out: 1.5
          }
        },
        response: {
          status: 200,
          body: {
            verified: true,
            actual_amount_out: "1.49 ETH",
            usdc_allocation_after_swap: "39%",
            allocation_updated: true,
            portfolio_state: {
              ETH: { current: "46.0%", target: "45%" },
              USDC: { current: "39.0%", target: "35-40%" },
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
    setSwapCompleted(false);
    setCurrentDrift(recommendation?.currentDrift || 0);
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
    setSwapCompleted(true);
    setCurrentDrift(39);
    onSwapComplete?.();
  };

  const getStatusIcon = (status: AgentStep["status"]) => {
    if (status === "in_progress") return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
    return null; // No icon for pending or completed - the bubble shows the checkmark
  };

  const getStatusColor = (status: AgentStep["status"]) => {
    if (status === "completed") return "border-green-600 bg-green-600";
    if (status === "in_progress") return "border-blue-600 bg-blue-600";
    return "border-muted bg-background";
  };

  return (
    <>
      <Card className={swapCompleted ? "border-green-600/50 bg-green-50 dark:bg-green-950/20" : "border-yellow-600/50 bg-yellow-50 dark:bg-yellow-950/20"} data-testid="card-guardrail-alert">
        <div className={swapCompleted ? "p-3 flex items-center gap-2" : "p-6 space-y-4"}>
          {swapCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <span className="text-sm font-medium" data-testid="text-alert-title">
                  Guardrail Back In Range
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  New USDC allocation: 39%
                </span>
              </div>
            </>
          ) : (
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
                  <span className="text-muted-foreground">Current USDC allocation:</span>{" "}
                  <span className="font-semibold text-red-600">{currentDrift}%</span>
                </div>
                <div data-testid="text-target-drift">
                  <span className="text-muted-foreground">Target:</span>{" "}
                  <span className="font-semibold text-green-600">35-40%</span>
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
                      {!swapCompleted && (
                        <Button 
                          size="sm" 
                          onClick={handleExecuteSwap}
                          disabled={executing}
                          data-testid="button-execute-swap"
                        >
                          Review Swap on Hyperliquid
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Agent Execution Modal */}
      <Dialog open={showExecutionModal} onOpenChange={setShowExecutionModal}>
        <DialogContent className="sm:max-w-[600px]" data-testid="modal-swap-execution">
          <DialogHeader>
            <DialogTitle data-testid="text-modal-title">Recommended Rebalancing Swap</DialogTitle>
            <DialogDescription data-testid="text-modal-description">
              Arcot Treasury Agent requests a one-time Hyperliquid swap and shows the parameters before execution.
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
                      {step.status === "completed" && <CheckCircle2 className="w-4 h-4 text-white" />}
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
                              {/* Swap Parameters Summary */}
                              {step.debug.request?.body?.meta && (
                                <div>
                                  <div className="font-semibold mb-2 font-sans">Swap Parameters (Arcot → Hyperliquid)</div>
                                  <div className="grid grid-cols-2 gap-2 p-2 bg-background rounded border text-xs">
                                    <div><span className="text-muted-foreground">From:</span> {step.debug.request.body.meta.token_from}</div>
                                    <div><span className="text-muted-foreground">To:</span> {step.debug.request.body.meta.token_to}</div>
                                    <div><span className="text-muted-foreground">Amount:</span> {step.debug.request.body.meta.amount_notional}</div>
                                    <div><span className="text-muted-foreground">Venue:</span> {step.debug.request.body.meta.venue}</div>
                                    <div><span className="text-muted-foreground">Order Type:</span> {step.debug.request.body.meta.order_type}</div>
                                    <div><span className="text-muted-foreground">Max Slippage:</span> {step.debug.request.body.meta.max_slippage}</div>
                                    <div><span className="text-muted-foreground">Gas Fees:</span> {step.debug.request.body.meta.estimated_gas_fees}</div>
                                    <div><span className="text-muted-foreground">Network Fees:</span> {step.debug.request.body.meta.network_fees}</div>
                                    <div><span className="text-muted-foreground">Exchange Fee:</span> {step.debug.request.body.meta.exchange_fee}</div>
                                    <div><span className="text-muted-foreground">Agent Fee:</span> {step.debug.request.body.meta.agent_fee}</div>
                                    <div className="col-span-2"><span className="text-muted-foreground">Permission:</span> {step.debug.request.body.meta.usage_permission}</div>
                                  </div>
                                </div>
                              )}
                              
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
                                    {step.debug.payment ? "Hyperliquid Exchange API Request" : "API Request"}
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
                      Guardrail resolved. USDC allocation moved from 46% to 39%.
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          <div className="flex justify-end">
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
