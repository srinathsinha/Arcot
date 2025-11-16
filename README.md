# Arcot - Autonomous Risk & Compliance Officer

**Live Demo**: [https://getarcot.replit.app/](https://getarcot.replit.app/)

## Overview

Arcot is a next-generation multi-agent system for onchain risk, compliance, and treasury management. Built for crypto-native banking operations, Arcot provides sub-second compliance verification using the x402 payment protocol and autonomous treasury rebalancing with institutional-grade execution.

## Key Features

### 🔍 Real-Time Risk & Compliance Monitor
- Transaction stream monitoring with risk flagging
- Approve/reject workflow with detailed compliance analysis
- x402 payment-based compliance verification
- Multi-agent compliance checks (sanctions screening, AML/KYC, geo-restrictions)
- Transaction detail sidebar with complete compliance metadata

### 💼 Multi-Agent Treasury Management
- Portfolio drift tracking across multiple entities (Coinbase Commerce, Stripe Treasury, Shopify Payments)
- Autonomous guardrail alerts triggering on >5% portfolio drift
- Real-time portfolio allocation visualization
- Recent transaction history with approval tracking

### 🤖 Agent-to-Agent Swap Execution
- 5-agent workflow orchestration (Portfolio → Risk → Hyperliquid → Treasury → QA)
- Live Hyperliquid DEX integration via real API endpoint (`POST https://api.hyperliquid.xyz/exchange`)
- Comprehensive swap parameter visibility:
  - Token pairs and notional amounts
  - Order type and venue details
  - Fee breakdown (gas, network, exchange, agent)
  - Slippage protection and usage permissions
- Animated workflow progression with status indicators
- Dynamic drift updates (8.5% → 2.1% after rebalancing)

### 🌍 Global Activity Visualization
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
- PostgreSQL (Neon serverless)
- Drizzle ORM

**Integrations**
- Hyperliquid DEX API (real swap execution)
- x402 Payment Protocol (compliance verification)
- Coinbase CDP Server Wallets (payment processing - demo mode)

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
- PostgreSQL database

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:5000`.

### Environment Variables

```bash
# Optional: Real Coinbase CDP integration
CDP_API_KEY_NAME=your_api_key_name
CDP_PRIVATE_KEY=your_private_key

# Session management
SESSION_SECRET=your_session_secret
```

**Note**: The application runs in demo mode without CDP credentials, using mock wallets for payment simulation.

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
│   ├── index.ts              # Express server & CDP wallet setup
│   ├── routes.ts             # API endpoints (compliance, liquidity)
│   └── storage.ts            # In-memory storage layer
├── shared/
│   └── schema.ts             # Shared type definitions
└── README.md
```

## API Endpoints

- `POST /api/compliance/check` - Initiate compliance verification
- `POST /api/compliance/pay` - Process payment intent
- `POST /api/compliance/verify` - Return compliance verdict
- `POST /api/liquidity/quote` - Get asset swap quote

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

Built with ❤️ for the future of crypto-native banking
