# Design Guidelines: Autonomous Risk & Compliance Officer Dashboard

## Design Approach
**System: Fintech Dashboard Pattern** - Drawing inspiration from Stripe Dashboard, Plaid, and Linear's data-focused interfaces. This is a utility-first application where clarity, hierarchy, and professional presentation of real-time data are paramount.

## Core Design Principles
1. **Information Clarity**: Clear visual hierarchy for transaction data, risk indicators, and system status
2. **Professional Restraint**: No decorative elements; every component serves a functional purpose
3. **Status Communication**: Immediate visual feedback for transaction risk levels and workflow states
4. **Data Density**: Efficiently display multiple data streams without overwhelming the user

## Typography System
- **Primary Font**: Inter (via Google Fonts) - weights 400, 500, 600
- **Monospace**: JetBrains Mono (via Google Fonts) - weight 400 for transaction hashes, addresses, and console logs
- **Scale**:
  - Page title: text-xl font-semibold
  - Section headers: text-base font-semibold
  - Transaction data: text-sm
  - Console logs: text-xs font-mono
  - Status badges: text-xs font-medium uppercase tracking-wide

## Layout System
**Spacing Primitives**: Use Tailwind units of 2, 4, 6, and 8 consistently (p-4, gap-6, m-8, etc.)

**Dashboard Structure**:
```
┌─────────────────────────────────────┐
│ Header (Start Scenario button)     │
├──────────────────┬──────────────────┤
│ Transaction      │ Treasury Chart   │
│ Stream (Left)    │ (Right)          │
│ (Scrollable)     │                  │
├──────────────────┴──────────────────┤
│ Agent Console (Full Width)          │
└─────────────────────────────────────┘
```

- Container: max-w-7xl mx-auto px-6
- Grid Layout: `grid grid-cols-1 lg:grid-cols-2 gap-6`
- Console: Full width below, min-height of 300px

## Component Library

### Transaction Stream
- **Container**: Border, rounded corners (rounded-lg), subtle shadow
- **Transaction Row**: Horizontal layout with hover state, padding p-3
- **Structure**: 
  - Transaction ID (truncated hash, monospace)
  - Amount (right-aligned, font-semibold)
  - Status badge (pill shape, rounded-full px-3 py-1)
- **Status Indicators**:
  - Pending: Neutral badge
  - High Risk: Warning badge with alert icon
  - Approved: Success badge with checkmark icon
- **Highlight State**: Distinct border treatment for active transaction

### Treasury Pie Chart
- **Container**: Match transaction stream container style
- **Chart**: Chart.js with clean legend below
- **Labels**: Show asset symbol + percentage
- **Responsive**: Maintain aspect ratio, max height 400px

### Agent Console
- **Container**: Terminal-style appearance with subtle border
- **Header**: "Agent Console" label with status indicator dot
- **Log Area**: 
  - Scrollable (overflow-y-auto, max-h-64)
  - Monospace font for all log entries
  - Timestamp prefix for each log line (text-gray-500)
  - Step indicators: "→ Step 1:", "✓ Completed:", "⚠ Warning:"
- **Content**: Left-aligned, line-height relaxed for readability

### Start Scenario Button
- **Placement**: Top-right of header
- **Style**: Primary action button (px-6 py-2.5)
- **State**: Disabled state while scenario is running

### Status Badges
- **Shape**: Pill (rounded-full)
- **Padding**: px-3 py-1
- **Size**: text-xs
- **Types**: Pending, High Risk, Low Risk, Verified, Processing

### Data Display Patterns
- **Key-Value Pairs**: Label on left, value on right, subtle divider
- **Numeric Values**: Tabular figures, right-aligned when in columns
- **Addresses/Hashes**: Truncate middle with ellipsis (0x1234...5678), monospace font
- **Timestamps**: Relative time preferred ("2m ago"), absolute on hover

## Accessibility
- All status changes announced via semantic HTML
- Sufficient contrast ratios for all text and badges
- Focus states for interactive elements
- ARIA labels for chart and dynamic content regions

## Animation Guidelines
**Minimal & Purposeful Only**:
- Transaction highlight: Subtle pulse or border glow (1-2 seconds)
- Chart update: Smooth transition (transition-all duration-500)
- Console logs: Simple fade-in per line (optional, can be instant)
- No loading spinners, decorative animations, or typewriter effects

## Images
**No images required** - This is a data-focused dashboard where visual clarity comes from typography, layout, and information design, not imagery.

## Viewport Behavior
- Single-page application, content fits naturally within viewport
- Transaction stream: Scrollable if content exceeds container
- Console: Scrollable with fixed height
- Chart: Responsive sizing within its container
- Mobile: Stack to single column, full-width components