# Sentinel Shield — Testing Strategy

**Scope:** Full automated test suite across frontend and backend, given the 14-day timeline. This is the safety net — the goal isn't 100% coverage everywhere, it's making sure the parts that are genuinely real (scoring engine, fuzzy matching, DMARC checks, LLM triage) can't silently break as both people keep shipping.

---

## 1. Testing Philosophy

- **Real logic gets real tests.** The scoring engine, fuzzy matching, and DMARC/SPF/DKIM checks are the "real" parts of this MVP per `prd.md` — they get the most thorough unit testing.
- **Mocked modules get contract tests, not logic tests.** Leak Watch and Deepfake Watch don't have real logic to test, but their API responses must match `types/alert.ts` exactly — that's what gets tested.
- **UI gets component tests for reused pieces, not every page.** `AlertCard`, `ScoreDisplay`, `ModuleCard` are used everywhere — test these thoroughly. Don't write redundant tests for every page that just renders them with different data.
- **Critical user flows get E2E coverage.** Dashboard load, viewing an alert, pressing Panic Button — these must work end-to-end, tested as a user would experience them.

---

## 2. Tooling

| Purpose | Tool |
|---|---|
| Unit tests (logic) | Vitest (or Jest) |
| Component tests | React Testing Library |
| End-to-end tests | Playwright |
| CI | GitHub Actions — runs on every PR into `main` |

---

## 3. Unit Test Targets (Ashutosh — logic layer)

### `lib/scoring/engine.ts`
- [ ] No alerts → score is 100, status SAFE
- [ ] One critical open alert → score drops significantly, status ACTION_REQUIRED
- [ ] All alerts resolved → score recovers to 100
- [ ] Mixed severities across modules → weighted calculation matches expected formula
- [ ] Recency decay (if implemented) → older resolved alerts don't drag score down

### `lib/matching/fuzzyDomain.ts`
- [ ] Exact match of real domain → no false positive flagged
- [ ] Known lookalike pattern (character substitution, added hyphen, TLD swap) → correctly flagged
- [ ] Completely unrelated domain → not flagged
- [ ] Similarity score threshold boundary cases (just above/below cutoff)

### `lib/email/dmarcCheck.ts`
- [ ] Domain with valid DMARC/SPF/DKIM → passes clean
- [ ] Domain missing DMARC record → flagged correctly
- [ ] Malformed/unreachable domain → handled gracefully, no crash

### `lib/email/scamHeuristics.ts`
- [ ] Known scam phrase pattern (payment redirection, urgent invoice language) → flagged
- [ ] Legitimate business email → not flagged
- [ ] Spoofed sender domain (near-match to a known supplier) → flagged

### `lib/llm/triageClassifier.ts`
- [ ] Mock a sample incident snapshot → verify the function correctly parses the LLM response into a severity/category structure
- [ ] Handle LLM API error/timeout gracefully with a fallback classification, not a crash

---

## 4. Component Test Targets (Adyan — UI layer)

### `components/dashboard/ScoreDisplay.tsx`
- [ ] Renders correct badge color/text for SAFE vs ACTION_REQUIRED
- [ ] Renders the numeric score passed in
- [ ] "View details" expands to show module breakdown when clicked

### `components/alerts/AlertCard.tsx`
- [ ] Renders severity-based border color correctly for all 4 severity levels
- [ ] Renders action button only when `actionLabel` is present
- [ ] Renders correctly with each module type's alert shape

### `components/dashboard/ModuleCard.tsx`
- [ ] Shows "Safe" state when no active alerts
- [ ] Shows correct alert count when alerts are present
- [ ] Links to the correct drill-down page per module

### `components/panic/PanicButton.tsx`
- [ ] Clicking triggers the snapshot flow (mock the API call in test)
- [ ] Shows loading/progress state during triage classification
- [ ] Displays escalation status after triage completes

---

## 5. Integration Test Targets (API routes)

- [ ] `GET /api/score` returns a valid `SecurityScore` shape matching `types/score.ts`
- [ ] `GET /api/identity`, `/api/email`, `/api/leaks`, `/api/deepfake` all return arrays matching `types/alert.ts`
- [ ] `POST /api/identity/scan` returns correctly matched/unmatched results for a known test domain list
- [ ] `POST /api/panic/snapshot` correctly aggregates data from all 4 module routes
- [ ] `POST /api/panic/triage` calls the LLM and returns a structured classification (can mock the Anthropic API call in CI to avoid real API costs on every test run)

---

## 6. End-to-End Test Scenarios (Playwright)

- [ ] **Dashboard load:** Visit the app, confirm score, status badge, and all 4 module cards render without errors
- [ ] **Alert drill-down:** Click into Identity Monitoring, confirm alert list renders, click "Start takedown," confirm status updates
- [ ] **Panic Button full flow:** Press Panic Button → snapshot → triage classification appears → incident report preview renders → escalation status shown
- [ ] **Empty state:** With no alerts across any module, confirm dashboard shows a calm "all safe" state, not a broken/empty screen

---

## 7. Coverage Targets

| Layer | Target |
|---|---|
| `lib/scoring/`, `lib/matching/`, `lib/email/` | 80%+ line coverage — this is the "real" logic |
| `lib/llm/` | Cover the parsing/error-handling logic; mock the actual API call |
| `components/alerts/`, `components/dashboard/` | Cover all states (empty, single alert, multiple, error) |
| E2E | Cover the 4 scenarios above at minimum — don't over-invest here given the timeline |

---

## 8. CI Pipeline (GitHub Actions)

On every PR into `main`:
1. Install dependencies
2. Run ESLint
3. Run unit + component tests (Vitest/Jest + RTL)
4. Run Playwright E2E suite against a local build
5. Block merge if any step fails

This is what actually enforces the Definition of Done in `audit.md` — a PR shouldn't merge into `main` if tests are red.
