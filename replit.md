# Arcot - Autonomous Risk & Compliance Officer

## Overview

Arcot is a multi-agent system for risk, compliance, and treasury management built onchain. The application provides real-time monitoring of cryptocurrency transactions with intelligent risk detection using x402 payment-based compliance verification, and autonomous treasury rebalancing across multiple portfolios. The system is designed for crypto-native banking operations with sub-second compliance verification and institutional-grade execution.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server.

**UI Component Library**: Radix UI primitives with shadcn/ui styling system. The design follows a fintech dashboard pattern inspired by Stripe Dashboard, Plaid, and Linear, emphasizing information clarity and professional restraint.

**Styling**: Tailwind CSS with custom design tokens for:
- Color-coded risk levels (green/cleared, amber/suspicious, red/confirmed)
- Compliance flag types with semantic badge variants
- Consistent spacing primitives (2, 4, 6, 8 units)
- Typography system using Inter (primary) and JetBrains Mono (monospace for transaction data)

**State Management**: TanStack Query (React Query) for server state with custom query client configuration. Minimal client state using React hooks.

**Routing**: Wouter for lightweight client-side routing with three main pages:
- Home (landing page with feature cards)
- Risk & Compliance Monitor
- Treasury Management

**Key UI Components**:
- TransactionStream: Real-time transaction monitoring with status badges
- RiskyTransactionTable: Detailed compliance analysis view
- TreasuryChart: Portfolio allocation visualization using Chart.js
- AgentConsole: Typewriter-style log viewer for agent operations
- GlobalMap: Geographic transaction activity visualization
- PortfolioView: Multi-entity portfolio drift tracking
- RebalancingFeed: Autonomous rebalancing operation stream

### Backend Architecture

**Runtime**: Node.js with Express.js server framework.

**API Design**: RESTful endpoints with `/api` prefix. The application was initially prototyped to support these key operations:
- `POST /api/compliance/check`: Simulates HTTP 402-style payment challenges for compliance verification
- `POST /api/compliance/pay`: Handles payment intent processing (designed to integrate with Coinbase CDP Server Wallets)
- `POST /api/compliance/verify`: Returns compliance verdicts after payment verification
- `POST /api/liquidity/quote`: Provides asset swap quotes (designed for real price API integration)

**Current State**: The server routes are stubbed out in `server/routes.ts` with minimal implementation. The storage layer provides an in-memory implementation with interfaces designed for future database persistence.

**Development Tooling**: Custom Vite middleware for HMR, runtime error overlay, and development banners in Replit environment.

### Data Layer

**ORM**: Drizzle ORM configured for PostgreSQL with type-safe schema definitions.

**Database**: PostgreSQL (via Neon serverless driver) with connection pooling. The schema currently defines a basic users table as a starting point.

**Storage Interface**: Abstract storage layer (`IStorage`) with in-memory implementation (`MemStorage`) for development. Designed to be swapped with database-backed implementation.

**Schema Organization**: Shared schema definitions in `shared/schema.ts` using Drizzle with Zod validation for runtime type checking.

### Build & Deployment

**Build Process**: 
- Frontend: Vite bundles React application to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js` with ESM format
- Database: Drizzle Kit for schema migrations

**Development**: Concurrent frontend (Vite dev server) and backend (tsx with hot reload) in development mode.

**Production**: Static frontend served from Express with bundled backend server.

## External Dependencies

### UI & Styling
- **Radix UI**: Comprehensive set of unstyled, accessible component primitives (accordion, dialog, dropdown, select, tabs, toast, etc.)
- **Tailwind CSS**: Utility-first CSS framework with PostCSS for processing
- **shadcn/ui**: Component collection built on Radix UI with custom variant system
- **Chart.js**: Canvas-based charting library for treasury allocation visualization
- **Lucide React**: Icon library for consistent iconography

### Data & State Management
- **TanStack Query v5**: Server state management with automatic caching and background updates
- **React Hook Form**: Form state management with Zod resolver for validation
- **Drizzle ORM**: Type-safe ORM for PostgreSQL with schema introspection
- **Zod**: Runtime type validation and schema definition

### Database
- **@neondatabase/serverless**: Serverless PostgreSQL driver optimized for edge runtime
- **connect-pg-simple**: PostgreSQL session store (configured but not actively used)

### Development Tools
- **Vite**: Fast development server with HMR and optimized production builds
- **TypeScript**: Type safety across frontend and backend
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast JavaScript bundler for production server code
- **Replit plugins**: Runtime error modal, cartographer, and dev banner for Replit environment

### Routing & Navigation
- **Wouter**: Minimalist routing library (~1.5KB) as lightweight alternative to React Router

### Future Integration Points
- **Coinbase CDP Server Wallets**: Planned integration for actual payment processing in compliance flow
- **Price API**: Planned integration for real-time liquidity quotes (currently using mock data)
- **x402 Payment Protocol**: HTTP 402-based micropayment system for compliance verification services