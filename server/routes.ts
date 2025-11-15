import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { cdpWallet } from "./cdp-wallet";
import { complianceTool } from "./compliance-tool";
import { runCompliance } from "./orchestrator";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize CDP wallet service on startup
  await cdpWallet.initialize();

  // Compliance Tool Simulator (x402 resource server)
  app.post("/tools/compliance/check", async (req, res) => {
    try {
      const { txId, role } = req.body;
      const xPayment = req.headers["x-payment"] as string | undefined;

      const result = await complianceTool.handleCheck(txId, role, xPayment);

      if (result.headers) {
        Object.entries(result.headers).forEach(([key, value]) => {
          res.setHeader(key, value);
        });
      }

      res.status(result.status).json(result.body);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Orchestrator - Main compliance workflow
  app.post("/api/transactions/:id/run-compliance", async (req, res) => {
    try {
      const txId = parseInt(req.params.id, 10);
      const { amount, token, from, to } = req.body || {};
      
      const result = await runCompliance(txId, {
        amount: amount || 0,
        token: token || "USDC",
        from: from || "0x0000000000000000000000000000000000000000",
        to: to || "",
      });
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
