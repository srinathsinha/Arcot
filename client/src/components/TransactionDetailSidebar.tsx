import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Copy, CheckCircle2, Loader2, AlertTriangle, ChevronDown, Shield, MapPin, Clock, User, ExternalLink, Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { RiskyTransaction } from "./RiskyTransactionTable";

interface TransactionDetailSidebarProps {
  transaction: RiskyTransaction | null;
  open: boolean;
  onClose: () => void;
  onDecision: (transaction: RiskyTransaction, decision: "approved" | "rejected") => void;
}

interface TimelineEvent {
  type: string;
  role?: string;
  status: string;
  ts: string;
  invoice?: any;
  amount_paid?: string;
  asset?: string;
  tx_hash?: string;
  result?: any;
  severity?: string;
  debug?: any;
  [key: string]: any;
}

interface ComplianceResponse {
  txId: number;
  header: {
    token: string;
    amount: number;
    from: string;
    to: string;
    status: string;
    risk_score: number;
    risk_signals: string[];
  };
  timeline: TimelineEvent[];
  totalComplianceSpend: string;
  contract: {
    name: string;
    pricing: string;
  };
}

export default function TransactionDetailSidebar({ 
  transaction, 
  open, 
  onClose,
  onDecision,
}: TransactionDetailSidebarProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [expandedDebug, setExpandedDebug] = useState<Record<number, boolean>>({});
  const [expandedAlerts, setExpandedAlerts] = useState<Record<number, boolean>>({});
  const [complianceData, setComplianceData] = useState<ComplianceResponse | null>(null);

  // Mutation to run compliance workflow via POST
  const runComplianceMutation = useMutation({
    mutationFn: async (tx: RiskyTransaction) => {
      const response = await apiRequest('POST', `/api/transactions/${tx.numericId}/run-compliance`, {
        amount: tx.amount,
        token: tx.token,
        from: tx.from,
        to: tx.to,
      });
      const data = await response.json();
      return data as ComplianceResponse;
    },
    onSuccess: (data) => {
      setComplianceData(data);
    },
    onError: (error) => {
      console.error('Compliance workflow error:', error);
      // Keep the sidebar open but show error state
    },
  });

  useEffect(() => {
    if (open && transaction) {
      setExpandedDebug({});
      setExpandedAlerts({});
      setComplianceData(null); // Reset data when switching transactions
      // Trigger compliance workflow for the selected transaction
      runComplianceMutation.mutate(transaction);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, transaction?.id]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleReVerify = async () => {
    if (transaction) {
      setComplianceData(null); // Reset before re-running
      runComplianceMutation.mutate(transaction);
    }
  };

  const handleApprove = () => {
    if (transaction) {
      onDecision(transaction, "approved");
      sessionStorage.setItem("arcot-approved-transaction", JSON.stringify({
        id: transaction.id,
        numericId: transaction.numericId,
        token: transaction.token,
        amount: transaction.amount,
        from: transaction.from,
        to: transaction.to,
        timestamp: "Just now",
        approvedBy: "Arcot Compliance Agent",
        status: "approved",
      }));
      toast({
        title: "Transaction Approved",
        description: `Transaction ${transaction.id} has been approved and forwarded to Treasury.`,
      });
      onClose();
      setTimeout(() => {
        setLocation("/treasury");
      }, 500);
    }
  };

  const handleReject = () => {
    if (transaction) {
      onDecision(transaction, "rejected");
      toast({
        title: "Transaction Rejected",
        description: `Transaction ${transaction.id} has been rejected and flagged for review.`,
        variant: "destructive",
      });
      onClose();
    }
  };

  const formatAmount = (amount: number, token: string) => {
    if (token === "USDC" && amount >= 1000) {
      return `$${amount.toLocaleString()}`;
    }
    return `${amount.toLocaleString()} ${token}`;
  };

  const formatTimestamp = (ts: string) => {
    try {
      return new Date(ts).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      });
    } catch {
      return ts;
    }
  };

  const getAlertIcon = (type: string) => {
    if (type.includes('darknet')) return AlertTriangle;
    if (type.includes('sanctions')) return Shield;
    if (type.includes('geographic')) return MapPin;
    if (type.includes('velocity')) return Clock;
    if (type.includes('new_entity')) return User;
    return AlertTriangle;
  };

  const getAlertColor = (severity?: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-600/50 bg-red-50 dark:bg-red-950/20';
      case 'high':
        return 'border-orange-600/50 bg-orange-50 dark:bg-orange-950/20';
      case 'medium':
        return 'border-yellow-600/50 bg-yellow-50 dark:bg-yellow-950/20';
      default:
        return 'border-red-600/50 bg-red-50 dark:bg-red-950/20';
    }
  };

  const getEventTitle = (event: TimelineEvent) => {
    switch (event.type) {
      case 'call_compliance_agent':
        return 'Call Compliance Agent';
      case 'verify_sender':
        return 'Verify Sender Wallet';
      case 'verify_receiver':
        return 'Verify Receiver Wallet';
      case 'alert_darknet':
        return 'Alert: Darknet Market Linkage';
      case 'alert_sanctions':
        return 'Alert: Sanctions List Match';
      case 'alert_geographic':
        return 'Alert: High-Risk Jurisdiction';
      case 'alert_velocity':
        return 'Alert: Unusual Transaction Pattern';
      case 'alert_new_entity':
        return 'Alert: New Entity Risk';
      case 'qa_followup':
        return 'Follow-up Q&A';
      default:
        return event.type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
  };

  const getEventSubtitle = (event: TimelineEvent) => {
    if (event.type === 'call_compliance_agent') {
      return 'From: Locus Agent Marketplace';
    }
    if (event.role) {
      return `Role: ${event.role}`;
    }
    return undefined;
  };

  const getStatusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    if (status === 'in-progress') return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
    if (status === 'alert') return <AlertTriangle className="w-5 h-5 text-red-600" />;
    return <div className="w-5 h-5 rounded-full border-2 border-muted" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'completed') return 'border-green-600 bg-green-600';
    if (status === 'in-progress') return 'border-blue-600 bg-blue-600';
    if (status === 'alert') return 'border-red-600 bg-red-600';
    return 'border-muted bg-muted';
  };

  if (!transaction) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:w-[600px] sm:max-w-[600px] overflow-y-auto" data-testid="sidebar-transaction-detail">
        <SheetHeader>
          <SheetTitle className="text-sm" data-testid="text-transaction-title">
            Transaction Details
          </SheetTitle>
        </SheetHeader>

        {runComplianceMutation.isPending ? (
          <div className="flex items-center justify-center py-12" data-testid="loading-compliance">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Running compliance workflow...</span>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {/* Header */}
            {complianceData && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm border border-card-border rounded-lg p-3" data-testid="section-header">
                  <span className="font-semibold" data-testid="text-amount">
                    {formatAmount(complianceData.header.amount, complianceData.header.token)}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="font-mono text-xs text-muted-foreground" data-testid="text-from">
                    {complianceData.header.from.slice(0, 6)}...{complianceData.header.from.slice(-4)}
                  </span>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-5 w-5"
                    onClick={() => handleCopy(complianceData.header.from)}
                    data-testid="button-copy-from"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-xs text-muted-foreground">{complianceData.header.to}</span>
                  <Badge variant="destructive" className="ml-auto text-xs" data-testid="badge-risk">
                    {complianceData.header.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>

                <div className="text-xs space-y-1 text-muted-foreground">
                  <div>Risk Score: <span className="font-semibold text-red-600">{complianceData.header.risk_score}/100</span></div>
                  <div>Signals: {complianceData.header.risk_signals.join(', ')}</div>
                </div>
              </div>
            )}

            {/* Timeline */}
            {complianceData && (
              <div data-testid="section-verification">
                <h3 className="text-sm font-semibold mb-4">Verification Timeline</h3>
                <div className="relative">
                  <div className="absolute left-[10px] top-2 bottom-2 w-[2px] bg-card-border" />
                  
                  <div className="space-y-4">
                    {complianceData.timeline.map((event, index) => {
                      const isAlert = event.type.startsWith('alert_');
                      const Icon = isAlert ? getAlertIcon(event.type) : null;

                      return (
                        <div key={index} className="relative pl-8" data-testid={`step-${index}`}>
                          <div 
                            className={`absolute left-0 w-5 h-5 rounded-full border-2 ${getStatusColor(event.status)} flex items-center justify-center`}
                            style={{ top: '2px' }}
                          >
                            {event.status === 'completed' && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>

                          <Card className={isAlert ? getAlertColor(event.severity) : ''}>
                            <div className="p-3 space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(event.status)}
                                  {Icon && <Icon className="w-4 h-4" />}
                                  <span className="font-medium text-sm">{getEventTitle(event)}</span>
                                </div>
                                {event.amount_paid && (
                                  <Badge variant="secondary" className="text-xs font-mono">
                                    ${event.amount_paid} {event.asset}
                                  </Badge>
                                )}
                                {event.price !== undefined && (
                                  <Badge variant="secondary" className="text-xs font-mono">
                                    ${event.price} USDC
                                  </Badge>
                                )}
                              </div>

                              {getEventSubtitle(event) && (
                                <p className="text-xs text-muted-foreground">{getEventSubtitle(event)}</p>
                              )}

                              {event.tx_hash && (
                                <div className="text-xs">
                                  <span className="text-muted-foreground">Demo payment: </span>
                                  <span className="font-semibold">Arcot Agent → Compliance Tool</span>
                                  <Badge variant="outline" className="ml-2 text-[10px]">Simulated testnet tx</Badge>
                                  <div className="mt-1">
                                    <a 
                                      href={`https://sepolia.basescan.org/tx/${event.tx_hash}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline text-xs font-mono flex items-center gap-1"
                                    >
                                      {event.tx_hash.slice(0, 10)}...{event.tx_hash.slice(-8)}
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  </div>
                                </div>
                              )}

                              {event.result && (
                                <div className="text-xs">
                                  <span className="text-muted-foreground">Verdict: </span>
                                  <span className="font-semibold">{event.result.verdict}</span>
                                </div>
                              )}

                              {event.ts && (
                                <p className="text-xs text-muted-foreground">{formatTimestamp(event.ts)}</p>
                              )}

                              {/* Alert Details */}
                              {isAlert && (
                                <div className="mt-2 space-y-1 text-xs">
                                  {event.cluster && (
                                    <div><span className="text-muted-foreground">Cluster:</span> <span className="font-semibold">{event.cluster}</span></div>
                                  )}
                                  {event.connected_addresses !== undefined && (
                                    <div><span className="text-muted-foreground">Connected Addresses:</span> <span className="font-semibold">{event.connected_addresses}</span></div>
                                  )}
                                  {event.jurisdiction && (
                                    <div><span className="text-muted-foreground">Jurisdiction:</span> <span className="font-semibold">{event.jurisdiction}</span></div>
                                  )}
                                  {event.wallet_age_days !== undefined && (
                                    <div><span className="text-muted-foreground">Wallet Age:</span> <span className="font-semibold">{event.wallet_age_days} days</span></div>
                                  )}
                                  {event.recommendation && (
                                    <div className="mt-2 pt-2 border-t"><span className="text-muted-foreground">Recommendation:</span> <div className="font-semibold mt-1">{event.recommendation}</div></div>
                                  )}
                                  {event.intel_url && (
                                    <a 
                                      href={event.intel_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1 text-primary hover:underline mt-2"
                                    >
                                      View Intelligence Report
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              )}

                              {/* Q&A */}
                              {event.question && (
                                <div className="mt-2 space-y-2 text-xs">
                                  <div><span className="text-muted-foreground">Q:</span> <span className="italic">{event.question}</span></div>
                                  <div><span className="text-muted-foreground">A:</span> <span>{event.answer}</span></div>
                                </div>
                              )}

                              {/* API Details */}
                              {event.debug && (
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
                                      {event.debug.locus_first_call && (
                                        <div>
                                          <div className="font-semibold mb-1">1. Initial Request (402)</div>
                                          <pre className="whitespace-pre-wrap overflow-x-auto">
                                            {JSON.stringify(event.debug.locus_first_call, null, 2)}
                                          </pre>
                                        </div>
                                      )}
                                      {event.debug.cdp_payment && (
                                        <div>
                                          <div className="font-semibold mb-1">2. CDP Payment</div>
                                          <pre className="whitespace-pre-wrap overflow-x-auto">
                                            {JSON.stringify(event.debug.cdp_payment, null, 2)}
                                          </pre>
                                        </div>
                                      )}
                                      {event.debug.locus_second_call && (
                                        <div>
                                          <div className="font-semibold mb-1">3. Retry with X-PAYMENT (200)</div>
                                          <pre className="whitespace-pre-wrap overflow-x-auto">
                                            {JSON.stringify(event.debug.locus_second_call, null, 2)}
                                          </pre>
                                        </div>
                                      )}
                                      {event.debug.qa_call && (
                                        <div>
                                          <div className="font-semibold mb-1">Q&A Call</div>
                                          <pre className="whitespace-pre-wrap overflow-x-auto">
                                            {JSON.stringify(event.debug.qa_call, null, 2)}
                                          </pre>
                                        </div>
                                      )}
                                    </div>
                                  </CollapsibleContent>
                                </Collapsible>
                              )}
                            </div>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Compliance Spend */}
            {complianceData && (
              <div className="pt-4 border-t space-y-2 text-xs" data-testid="section-spend">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total compliance spend:</span>
                  <span className="font-semibold">${complianceData.totalComplianceSpend} USDC</span>
                </div>
                <div className="text-muted-foreground">
                  Contract: {complianceData.contract.name} ({complianceData.contract.pricing})
                </div>
              </div>
            )}

            {/* Action buttons */}
            {complianceData && (
              <div data-testid="section-actions" className="space-y-3">
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 gap-2" 
                    onClick={handleApprove}
                    disabled={runComplianceMutation.isPending}
                    data-testid="button-approve"
                  >
                    <Check className="w-4 h-4" />
                    Approve & Forward to Treasury
                  </Button>
                  <Button 
                    className="flex-1 gap-2" 
                    onClick={handleReject}
                    disabled={runComplianceMutation.isPending}
                    variant="destructive"
                    data-testid="button-reject"
                  >
                    <X className="w-4 h-4" />
                    Reject Transaction
                  </Button>
                </div>
                <Button 
                  className="w-full gap-2" 
                  onClick={handleReVerify}
                  disabled={runComplianceMutation.isPending}
                  variant="outline"
                  data-testid="button-reverify"
                >
                  {runComplianceMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Re-run Compliance Check"
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
