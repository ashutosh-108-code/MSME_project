# Sentinel Shield — Product Requirements Document (PRD)

**Status:** Active — 14-Day Sprint
**Sprint Start:** July 7, 2026
**Owners:** Adyan (Frontend/Product) · Ashutosh (Backend/Logic)

---

## 1. Overview

**Product:** Sentinel Shield

**One-line pitch:** A single dashboard that gives Indian MSME business owners a plain-language security score by monitoring identity theft, email scams, data leaks, and deepfake impersonation of their business.

**Core idea:** Business owners shouldn't need to understand DMARC, fuzzy matching, or breach databases. They need one number, one status word, and one clear next action.

---

## 2. Problem Statement

Indian MSMEs (small and medium businesses) are increasingly targeted by:
- Fake websites and social profiles impersonating their business
- Invoice fraud and supplier-impersonation email scams
- Leaked business data (GST numbers, director names, emails) appearing in breach dumps
- AI-generated deepfake content impersonating owners/directors

Most MSME owners have no IT team, no security budget, and no way to know any of this is happening until real financial or reputational damage occurs. Existing security tools are built for enterprises — too technical, too expensive, too slow to act on.

---

## 3. Target User

**Primary persona:** Owner/operator of a small-to-medium Indian business (5–200 employees). Not technical. Manages the business via phone/WhatsApp as much as a laptop. Cares about: "Is my business safe right now, and what do I do if it isn't?"

**What they need from this product:**
- A single glanceable status, not a technical report
- Plain-language alerts ("A fake website was found," not "lookalike domain detected, similarity score 0.92")
- One clear action per alert
- A single button to press if something goes seriously wrong

---

## 4. Team

| Person | Role | Owns |
|---|---|---|
| Adyan | Frontend / Product | Dashboard shell, Security Score UI, alert component library, all 4 module UIs, Panic Button flow UI, copy/tone consistency |
| Ashutosh | Backend / Logic | Scoring engine, fuzzy-matching logic, Gmail API integration, DMARC/SPF/DKIM checks, LLM triage classifier, mock data APIs |

No dedicated PM — both people jointly own product decisions. This PRD, `implementation_plan.md`, and `audit.md` are the shared source of truth to keep decisions aligned without a third person coordinating.

---

## 5. Product Scope — 14-Day MVP

This is a **demo-ready MVP**, not a production system with fully live data sources. The sprint prioritizes:
1. A polished, consistent, trustworthy-feeling UI across all modules
2. Two modules with **genuinely real logic** (Identity Monitoring, Email Protection)
3. Two modules with **realistic mocked data** (Leak Watch, Deepfake Watch) — same UI quality, fake backend
4. A Panic Button flow with **one real AI integration** (LLM-based incident triage)

What "real" vs "mocked" means is called out explicitly per feature below so nothing gets overclaimed in a demo or pitch.

---

## 6. Features

### 6.1 Security Health Score
**Status:** Real logic, real-time computation from module data (mocked or real, doesn't matter to the engine).

- Single 0–100 score at the top of the dashboard
- Weighted risk engine pulling from all 4 modules (weights: identity 0.3, email 0.3, leak 0.25, deepfake 0.15 — adjustable)
- Score decreases when active threats are detected (severity + recency weighted), recovers when resolved
- Displayed as **SAFE** / **ACTION REQUIRED** in plain language alongside the number
- No jargon, no sub-scores visible unless the owner explicitly drills down

### 6.2 Identity Monitoring
**Status:** Real fuzzy-matching logic for lookalike domains. Fake social/WhatsApp/Google listing detection (mocked — needs Meta/LinkedIn API access not achievable in 14 days).

- Scans for lookalike domains using fuzzy string matching against known registered domain variants
- Owner sees: *"A fake website pretending to be your business was found at [domain]."*
- One-click "Start takedown" action (initiates a status change + generates a report; does not perform a real legal takedown in this sprint)

### 6.3 Business Email Protection
**Status:** Real Gmail API integration (read-only metadata + headers), real DMARC/SPF/DKIM validation, rules-based scam-language flagging (not a trained NLP model — out of scope for 14 days).

- Connects via Gmail API, reads headers/metadata only — never email body content
- Flags suspicious inbound emails using rules-based heuristics (spoofed sender domain patterns, common Indian business scam phrasing)
- DMARC/SPF/DKIM checked in background, surfaced in plain language
- Owner sees: *"This invoice may be fake. The sender's domain is slightly different from your real supplier."*

### 6.4 Data Leak Watch
**Status:** Fully mocked. Real breach-dump/Telegram monitoring requires a paid intel vendor or custom scraping infrastructure — explicitly out of scope for this sprint.

- Realistic mock alert feed simulating detection across paste sites, breach dumps, and Telegram channels
- Owner sees: *"Your business email domain appeared in a leaked database. Here's what to do next."*
- UI and copy built to production quality so this can be wired to a real data source (e.g. HaveIBeenPwned-style API) later without UI rework

### 6.5 Deepfake & Reputation Watch
**Status:** Fully mocked. Facial similarity matching and voice fingerprinting are multi-week ML efforts — explicitly out of scope for this sprint.

- Realistic mock alert feed simulating fake video/audio/impersonation detection
- Owner sees: *"A video impersonating your director was found on YouTube."*
- Flagging/manual review UI built for real integration later

### 6.6 Panic Button
**Status:** Real LLM-based triage classification (Anthropic API). Snapshot and report generation are real. CERT-In submission is a **draft/preview only** — not a real regulatory submission in this sprint (legal/compliance risk, out of scope).

- Single button on the dashboard
- On press: snapshots current state across all modules, generates a structured incident report, calls the LLM to classify incident type/severity, shows a simulated "escalated to human agent" status
- CERT-In report is generated as a draft the owner can review — actual submission requires a real compliance integration and legal sign-off, planned as a post-sprint item

---

## 7. Non-Goals / Explicitly Out of Scope (This Sprint)

- Real Meta/LinkedIn impersonation scraping (ToS-restricted, needs a data vendor)
- Real breach-dump/Telegram leak monitoring (needs a paid intel feed)
- Real facial similarity / voice fingerprinting (needs ML infra + vendor)
- Real CERT-In auto-submission (legal/compliance integration, human sign-off required)
- Multi-tenant billing, user roles/permissions beyond a single business owner login
- Mobile app (web dashboard only, responsive is a bonus not a requirement)

---

## 8. Success Criteria (End of Day 14)

- [ ] Dashboard loads with a live, computed Security Score (not hardcoded)
- [ ] Identity Monitoring runs real fuzzy matching against at least one test domain set
- [ ] Email Protection connects to a real Gmail account and flags at least one real DMARC/SPF issue or heuristic match
- [ ] Leak Watch and Deepfake Watch display polished, realistic mock alerts indistinguishable in UI quality from the "real" modules
- [ ] Panic Button flow runs end-to-end: snapshot → real LLM triage classification → incident report draft → escalation status
- [ ] No hardcoded secrets committed to the repo
- [ ] App is deployed and reachable via a Vercel URL for demo purposes

---

## 9. Assumptions & Risks

| Assumption/Risk | Impact if wrong |
|---|---|
| Gmail OAuth setup won't hit approval delays | Email Protection real integration slips past Day 6 |
| Fuzzy matching alone is "good enough" for a demo without a real domain registry API | Identity Monitoring may miss real-world lookalikes; acceptable for MVP |
| 2 people can hold full-stack scope without a third person | Integration days (6, 11) are the main risk points — buffer time planned |
| Anthropic API is reliable for real-time triage in a live demo | Have a cached/fallback response ready in case of API latency during a live pitch |

---

## 10. Tone & Design Principles (applies to every module, every alert)

1. **No jargon** — describe what happened and what to do, never the technical mechanism
2. **One number, one status, one action** — never overwhelm with sub-metrics by default
3. **Calm, not alarming** — colors and copy should build trust, not panic, even for high-severity alerts
4. **Every alert names the next action** — no dead-end notifications
