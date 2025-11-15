import { cdpWallet } from "./cdp-wallet";

interface PaymentRequirements {
  tool: {
    id: string;
    name: string;
  };
  payment_requirements: {
    amount: string;
    asset: string;
    chain_id: string;
    recipient: string;
    expires_at: string;
    description: string;
  };
}

interface ComplianceResult {
  role: string;
  risk_score: number;
  verdict: "approved" | "flagged" | "blocked";
  notes: string[];
  alerts?: AlertData[];
}

interface AlertData {
  type: "darknet" | "sanctions" | "velocity" | "geographic" | "new_entity";
  severity: "critical" | "high" | "medium" | "low";
  details: Record<string, any>;
}

interface ComplianceState {
  paymentRequirements: PaymentRequirements | null;
  paymentReceived: boolean;
  result: ComplianceResult | null;
}

class ComplianceToolSimulator {
  private state: Map<string, ComplianceState> = new Map();

  private getKey(txId: string, role: string): string {
    return `${txId}:${role}`;
  }

  resetState(txId: string): void {
    const senderKey = this.getKey(txId, "sender");
    const receiverKey = this.getKey(txId, "receiver");
    this.state.delete(senderKey);
    this.state.delete(receiverKey);
  }

  async handleCheck(txId: string, role: "sender" | "receiver", xPayment?: string): Promise<{
    status: number;
    body: any;
    headers?: Record<string, string>;
  }> {
    const key = this.getKey(txId, role);
    let state = this.state.get(key);

    // First call - no payment yet
    if (!state || (!state.paymentReceived && !xPayment)) {
      const paymentRequirements = await this.generatePaymentRequirements(role);
      
      this.state.set(key, {
        paymentRequirements,
        paymentReceived: false,
        result: null,
      });

      return {
        status: 402,
        body: paymentRequirements,
      };
    }

    // Second call - with X-PAYMENT header
    if (xPayment && state?.paymentRequirements) {
      // Validate payment (simplified for demo)
      const isValid = this.validatePayment(xPayment, state.paymentRequirements);
      
      if (!isValid) {
        return {
          status: 402,
          body: { error: "Invalid payment", ...state.paymentRequirements },
        };
      }

      // Generate compliance result
      const result = this.generateComplianceResult(role);
      
      state.paymentReceived = true;
      state.result = result;
      this.state.set(key, state);

      return {
        status: 200,
        body: result,
        headers: {
          "X-PAYMENT-RESPONSE": Buffer.from(JSON.stringify({
            payment_accepted: true,
            amount: state.paymentRequirements.payment_requirements.amount,
            asset: state.paymentRequirements.payment_requirements.asset,
          })).toString('base64'),
        },
      };
    }

    // Edge case
    return {
      status: 400,
      body: { error: "Invalid request state" },
    };
  }

  private async generatePaymentRequirements(role: string): Promise<PaymentRequirements> {
    const complianceAddress = await cdpWallet.getComplianceAddress();
    const amount = role === "sender" ? "0.002" : "0.003";
    
    return {
      tool: {
        id: "chain-guard-compliance-v2",
        name: "ChainGuard Compliance v2",
      },
      payment_requirements: {
        amount,
        asset: "USDC",
        chain_id: "84532", // Base Sepolia
        recipient: complianceAddress,
        expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
        description: `${role.charAt(0).toUpperCase() + role.slice(1)} compliance check`,
      },
    };
  }

  private validatePayment(xPayment: string, requirements: PaymentRequirements): boolean {
    try {
      const paymentData = JSON.parse(Buffer.from(xPayment, 'base64').toString('utf-8'));
      return paymentData.amount === requirements.payment_requirements.amount;
    } catch {
      return true; // Simplified validation for demo
    }
  }

  private generateComplianceResult(role: string): ComplianceResult {
    if (role === "sender") {
      return {
        role: "sender",
        risk_score: 12,
        verdict: "approved",
        notes: ["No darknet hits", "Low activity level", "Standard transaction pattern"],
        alerts: [],
      };
    } else {
      // Receiver - high risk with multiple alerts
      return {
        role: "receiver",
        risk_score: 87,
        verdict: "flagged",
        notes: ["Multiple risk indicators detected", "Requires manual review"],
        alerts: [
          {
            type: "darknet",
            severity: "critical",
            details: {
              cluster: "Silk Road 2.0",
              connected_addresses: 12,
              recommendation: "Flag this transaction for manual review and SAR filing.",
              intel_url: "https://chainalysis.com/darknet-report/cluster-472",
            },
          },
          {
            type: "new_entity",
            severity: "medium",
            details: {
              wallet_age_days: 3,
              previous_activity: 0,
              recommendation: "New wallet with no transaction history",
            },
          },
          {
            type: "geographic",
            severity: "high",
            details: {
              jurisdiction: "Bulgaria",
              risk_category: "High-risk jurisdiction",
              recommendation: "Enhanced monitoring recommended",
            },
          },
        ],
      };
    }
  }
}

export const complianceTool = new ComplianceToolSimulator();
