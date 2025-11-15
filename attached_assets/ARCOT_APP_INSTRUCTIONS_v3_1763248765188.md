
# ARCOT_APP_INSTRUCTIONS_v3.md
### Replit – Combined Landing Page + End-to-End UX Flow Spec (No Code Required)

---

## 0. PURPOSE

Implement a cohesive product experience for **Arcot** that includes:

1. A strong, differentiated **landing page** with clear messaging, visuals, and a “View Demo” CTA into Monitor.
2. A complete **Monitor → Treasury → Hyperliquid** flow where:
   - Users re-run compliance,
   - Approve or reject a transaction,
   - See portfolio guardrails breached,
   - Review and execute a recommended swap via an agent-to-agent interaction.

This file replaces earlier separate specs so Replit can make all changes together.

---

## 1. LANDING PAGE – COPY & EXPERIENCE

### 1.1 Overall Goals

- Clearly explain **what Arcot is** and **why it matters** in one screen.
- Separate:
  - The **category-level promise** (what Arcot is as a system), from
  - The **product modules** (Monitor and Treasury).
- Highlight Arcot’s unique foundation on **x402 payments, Locus toolchains, and CDP Agent Wallets** without overwhelming the user with jargon.
- Drive a single clear action: **“View Demo” → Monitor**.

Do not change routing/component names; focus on copy, layout hierarchy, and visual emphasis.

---

### 1.2 Hero Section – Copy & Layout

**Headline (use exactly):**

> Autonomous Risk, Compliance Operations & Treasury AI for On-Chain Finance

**Sub-head (simpler, less AI-jargon):**

> Give your institution a real-time control plane for on-chain risk, compliance decisions, and treasury moves — with every step executed and auditable onchain.

**Primary CTA button:**

- Text: **“View Demo”**
- Behavior: Navigates to the **Monitor** page / route (the main demo experience).

**Secondary CTA (optional, smaller):**

- Text: **“How Arcot Works”**
- Behavior: Scrolls to the “How Arcot Works” section on the same page.

**Layout instructions:**

- Hero should be above the fold:
  - Left column: headline, sub-head, CTAs.
  - Right column: hero visual (see 1.5).
- Increase whitespace; headline should be the largest font on the page.
- Primary CTA: filled, high-contrast button. Secondary CTA: outline or ghost.

---

### 1.3 Problem Statement Section

Place directly under the hero.

**Section title:**

> Onchain finance still runs on manual risk ops.

**Bullets (use as-is or very close):**

- High-risk inflows are flagged, but humans often review them **days or weeks** after funds move.
- Compliance, risk, and treasury teams work in **different tools**, with no unified view of onchain exposure.
- No one is giving agents the ability to **pay other tools on demand** — so most onchain risk analysis is shallow or purely rule-based.

Visual: 3-column or stacked bullets, subtle icons, light background.

---

### 1.4 “What Arcot Is” – Category Pillars

Replace the current top-row value cards with **three pillars** that describe Arcot as a system. These are NOT the product modules.

**Pillar 1 – Autonomous AML & Sanctions Intelligence**

Subtext:

> Agents continuously scan transaction flows, trigger deeper checks when needed, and use x402 payments to call third-party intelligence providers.

**Pillar 2 – Autonomous Treasury Operations**

Subtext:

> Agents track allocation drift and liquidity risk, then execute rebalancing moves using CDP Agent Wallets — swaps, transfers, and hedges.

**Pillar 3 – Machine-to-Machine Toolchains**

Subtext:

> Agents discover, pay, and chain tools from Locus and x402 Bazaar — no billing dashboards, no manual invoices, just programmatic micro-payments.

Layout:

- Three cards in a row under the problem section.
- Style them slightly differently from product cards (e.g., softer background, “System Pillar” label).

---

### 1.5 Hero / Supporting Visual

Update the hero visual to show:

- A **transaction stream** feeding into an **Arcot Agent node**.
- From the agent node:
  - Arrows to “Compliance Tool A” and “Intel Tool B” labeled **x402 Payment**.
  - Arrow to an onchain icon labeled **CDP Agent Wallet Execution**.

Labels to include (tiny tags):

- “x402 Payment”
- “CDP Agent Wallet”
- “Locus / x402 Bazaar”

This can be an illustration or a simplified diagram; it does not need to be interactive.

---

### 1.6 Product Modules – Monitor & Treasury

Keep two modules but sharpen copy and visually separate them from the pillars.

Add a section header above the modules:

**Section title:**

> The Arcot Product

**Subline:**

> Two surfaces built on the same autonomous risk, compliance, and treasury engine.

#### 1.6.1 Arcot Monitor (Compliance & Risk UI)

**Eyebrow text:** `Real-time Compliance & Risk`

**Card title:** `Monitor`

**Description (replace existing):**

> Track global transaction flows, investigate flagged inflows, and inspect the full verification trail — including every x402 payment and tool call your agents made.

**Tag chips:** `Global Activity`, `Agent Trails`, `x402 Verification`

**Interaction:**

- Clicking the **Monitor** card should behave like the “View Demo” CTA (navigate to Monitor).

#### 1.6.2 Arcot Treasury (Autonomous Balance Sheet Ops)

**Eyebrow text:** `Autonomous Portfolio & Liquidity`

**Card title:** `Treasury`

**Description (replace existing):**

> Oversee multi-entity portfolios, monitor allocation drift, and watch agents execute rebalancing operations directly onchain via CDP wallets.

**Tag chips:** `Multi-Entity View`, `Drift Metrics`, `Agent Execution`

**Interaction:**

- Clicking the **Treasury** card navigates to the Treasury tab/view (or a “Coming Soon” state if that view isn’t fully implemented).

---

### 1.7 “How Arcot Works” Section

Add a step-by-step strip below the product section.

**Section title:**

> How Arcot Works in One High-Risk Transaction

**Suggested steps (use as captions):**

1. **Detect** – A high-risk inflow hits your address. Arcot flags it using rules and pattern analysis.
2. **Verify** – An agent calls a Locus-discoverable compliance tool. The tool responds with **HTTP 402 Payment Required** and a price.
3. **Pay** – The agent uses a **CDP Agent Wallet** to send a micro-payment, then retries with an **X-PAYMENT** header.
4. **Decide** – The tool returns a verdict (e.g., linked to darknet cluster). Arcot recommends block, allow, or escalate.
5. **Act** – If needed, a treasury agent executes an onchain hedge or rebalance, and Monitor shows the full trail.

Present this as a horizontal timeline with icons.

---

### 1.8 “Why Arcot, Not Another Dashboard” (Optional Section)

**Section title:**

> Why Arcot, Not Another Dashboard

Three bullets:

- **Economic agents, not just alerts.**  
  Arcot agents can call tools and pay them via x402 — not just raise tickets.

- **Compliance and treasury in one loop.**  
  The same decision context informs both whether to accept a transaction and how to rebalance around it.

- **Transparent by default.**  
  Every agent call, payment, and onchain action is visible in Arcot Monitor.

---

### 1.9 Visual & UX Polishing

- Typography:
  - Hero headline largest, section titles next, card titles next, body smallest.
- Card design:
  - Consistent icon set.
  - Soft shadows, rounded corners, hover elevation.
- CTA placement:
  - Hero: “View Demo” primary, “How Arcot Works” secondary.
  - Monitor card: include a small “Launch Demo →” link as well.

---

### 1.10 Landing Page Success Criteria

Landing page is “done” when:

1. A new visitor can answer above-the-fold:
   - What is Arcot?
   - Who is it for?
   - What does it automate?
2. “View Demo” and the Monitor card both route to Monitor.
3. Pillars and product modules are visually and copy-wise distinct.
4. x402 / Locus / CDP are mentioned but the text remains readable to a non-technical stakeholder.
5. Overall feel is that of a modern SaaS landing page.

---

## 2. END-TO-END UX FLOW – MONITOR → TREASURY → HYPERLIQUID

The following sections define the interactive product flow once a user clicks **View Demo** or the **Monitor** card.

---

### 2.1 Overall Flow Summary

1. User lands on **Monitor** and re-runs compliance on a high-risk transaction.
2. They then **Approve** or **Reject** the transaction.
3. If **Rejected**:
   - Drawer closes.
   - Transaction status becomes bright red `Rejected`.
4. If **Approved**:
   - Navigate to **Treasury**.
   - Approved transaction appears in **Recent Transactions**.
   - A guardrail alert appears indicating portfolio imbalance and recommending a swap on Hyperliquid.
5. User opens the recommendation, edits swap parameters, and clicks **Execute Swap**.
6. UI shows an **agent-to-agent interaction** between Arcot’s treasury agent and a Hyperliquid AI agent with parameters visible.
7. Swap “completes”; guardrail resolves and treasury tables update.

Most of this can run on mock data and client-side state.

---

### 2.2 Monitor Tab – Approve / Reject Flow

#### 2.2.1 Transaction Details Drawer

Inside the Transaction Details drawer (right side), under the Verification Timeline:

- Add action buttons:

  - **Primary:** `Approve Transaction`
  - **Secondary:** `Reject Transaction`

Shown after the compliance run is complete.

#### 2.2.2 Reject Transaction Behavior

On `Reject Transaction` click:

1. **Update table status**
   - For the selected transaction row in the Monitor table:
     - `Status` becomes `Rejected`.
     - Status pill color: bright red.

2. **Close drawer**
   - Animate drawer closing to the right.

3. **Optional toast**
   - “Transaction rejected. No treasury action taken.”

No navigation in this branch.

#### 2.2.3 Approve Transaction Behavior

On `Approve Transaction` click:

1. **Update table status**
   - Set status to `Approved` (green pill).

2. **Store navigation context**
   - In a global or upper-level state, store an object:
     - `txId`, `token`, `amount`, `from`, `to`, `decision: "approved"`.

3. **Navigate to Treasury**
   - Route to the Treasury tab/view, optionally including `txId` in URL or navigation state.

4. **Optional toast**
   - “Transaction approved. Checking for portfolio impact…”

---

### 2.3 Treasury Tab – Recent Transactions & Guardrail Alert

#### 2.3.1 Recent Transactions Table

- Add or extend a `Recent Transactions` table with columns:
  - `Time`
  - `Token`
  - `Amount`
  - `Direction` (Inflow/Outflow)
  - `Status` (Approved/Executed)

Behavior:

- When arriving from Monitor with an approved transaction:
  - Insert a row at the top representing this inflow.
  - Status: `Approved`.

You may mix static data + this dynamic row.

#### 2.3.2 Portfolio Guardrail Alert

Above or beside the table, add a **Guardrail Alert** card.

**Card content:**

- Title: `Portfolio Guardrail Breached`
- Subline example:
  > The latest inflow pushed your USDC allocation above the 40% guardrail. Arcot recommends a rebalancing swap.

- Bullet details:
  - `Current USDC allocation: 46%`
  - `Target: 35–40%`
  - `Recommended action: Swap 5,000 USDC → ETH on Hyperliquid`

- Call-to-action button:
  - `Review Swap on Hyperliquid`

Clicking this opens the swap recommendation UI.

---

### 2.4 Hyperliquid Swap Recommendation – Edit & Execute

#### 2.4.1 Swap Recommendation Panel

Display as a right-hand drawer or center modal.

**Header:** `Recommended Rebalancing Swap`

Pre-populated fields:

- `From Token`: `USDC`
- `To Token`: `ETH`
- `Amount`: `5,000`
- `Chain / Venue`: `Hyperliquid`
- `Network`: `Base`
- `Max Slippage`: `0.5%`
- `Gas & Network Fees (estimated)`: e.g. `0.12 USDC`
- `Agent Fee`: e.g. `0.05% of notional`
- `Usage Permission`: `One-time use for this swap only` (display only)

Interaction:

- User can edit all fields except `Usage Permission`.
- Buttons:
  - Primary: `Execute Swap`
  - Secondary: `Cancel` (closes panel).

---

### 2.5 Agent-to-Agent Swap Execution Visualization

On **Execute Swap**:

1. Lock the form and replace it with an **Agent Interaction view**.

2. Show a short multi-step interaction between:

   - `Arcot Treasury Agent`
   - `Hyperliquid AI Agent`

Use a vertical timeline or chat-like cards.

#### Step 1 – Arcot → Hyperliquid (Swap Request)

Show payload fields:

- `token_from: "USDC"`
- `token_to: "ETH"`
- `amount: "5000"`
- `venue: "Hyperliquid"`
- `chain: "Base"`
- `max_slippage: "0.5%"`
- `usage_permission: "single_transaction_only"`

#### Step 2 – Hyperliquid → Arcot (Quote + Fees)

Show response payload:

- `expected_fill_price`
- `estimated_gas_fees`
- `network_fees`
- `agent_fee`
- `valid_until`
- `trade_id`

Highlight gas, network, and agent fees as separate lines.

#### Step 3 – Arcot → Hyperliquid (Execution Confirm)

Show confirmation payload:

- `trade_id`
- `final_amount`
- `slippage_tolerance`
- `wallet_address`
- `usage_permission` echoed.

#### Step 4 – Hyperliquid → Arcot (Execution Result)

Show final status:

- `status: "filled"`
- `executed_amount`
- `average_price`
- `tx_hash` (can be mocked)
- `fees_paid` breakdown.

This is visual; real Hyperliquid integration is not required for the demo.

---

### 2.6 Post-Execution UI Updates

After a short “processing” animation:

1. Swap panel shows a success state:
   - “Swap executed by Arcot ↔ Hyperliquid agents.”

2. Update **Guardrail Alert**:

   - Change to a resolved/info state:
     - e.g. `Guardrail back in range. New USDC allocation: 39%.`

3. Update **Recent Transactions** table:

   - Add a new row:
     - Time: now
     - Token: `USDC → ETH`
     - Amount: `5,000`
     - Status: `Executed` (green).

Optionally add an “Agent log” link for future expansion.

---

### 2.7 Simple State Model (Hint)

Use client-side state to keep things simple:

- `monitorTransactions[]`
- `treasuryTransactions[]`
- `portfolioState`:
  - `usdc_allocation_current`
  - `guardrail_min`
  - `guardrail_max`

Behaviors:

- Approving a Monitor transaction:
  - Adds inflow to `treasuryTransactions`.
  - Temporarily sets `usdc_allocation_current` over `guardrail_max`.
- Executing the swap:
  - Adds swap to `treasuryTransactions`.
  - Brings `usdc_allocation_current` back inside guardrail range.

No real math is needed; just adjust values consistently for display.

---

### 2.8 End-to-End UX Success Criteria

The UX is considered complete when:

1. **Monitor**
   - After a compliance run, user can Approve or Reject.
   - Reject closes drawer and marks row `Rejected` (bright red).
   - Approve marks row `Approved` and navigates to Treasury with context.

2. **Treasury**
   - Approved transaction appears in Recent Transactions.
   - Guardrail alert appears referencing the new inflow and recommends a Hyperliquid swap.

3. **Hyperliquid Flow**
   - `Review Swap on Hyperliquid` opens a pre-filled swap panel.
   - User can edit fields and click `Execute Swap`.
   - Agent-to-agent interaction view shows key parameters exchanged.

4. **Post-Swap**
   - Guardrail alert resolves with updated allocation.
   - Recent Transactions table includes a new `Executed` swap row.
   - No full page reload; all handled via front-end state.

5. **Judge Perspective**
   - A judge from Coinbase, Locus, x402, or Hyperliquid can clearly see:
     - Where human decisions happen (Approve/Reject, Edit Swap).
     - How Arcot uses autonomous agents + payments to call tools and exchanges.
     - The concrete parameters that move between agents during execution.

---
