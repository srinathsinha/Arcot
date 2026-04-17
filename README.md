# Arcot - Autonomous Risk & Compliance Officer

**Live Demo**: Deploy this repo to Render Free Web Service for an `*.onrender.com` demo URL.

## Overview

Arcot is a next-generation multi-agent system for onchain risk, compliance, and treasury management. Built for crypto-native banking operations, Arcot provides sub-second compliance verification using the x402 payment protocol and autonomous treasury rebalancing with institutional-grade execution.

## Key Features

### Real-Time Risk & Compliance Monitor
- Transaction stream monitoring with risk flagging
- Approve/reject workflow with detailed compliance analysis
- x402 payment-based compliance verification
- Multi-agent compliance checks (sanctions screening, AML/KYC, geo-restrictions)
- Transaction detail sidebar with complete compliance metadata

### Multi-Agent Treasury Management
- Portfolio drift tracking across multiple entities (Coinbase Commerce, Stripe Treasury, Shopify Payments)
- Autonomous guardrail alerts triggering on >5% portfolio drift
- Real-time portfolio allocation visualization
- Recent transaction history with approval tracking

### Agent-to-Agent Swap Execution
- 5-agent workflow orchestration (Portfolio → Risk → Hyperliquid → Treasury → QA)
- Demo Hyperliquid DEX interaction using API-shaped payloads (`POST https://api.hyperliquid.xyz/exchange`)
- Comprehensive swap parameter visibility:
  - Token pairs and notional amounts
  - Order type and venue details
  - Fee breakdown (gas, network, exchange, agent)
  - Slippage protection and usage permissions
- Animated workflow progression with status indicators
- Dynamic allocation updates (USDC 46% → 39% after rebalancing)

### Global Activity Visualization
- Geographic transaction activity map
- Agent operation console with typewriter-style logs
- Real-time rebalancing feed

## Tech Stack

**Frontend**
- React + TypeScript
- Vite (build tool & dev server)
- Tailwind CSS + shadcn/ui components
- TanStack Query (server state management)
- Wouter (routing)
- Chart.js (portfolio visualization)

**Backend**
- Node.js + Express
- Express-served demo API and static production build
- Drizzle ORM schema support

**Integrations**
- Hyperliquid DEX API-shaped demo exchange flow
- x402 Payment Protocol-shaped compliance verification
- Coinbase CDP Server Wallet-shaped payment processing in demo mode

## Architecture

### x402 Compliance Flow
1. Transaction flagged for compliance review
2. HTTP 402 Payment Required challenge issued
3. Micropayment processed via CDP wallets
4. Multi-agent compliance verification (sanctions, AML, geo-checks)
5. Approve/reject decision with toast notifications

### Autonomous Rebalancing Flow
1. Portfolio drift monitoring (threshold: 5%)
2. Guardrail alert triggers swap recommendation
3. Agent-to-agent workflow executes:
   - Portfolio Agent: Analyzes drift and calculates rebalancing needs
   - Risk Agent: Validates swap parameters and risk limits
   - Hyperliquid Trading Agent: Requests quote and places order via exchange API
   - Treasury Agent: Confirms execution and updates portfolio state
   - QA Agent: Final verification and compliance audit
4. Dynamic drift updates post-execution

## Design Philosophy

Arcot's interface draws inspiration from fintech leaders like Stripe Dashboard, Plaid, and Linear:
- Information clarity over visual flourish
- Color-coded risk levels (green/cleared, amber/suspicious, red/confirmed)
- Professional restraint with semantic badge variants
- Consistent spacing primitives and typography system
- Dark mode support throughout

## Getting Started

### Prerequisites
- Node.js 20+

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:5000`.

### Production Build

```bash
npm run check
npm run build
npm run start
```

The production server serves the Vite build from `dist/public` and binds to `process.env.PORT`, which works for Render.

### Render Free Web Service

Create a new Render Web Service from this GitHub repo or use the included `render.yaml`.

```text
Runtime: Node
Build command: npm install && npm run build
Start command: npm run start
Environment: NODE_ENV=production
```

The demo runs without CDP secrets. Free Render services can cold start after inactivity, so open the URL shortly before presenting.

### Environment Variables

```bash
# Optional: Real Coinbase CDP integration
CDP_API_KEY_NAME=your_api_key_name
CDP_PRIVATE_KEY=your_private_key

# Optional session management
SESSION_SECRET=your_session_secret
```

**Note**: The application runs in demo mode without CDP credentials, using mock wallets and simulated/testnet-shaped payment hashes.

## Project Structure

```
arcot/
├── client/src/
│   ├── pages/
│   │   ├── Home.tsx           # Landing page with hero, problem statement, core pillars
│   │   ├── Monitor.tsx        # Transaction monitoring & approval flow
│   │   └── Treasury.tsx       # Portfolio tracking & rebalancing
│   ├── components/
│   │   ├── Navigation.tsx                    # Global navigation bar
│   │   ├── TransactionDetailSidebar.tsx      # Transaction compliance details
│   │   ├── PortfolioGuardrailAlert.tsx       # Drift alerts & swap triggers
│   │   ├── RecentTransactionsTable.tsx       # Approved transaction history
│   │   └── ui/                               # shadcn/ui components
│   └── lib/
│       └── queryClient.ts     # TanStack Query configuration
├── server/
│   ├── index.ts              # Express server & static production serving
│   ├── routes.ts             # API endpoints for compliance demo
│   ├── cdp-wallet.ts         # Demo-mode CDP wallet simulator
│   ├── compliance-tool.ts    # x402-style compliance simulator
│   ├── orchestrator.ts       # Compliance timeline orchestration
│   └── storage.ts            # In-memory storage layer
├── shared/
│   └── schema.ts             # Shared type definitions
└── README.md
```

## API Endpoints

- `POST /api/transactions/:id/run-compliance` - Run the full demo compliance workflow
- `POST /tools/compliance/check` - Simulated Locus/x402 compliance resource server

## Future Enhancements

- [ ] Real Coinbase CDP testnet integration
- [ ] Live price API integration for liquidity quotes
- [ ] Database persistence layer (PostgreSQL)
- [ ] Enhanced agent orchestration with retries & fallbacks
- [ ] Multi-chain support (Ethereum, Base, Arbitrum)
- [ ] Advanced risk modeling with ML-based fraud detection

## Demo Wallets (Demo Mode)

- Agent Wallet: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0`
- Compliance Wallet: `0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f`

## License

MIT

## Contributing

Contributions welcome! Please open an issue or submit a pull request.

---

Built for the future of crypto-native banking
