import { cdpWallet } from "./cdp-wallet";
import { complianceTool } from "./compliance-tool";

interface TimelineEvent {
  type: string;
  role?: string;
  status: string;
  ts: string;
  [key: string]: any;
}

interface OrchestratorResponse {
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

export interface TransactionInput {
  amount: number;
  token: string;
  from: string;
  to: string;
}

export async function runCompliance(
  txId: number, 
  txInput: TransactionInput
): Promise<OrchestratorResponse> {
  // Reset compliance tool state for fresh run
  complianceTool.resetState(txId.toString());
  
  const timeline: TimelineEvent[] = [];
  const agentAddress = await cdpWallet.getAgentAddress();
  const complianceAddress = await cdpWallet.getComplianceAddress();

  // Transaction metadata from input
  const txMetadata = {
    token: txInput.token,
    amount: txInput.amount,
    from: txInput.from,
    to: txInput.to || agentAddress,
  };

  // STEP 1: Sender - Initial Compliance Call (402)
  const senderFirstCallReq = {
    url: "/tools/compliance/check",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: {
      txId,
      role: "sender",
      address: txMetadata.from,
      amount: txMetadata.amount,
      token: txMetadata.token,
    },
  };

  const senderFirstCall = await complianceTool.handleCheck(txId.toString(), "sender");

  timeline.push({
    type: "call_compliance_agent",
    role: "sender",
    status: "completed",
    ts: new Date().toISOString(),
    invoice: senderFirstCall.body,
    debug: {
      locus_first_call: {
        request: senderFirstCallReq,
        response: {
          status: senderFirstCall.status,
          body: senderFirstCall.body,
        },
      },
    },
  });

  // STEP 2: Sender - CDP Payment
  const senderPayment = await cdpWallet.sendPayment({
    amount: senderFirstCall.body.payment_requirements.amount,
    asset: senderFirstCall.body.payment_requirements.asset,
    to_address: senderFirstCall.body.payment_requirements.recipient,
    chain_id: senderFirstCall.body.payment_requirements.chain_id,
  });

  const senderPaymentPayload = Buffer.from(
    JSON.stringify({
      amount: senderPayment.amount,
      asset: senderPayment.asset,
      tx_hash: senderPayment.tx_hash,
      from: senderPayment.from,
      to: senderPayment.to,
    })
  ).toString("base64");

  // STEP 3: Sender - Retry with X-PAYMENT (200)
  const senderSecondCallReq = {
    url: "/tools/compliance/check",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-PAYMENT": senderPaymentPayload,
    },
    body: senderFirstCallReq.body,
  };

  const senderSecondCall = await complianceTool.handleCheck(
    txId.toString(),
    "sender",
    senderPaymentPayload
  );

  timeline.push({
    type: "verify_sender",
    role: "sender",
    status: "completed",
    ts: new Date().toISOString(),
    amount_paid: senderPayment.amount,
    asset: senderPayment.asset,
    tx_hash: senderPayment.tx_hash,
    result: senderSecondCall.body,
    debug: {
      cdp_payment: {
        request: {
          amount: senderPayment.amount,
          asset: senderPayment.asset,
          to: senderPayment.to,
          chain_id: senderPayment.chain_id,
        },
        response: senderPayment,
      },
      locus_second_call: {
        request: senderSecondCallReq,
        response: {
          status: senderSecondCall.status,
          body: senderSecondCall.body,
          headers: senderSecondCall.headers || {},
        },
      },
    },
  });

  // STEP 4: Receiver - Initial Compliance Call (402)
  const receiverFirstCallReq = {
    url: "/tools/compliance/check",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: {
      txId,
      role: "receiver",
      address: txMetadata.to,
      amount: txMetadata.amount,
      token: txMetadata.token,
    },
  };

  const receiverFirstCall = await complianceTool.handleCheck(txId.toString(), "receiver");

  timeline.push({
    type: "call_compliance_agent",
    role: "receiver",
    status: "completed",
    ts: new Date().toISOString(),
    invoice: receiverFirstCall.body,
    debug: {
      locus_first_call: {
        request: receiverFirstCallReq,
        response: {
          status: receiverFirstCall.status,
          body: receiverFirstCall.body,
        },
      },
    },
  });

  // STEP 5: Receiver - CDP Payment
  const receiverPayment = await cdpWallet.sendPayment({
    amount: receiverFirstCall.body.payment_requirements.amount,
    asset: receiverFirstCall.body.payment_requirements.asset,
    to_address: receiverFirstCall.body.payment_requirements.recipient,
    chain_id: receiverFirstCall.body.payment_requirements.chain_id,
  });

  const receiverPaymentPayload = Buffer.from(
    JSON.stringify({
      amount: receiverPayment.amount,
      asset: receiverPayment.asset,
      tx_hash: receiverPayment.tx_hash,
      from: receiverPayment.from,
      to: receiverPayment.to,
    })
  ).toString("base64");

  // STEP 6: Receiver - Retry with X-PAYMENT (200)
  const receiverSecondCallReq = {
    url: "/tools/compliance/check",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-PAYMENT": receiverPaymentPayload,
    },
    body: receiverFirstCallReq.body,
  };

  const receiverSecondCall = await complianceTool.handleCheck(
    txId.toString(),
    "receiver",
    receiverPaymentPayload
  );

  timeline.push({
    type: "verify_receiver",
    role: "receiver",
    status: "completed",
    ts: new Date().toISOString(),
    amount_paid: receiverPayment.amount,
    asset: receiverPayment.asset,
    tx_hash: receiverPayment.tx_hash,
    result: receiverSecondCall.body,
    debug: {
      cdp_payment: {
        request: {
          amount: receiverPayment.amount,
          asset: receiverPayment.asset,
          to: receiverPayment.to,
          chain_id: receiverPayment.chain_id,
        },
        response: receiverPayment,
      },
      locus_second_call: {
        request: receiverSecondCallReq,
        response: {
          status: receiverSecondCall.status,
          body: receiverSecondCall.body,
          headers: receiverSecondCall.headers || {},
        },
      },
    },
  });

  // STEP 7: Generate Alert Events from Receiver Result
  if (receiverSecondCall.body.alerts && Array.isArray(receiverSecondCall.body.alerts)) {
    for (const alert of receiverSecondCall.body.alerts) {
      const alertEvent: TimelineEvent = {
        type: `alert_${alert.type}`,
        status: "alert",
        severity: alert.severity,
        ts: new Date().toISOString(),
        ...alert.details,
      };

      timeline.push(alertEvent);
    }
  }

  // STEP 8: Q&A Follow-up (0.00)
  const qaEvent: TimelineEvent = {
    type: "qa_followup",
    status: "completed",
    ts: new Date().toISOString(),
    price: "0.00",
    question: "How confident is this darknet classification vs false positive?",
    answer: "We estimate >97% confidence based on cluster analysis, transaction patterns, and known entity associations.",
    debug: {
      qa_call: {
        request: {
          url: "/tools/compliance/qa",
          method: "POST",
          body: {
            question: "How confident is this darknet classification vs false positive?",
          },
        },
        response: {
          status: 200,
          body: {
            answer: "We estimate >97% confidence based on cluster analysis, transaction patterns, and known entity associations.",
            confidence: 0.97,
          },
        },
      },
    },
  };

  timeline.push(qaEvent);

  // Calculate total spend
  const totalSpend = (
    parseFloat(senderPayment.amount) + parseFloat(receiverPayment.amount)
  ).toFixed(3);

  // Determine overall status and risk signals
  const riskSignals: string[] = ["new_wallet", "new_device", "risky_geo_bg"];
  if (receiverSecondCall.body.alerts) {
    riskSignals.push(
      ...receiverSecondCall.body.alerts.map((a: any) => `${a.type}_hit`)
    );
  }

  return {
    txId,
    header: {
      token: txMetadata.token,
      amount: txMetadata.amount,
      from: txMetadata.from,
      to: "Arcot Treasury Wallet",
      status: receiverSecondCall.body.risk_score > 70 ? "aml_flag" : "under_review",
      risk_score: receiverSecondCall.body.risk_score,
      risk_signals: riskSignals,
    },
    timeline,
    totalComplianceSpend: totalSpend,
    contract: {
      name: "ChainGuard Compliance v2",
      pricing: "x402 metered; Q&A bundled for 24h",
    },
  };
}
