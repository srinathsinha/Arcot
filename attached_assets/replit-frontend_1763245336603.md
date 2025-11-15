# FRONTEND INSTRUCTIONS  
### (For Replit – What to Build, How It Should Function, No Code Required)

## OVERALL GOAL

Extend the existing UI with a **Transaction Details panel** that renders a complete  
**Verification Timeline** based entirely on backend-supplied data.

This timeline must clearly visualize **agent-to-agent x402 payments**, including:

- Invoice → Payment → Retry cycles  
- Real CDP wallet payment tx_hash  
- Raw API requests/responses for transparency  
- Darknet alert visualization  
- Total compliance spend and pricing contract

Everything must be **data-driven** from backend JSON — NO hardcoded values.

---

## 1. TRIGGERING THE PANEL

- When the user clicks the flagged **8,200 USDC transaction**, or when the autonomous run reaches EDD (enhanced due diligence), the frontend must:
  1. Call:  
     **`POST /api/transactions/:id/run-compliance`**
  2. Receive a JSON object with:
     - `header`
     - `timeline` (ordered steps)
     - `totalComplianceSpend`
     - `contract`
  3. Show the **Transaction Details panel** populated with this data.

**Success condition:**  
Clicking the transaction triggers a full compliance run → panel updates dynamically.

---

## 2. PANEL STRUCTURE

### A. Header Line (Data-Driven)

Render from `response.header`:

- `[TOKEN] amount`
- `From <address> → To <address>`
- Status pill:  
  - “AML Flag”, “Under Review”, “Approved”, or “Blocked”
- Small badges:
  - New Wallet  
  - New Device  
  - Geo (BG)  
  - High Risk  

### B. Risk Summary

From backend values:

- `Risk Score: {score}/100`
- `Signals: {comma-separated list}`

NO hardcoding.

---

## 3. VERIFICATION TIMELINE (Vertical Steps)

Render each backend event from `response.timeline[]`:

### Event Types to Support:

1. `call_compliance_agent`
2. `verify_sender`
3. `verify_receiver`
4. `alert_darknet`
5. `qa_followup`

Each event provides:

- `type`
- `status` ("completed" / "alert")
- `ts` (timestamp)
- Summary fields (amount_paid, verdict, cluster, risk_score, recommendation)
- **debug** object containing raw API details:
  - request URL, headers, body
  - response status + body
  - payment tx_hash (for CDP)

### Frontend Step Rendering Requirements

#### For each step:

- Left: vertical timeline marker  
  - Green for completed  
  - Red for alert
- Right: content:
  - Title (based on event type)  
  - Subtitle (sender/receiver address or summary)  
  - Timestamp  
  - Amount badge (for payments)  
  - Results summary (verdict, darkness cluster, recommendation)

---

## 4. API DETAILS EXPANSION (CRITICAL)

For **verify_sender** and **verify_receiver**, include a “View API Details” toggle.

When expanded, show:

### A. Compliance Tool – First Call (402)
From `event.debug.locus_first_call`:
- Endpoint URL
- Request JSON
- Response (402 status + invoice JSON)

### B. CDP Payment Step
From `event.debug.cdp_payment`:
- Payment request to CDP (address, amount)
- CDP response including **real tx_hash**
- Label this visually as:  
  **Arcot Agent Wallet → Compliance Tool Wallet**

### C. Compliance Tool – Retry (200)
From `event.debug.locus_second_call`:
- Request URL + header `X-402-Payment: <proof>`
- Response body containing result (risk_score, darknet fields, etc.)

**Success condition:**  
Judges must see real raw API interactions with CDP and x402.

---

## 5. DARKNET ALERT CARD

For event type `alert_darknet`, render a card containing:

- Risk Score (e.g., 85/100)
- Connected Addresses (e.g., 12)
- Known Entity (e.g., Silk Road 2.0 cluster)
- Recommendation (e.g., “Flag for manual review”)
- External link: “View on Chainalysis” (URL from backend)

---

## 6. TOTAL COMPLIANCE SPEND

At bottom of panel:

- `Total compliance spend: {value} USDC`
- `Contract: {contract.name} ({contract.pricing})`

---

## 7. VISUALIZING AGENT-TO-AGENT PAYMENT

For sender & receiver steps:

- Add an icon or mini arrow graphic:
  **Arcot Agent → Locus Compliance Agent**
- Show amount (e.g., `$0.002 USDC`)
- Show tx_hash as a link to explorer

This MUST be visually prominent.

---

## 8. SUCCESS CRITERIA SUMMARY

Replit must produce a frontend that:

- Dynamically renders the panel from backend JSON  
- Displays all API interactions via collapsible debug panels  
- Shows one real on-chain CDP payment with a visible tx_hash  
- Shows real x402 behavior (402 → payment → 200)  
- Shows agent-to-agent payment flows  
- Matches the timeline style shown in your reference screenshot.