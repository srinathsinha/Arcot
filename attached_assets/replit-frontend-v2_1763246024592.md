
# FRONTEND_INSTRUCTIONS_v2.md
### Replit – Frontend Specification (Aligned with CDP, Locus, x402)

---

## 1. PURPOSE

Build a **single-page web frontend** that:

1. Shows a **Transaction Details panel** for a high‑risk 8,200 USDC inflow.
2. Renders a **Verification Timeline** driven entirely from backend JSON.
3. Makes the **x402 + CDP Agent Wallet + Locus** story visually and technically clear:
   - HTTP 402 → PaymentRequirements → wallet payment → `X-PAYMENT` → `X-PAYMENT-RESPONSE`.
   - Agent‑to‑agent micro‑payments (Arcot Agent → Compliance Tool).
   - Risk verdict + darknet alert.
4. Exposes **API details** so judges from Coinbase, Locus, and x402 can inspect real requests/headers/bodies.

No business logic is hardcoded in the UI; everything comes from backend responses.

---

## 2. HIGH‑LEVEL FLOW

1. User clicks the flagged **8,200 USDC transaction** (or presses a “Run Compliance” button).
2. Frontend calls:
   - `POST /api/transactions/9821/run-compliance`
3. Backend responds with a JSON payload containing:
   - `header` – transaction overview + risk summary.
   - `timeline` – ordered list of events (call tool, invoice, payment, retry, alerts, Q&A).
   - `totalComplianceSpend` – sum of invoice amounts (e.g. 0.005 USDC).
   - `contract` – description of the Locus/x402 contract.
4. Frontend renders:
   - Transaction Details header bar.
   - Risk summary.
   - Vertical Verification Timeline.
   - Expandable “API details” sections showing:
     - HTTP 402 response with PaymentRequirements.
     - CDP payment call + tx hash.
     - Second request with `X-PAYMENT` header.
     - Optional `X-PAYMENT-RESPONSE` from the tool.

---

## 3. TRANSACTION DETAILS PANEL STRUCTURE

### 3.1 Trigger and Visibility

- The panel is **hidden by default**.
- It becomes **visible** when:
  - The user selects the flagged 8,200 USDC transaction, or
  - The autonomous agent flow reaches the “Enhanced Due Diligence” step.
- Once visible, the panel should be “sticky” during the entire verification run.

### 3.2 Header Section (from `response.header`)

Render from backend fields:

- **Primary line** (single compressed overview):
  - `[TOKEN] AMOUNT` – e.g. `[USDC] 8,200`
  - `From <shortened sender address>` – e.g. `From 0x19a3…b7c2`
  - `→ Arcot Treasury Wallet`
  - Status pill, using backend `status`:
    - `AML Flagged`
    - `Under Review`
    - `Approved`
    - `Blocked (Darknet Exposure)`

- **Badges / chips**:
  - `High Risk`
  - `New Wallet`
  - `New Device`
  - `BG` (geo)
  - Any additional signals the backend exposes.

### 3.3 Risk Summary (from `header.risk_score` and `header.risk_signals`)

Direct mapping:

- Line 1: `Risk Score: {risk_score}/100 ({High/Medium/Low label if provided})`
- Line 2: `Signals: {risk_signals.join(", ")}`

The frontend must not infer; it simply renders provided data.

---

## 4. VERIFICATION TIMELINE

### 4.1 Source of Truth

- Entire timeline is driven by `response.timeline[]`.
- Each element has at minimum:
  - `type` (string)
  - `status` (“completed”, “pending”, “alert”, etc.)
  - `ts` (timestamp)
  - Event‑specific fields (e.g. amount_paid, tx_hash, risk_score, cluster)
  - `debug` block holding raw API interactions.

### 4.2 Event Types to Support

The UI must support, at minimum, these types:

1. `call_compliance_agent`
2. `invoice_sender` (optional explicit invoice event)
3. `verify_sender`
4. `invoice_receiver` (optional explicit invoice event)
5. `verify_receiver`
6. `alert_darknet`
7. `qa_followup`

If the backend chooses to merge invoice+verify into a single event, the frontend should still render correctly by checking which fields exist.

### 4.3 Timeline Rendering

For each event, render:

- **Left column**: visual step marker
  - Circle + connecting vertical line.
  - Color:
    - Green for normal/completed.
    - Yellow for “under review”.
    - Red for alerts (e.g., `alert_darknet`).
- **Right column**: content
  - Title (based on event type; see mapping below).
  - Subtitle (address or short label).
  - Timestamp (from `ts`, human‑readable).
  - Optional “amount chip” for x402 payments.
  - Summary lines derived from event fields.

**Suggested title mapping (frontend-controlled text):**

- `call_compliance_agent` → “Call Compliance Agent (Locus Marketplace)”
- `invoice_sender` → “Sender PaymentRequirements (HTTP 402)”
- `verify_sender` → “Verify Sender Wallet – x402 Payment + Result”
- `invoice_receiver` → “Receiver PaymentRequirements (HTTP 402)”
- `verify_receiver` → “Verify Receiver Wallet – x402 Payment + Result”
- `alert_darknet` → “Alert: Linked to Darknet Cluster”
- `qa_followup` → “Follow‑up Q&A (Bundled)”

---

## 5. VISUALIZING AGENT‑TO‑AGENT PAYMENTS

For payment-related events (`verify_sender`, `verify_receiver`):

- Show a **prominent amount chip**:
  - from `event.amount_paid` and `event.asset` (e.g. `0.002 USDC`).
- Show a short label:
  - `Arcot Agent Wallet → Compliance Tool Wallet`.
- Show `tx_hash` as a clickable link (to explorer URL provided by backend).

This must make it obvious that:

- An autonomous agent used an AI Agent Wallet (via CDP) to pay another tool/agent.
- The payment is real and verifiable onchain.

---

## 6. API DETAILS EXPANSION (CRITICAL FOR JUDGES)

Each timeline event includes a `debug` object from the backend, which contains raw HTTP interactions.

The frontend must support an expandable “API Details” view per event.

### 6.1 UX

- Each event card includes a small link/button:
  - “View API Details”.
- When expanded, show structured sections based on `event.debug`, e.g.:

#### For `verify_sender`:

1. **Outgoing HTTP 1 – Initial Request (no payment):**
   - Method + URL (e.g., `POST https://…/tools/compliance/check`).
   - Request body JSON (pretty‑printed).
   - Response:
     - Status: `402 Payment Required`.
     - Body: PaymentRequirements JSON.

2. **CDP Wallet Payment:**
   - Method + URL to CDP.
   - Request body:
     - from, to, amount, asset, chain.
   - Response body:
     - tx_hash, effective gas used, etc.

3. **Outgoing HTTP 2 – Retry with `X-PAYMENT`:**
   - Request headers:
     - Include `X-PAYMENT: <base64 payload>` (show truncated value).
   - Request body:
     - Same logical request (tx and participant details).
   - Response:
     - Status: `200 OK`.
     - Body: risk result JSON.

**Important:**  
Frontend should visually label the headers using the exact names:

- `X-PAYMENT` (for sending payment payload on retry).
- `X-PAYMENT-RESPONSE` (if present on 200).

The actual values come from backend `debug`.

---

## 7. DARKNET ALERT CARD

For `alert_darknet` events:

- Render a highlight card in the timeline with:

  - `Risk Score: {risk_score}/100`
  - `Known Entity / Cluster: {cluster}`
  - `Connected Addresses: {connected_addresses}`
  - `Recommendation: {recommendation}`

- If backend provides an `intel_url`, render:
  - A link: “View Intelligence Report →”.

This card must visually stand out as the “red flag” moment.

---

## 8. TOTAL COMPLIANCE SPEND & CONTRACT SUMMARY

At bottom of the Transaction Details panel:

- Show `Total compliance spend: {totalComplianceSpend} {token}`.
- Show contract summary:
  - From `response.contract.name` and `response.contract.pricing`.
  - Example:  
    `Contract: ChainGuard Compliance v2 (Locus tool, x402 metered; Q&A bundled for 24h)`

Frontend never computes totals; it just displays backend values.

---

## 9. SUCCESS CRITERIA (FOR FRONTEND)

The frontend is considered correct when:

1. Selecting the high‑risk transaction triggers a call to  
   `POST /api/transactions/9821/run-compliance`.
2. The Transaction Details panel displays:
   - Header + badges.
   - Risk summary.
   - Timeline with at least 5 steps including a darknet alert.
3. At least **one payment step** renders:
   - A visible amount chip (0.002 / 0.003 USDC).
   - Arcot Agent → Compliance Tool label.
   - Clickable tx_hash.
4. “View API Details” shows:
   - The initial 402 response with PaymentRequirements.
   - The CDP payment call.
   - The retry request with `X-PAYMENT`.
5. No core strings (amounts, tx hashes, clusters) are hardcoded; they all reflect backend JSON.
