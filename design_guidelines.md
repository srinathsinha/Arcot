# Design Guidelines: Autonomous Risk & Compliance Officer Dashboard

## Design Approach
**System: Fintech Dashboard Pattern** - Drawing inspiration from Stripe Dashboard, Plaid, and Linear's data-focused interfaces. This is a utility-first application where clarity, hierarchy, and professional presentation of real-time data are paramount.

## Core Design Principles
1. **Information Clarity**: Clear visual hierarchy for transaction data, risk indicators, and system status
2. **Professional Restraint**: No decorative elements; every component serves a functional purpose
3. **Status Communication**: Immediate visual feedback for transaction risk levels and workflow states
4. **Data Density**: Efficiently display multiple data streams without overwhelming the user
5. **Visual Communication**: Use icons and visual indicators over text where possible

## Typography System
- **Primary Font**: Inter (via Google Fonts) - weights 400, 500, 600
- **Monospace**: JetBrains Mono (via Google Fonts) - weight 400 for transaction hashes, addresses, and timestamps
- **Scale**:
  - App title: text-xl font-semibold
  - Tab labels: text-sm font-medium
  - Section headers: text-base font-semibold
  - Table headers: text-xs font-medium uppercase tracking-wide text-muted-foreground
  - Transaction data: text-sm
  - Chat messages: text-sm
  - Metadata/timestamps: text-xs text-muted-foreground

## Color System
**Risk Level Indicators**:
- **Green** (Cleared): bg-green-500/20, border-green-500, text-green-700 dark:text-green-400
- **Amber** (Suspicious): bg-yellow-500/20, border-yellow-500, text-yellow-700 dark:text-yellow-400
- **Red** (Confirmed Suspicious): bg-red-500/20, border-red-500, text-red-700 dark:text-red-400

**Compliance Flag Types** (badges):
- AML Flag: destructive variant
- Sanctions Match: destructive variant
- Velocity Check: warning (amber)
- Geographic Risk: warning (amber)
- Pattern Detection: warning (amber)

## Layout System
**Spacing Primitives**: Use Tailwind units of 2, 4, 6, and 8 consistently (p-4, gap-6, m-8, etc.)

**Application Structure**:
```
┌────────────────────────────────────────────────────────┐
│ Header: App Title + Tab Navigation                    │
│ [Risk and Compliance] [Treasury]                      │
├────────────────────────────────────────────────────────┤
│                                                        │
│ Tab Content (changes based on active tab)             │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Risk and Compliance Tab Layout
```
┌────────────────────────────────────────────────────────┐
│ Global Map (World map with transaction hotspots)      │
│ - Green, Amber, Red markers for risk levels           │
│ - Animated transaction flows between locations        │
│ - Click markers to filter table below                 │
│ Height: ~400px                                         │
├────────────────────────────────────────────────────────┤
│ Risky Transaction Table                               │
│ Token | From | To | Time | Compliance | Latency       │
│ Shows only Amber and Red flagged transactions         │
│ Click row → opens Transaction Detail Sidebar          │
└────────────────────────────────────────────────────────┘

[Transaction Detail Sidebar slides in from right when row clicked]
```

### Treasury Tab Layout
```
┌────────────────────────────────────────────────────────┐
│ Global Portfolio Overview                             │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐                 │
│ │ Entity A│ │ Entity B│ │ Entity C│                 │
│ │ Tokens  │ │ Tokens  │ │ Tokens  │                 │
│ │ vs      │ │ vs      │ │ vs      │                 │
│ │ Target  │ │ Target  │ │ Target  │                 │
│ └─────────┘ └─────────┘ └─────────┘                 │
│                                                        │
│ Portfolio Metrics: Total Value, Drift %, Last Rebal   │
├────────────────────────────────────────────────────────┤
│ Live Rebalancing Activity Feed                        │
│ 🪙 ETH → 🔄 → 💵 USDC  |  1.5 ETH @ $3,250  |  2m ago│
│ 💵 USDC → 🔄 → ₿ BTC   |  10k @ $65,000     |  5m ago│
└────────────────────────────────────────────────────────┘
```

## Component Library

### Navigation
- **Tab Navigation**: Horizontal tabs using shadcn Tabs component
  - Two tabs: "Risk and Compliance", "Treasury"
  - Active tab highlighted with border-b-2 border-primary
  - Smooth transitions between tab content

### Risk and Compliance Components

#### Global Map
- **Container**: Card component, full width, height ~400px
- **Map Visualization**: Simplified SVG world map or interactive regions
- **Hotspot Markers**: 
  - Circular markers sized by transaction volume
  - Color-coded: green (cleared), amber (suspicious), red (confirmed)
  - Pulsing animation for active transactions
- **Transaction Flows**: Animated lines/arcs between locations showing real-time activity
- **Interaction**: Click marker to filter table by region

#### Risky Transaction Table
- **Container**: Card with border and rounded corners
- **Table Structure**: Shadcn Table component
- **Columns**:
  1. Token (icon + symbol) - 15% width
  2. From Address (monospace, truncated) - 20% width
  3. To Address (monospace, truncated) - 20% width
  4. Timestamp (relative time) - 15% width
  5. Compliance Result (badge with flag type) - 20% width
  6. Latency (in ms, right-aligned) - 10% width
- **Row Interaction**: 
  - Hover state with hover-elevate
  - Click to open Transaction Detail Sidebar
  - Selected row highlighted with border-l-4 border-primary
- **Empty State**: "No risky transactions detected" with checkmark icon

#### Transaction Detail Sidebar
- **Layout**: Shadcn Sheet component sliding from right
- **Width**: 500px on desktop, full width on mobile
- **Sections** (top to bottom):
  1. **Header**: Transaction hash (large, monospace) + close button
  2. **Overview Card**: 
     - Token, amount, timestamp
     - From/To addresses (full, with copy button)
     - Current risk level badge
  3. **Visual Flow Diagram**:
     - Horizontal flow showing: Agent → x402 Challenge → Payment → Provider → Result
     - Connected nodes with arrows
     - Payment amount highlighted (e.g., "0.02 USDC paid")
     - Each step shows status icon (pending, complete)
  4. **Action Buttons**:
     - "Re-verify Transaction" button (primary)
     - Shows loading state during re-verification
  5. **Chat Interface**:
     - Label: "Ask about this transaction"
     - Text input with placeholder: "e.g., has this wallet seen suspicious activity?"
     - Message bubbles showing query and response
     - Typing indicator during <5s response time
     - Response appears as agent message with timestamp

### Treasury Components

#### Global Portfolio View
- **Layout**: Grid of entity cards (3 columns on desktop, 1 on mobile)
- **Entity Card**:
  - Header: Entity name (e.g., "Market Maker A", "Liquidity Pool B")
  - Token list with icons and amounts
  - Progress bars: Current vs Target allocation
  - Visual: Token icon + percentage bar + percentage text
  - Color coding: green (on target), amber (slight drift), red (significant drift)

#### Portfolio Metrics Dashboard
- **Layout**: Horizontal card with 3-4 key metrics
- **Metrics**:
  1. Total Portfolio Value (large, prominent)
  2. Overall Drift % (color-coded by severity)
  3. Last Rebalance Time (relative)
  4. Active Rebalancing Operations count

#### Rebalancing Activity Feed
- **Container**: Card with scrollable list
- **Activity Item Structure**:
  - Visual flow: [Token A Icon] → [Swap Arrow Icon] → [Token B Icon]
  - Amount and price
  - Timestamp (relative)
  - Status badge (pending, completed, failed)
- **Visual Language**:
  - ETH icon: 🔷 or Ξ symbol
  - BTC icon: ₿ symbol
  - USDC icon: 💵 or USDC circle
  - Swap arrow: ⇄ or custom SVG
- **Layout**: Each item is a horizontal flex row with gap-4
- **Update Animation**: New items fade in at top of list

### Token Icons
- **Implementation**: SVG icons or icon font
- **Standard Tokens**:
  - ETH: Purple/blue diamond or Ξ
  - BTC: Orange ₿
  - USDC: Blue circle with $ or text
  - Generic: Gray circle with first letter
- **Size**: w-6 h-6 for table/list items, w-8 h-8 for cards

### Status Badges
- **Shape**: Pill (rounded-full)
- **Padding**: px-3 py-1
- **Size**: text-xs font-medium
- **Types**:
  - Cleared: green variant
  - Suspicious: yellow/amber variant
  - Confirmed Suspicious: red/destructive variant
  - Processing: blue variant
  - Failed: red variant

### Visual Flow Diagram
- **Node Style**: Small rounded rectangles or circles
- **Connector**: Horizontal line or arrow between nodes
- **Node States**:
  - Pending: border-muted, text-muted-foreground
  - Active: border-primary, bg-primary/10
  - Complete: border-green, bg-green/10, checkmark icon
  - Failed: border-red, bg-red/10, X icon
- **Layout**: Horizontal flex row with gap-2, connectors auto-sized
- **Payment Highlight**: Special node or callout showing amount paid

### Chat Interface
- **Input**: Shadcn Input component with send button
- **Messages**: 
  - User message: right-aligned, bg-primary, text-primary-foreground
  - Agent message: left-aligned, bg-muted
  - Border-radius: rounded-lg
  - Padding: px-4 py-2
  - Max-width: 80% of container
- **Typing Indicator**: Three animated dots in muted color
- **Timestamp**: Below each message, text-xs text-muted-foreground

### Data Display Patterns
- **Key-Value Pairs**: Label on left, value on right, subtle divider
- **Numeric Values**: Tabular figures, right-aligned when in columns
- **Addresses/Hashes**: 
  - Truncate middle with ellipsis (0x1234...5678) in tables
  - Full address in detail views with copy button
  - Always monospace font
- **Timestamps**: 
  - Relative time preferred ("2m ago", "5s ago")
  - Absolute on hover tooltip
- **Latency Values**: 
  - Display in milliseconds (e.g., "250ms")
  - Right-aligned in tables
  - Color-coded: <100ms green, 100-300ms amber, >300ms red

## Accessibility
- All status changes announced via semantic HTML
- Sufficient contrast ratios for all text and badges
- Focus states for interactive elements
- ARIA labels for map regions, chart, and dynamic content
- Keyboard navigation for table rows and sidebar
- Screen reader announcements for real-time updates

## Animation Guidelines
**Minimal & Purposeful Only**:
- Tab transitions: Smooth fade (duration-200)
- Sidebar slide in/out: Smooth translate-x (duration-300)
- Transaction marker pulse: Subtle scale animation (2s)
- New table row: Fade in from top (duration-300)
- Transaction flow on map: Animated path (duration-1000)
- Chat message appearance: Slide up + fade (duration-200)
- Typing indicator: Bouncing dots animation
- No decorative animations, spinners only when necessary

## Viewport Behavior
- **Desktop**: Full multi-column layouts, sidebar overlays content
- **Tablet**: Adapt to 2-column where appropriate
- **Mobile**: 
  - Stack to single column
  - Sidebar becomes full-screen sheet
  - Table becomes cards or horizontal scroll
  - Map height reduces to 250px
- **Container**: max-w-7xl mx-auto px-6
- **Scrolling**: Individual sections scroll, not entire page

## Performance Considerations
- Lazy load map only when Risk and Compliance tab is active
- Virtualize long transaction tables if >100 rows
- Debounce chat input queries
- Optimize SVG icons for fast rendering
- Use CSS transforms for animations (not layout properties)
