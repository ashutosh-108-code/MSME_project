# Sentinel Shield — Audit & Reality Check

**Purpose:** This is the reality check against `prd.md` and `implementation_plan.md`. Run the relevant section whenever a phase, module, or the whole sprint claims to be "done." Since this is a greenfield project, Section 1 is your starting checklist — everything else gets checked off as it's actually built, not assumed.

---

## 1. Pre-Sprint Setup Checklist (Day 1, before writing feature code)

- [ ] GitHub repo created, both Adyan and Ashutosh have push access
- [ ] `create-next-app` scaffolded with TypeScript, Tailwind, App Router
- [ ] `types/alert.ts` and `types/score.ts` written and agreed on by both people
- [ ] `.env.example` created listing every required env var (no real values)
- [ ] Supabase project created, connection tested from a local script
- [ ] Google Cloud project created, Gmail API enabled (can be done ahead of Day 5)
- [ ] Anthropic API key obtained, tested with a single curl/fetch call
- [ ] Vercel project linked to GitHub repo, confirms auto-deploy on push to `main`
- [ ] Branch protection on `main` (no direct pushes) — optional but recommended

---

## 2. Per-Module Definition of Done

Run this checklist before marking any module "complete" in `task_today.md`.

### Security Health Score
- [ ] Score is computed from actual `ModuleScore[]` input, not hardcoded
- [ ] SAFE / ACTION REQUIRED threshold logic matches `prd.md` (< 80 or any open critical alert)
- [ ] Unit tests cover: no alerts, one critical alert, all resolved
- [ ] UI shows no sub-scores unless explicitly drilled into

### Identity Monitoring
- [ ] Fuzzy matching runs against a real test set of domain variants (not just one hardcoded example)
- [ ] Alert copy matches plain-language pattern from PRD
- [ ] Takedown button changes alert status and reflects in the score
- [ ] Empty state ("no threats found") is designed, not just a blank screen

### Business Email Protection
- [ ] Gmail OAuth flow completes end-to-end with a real test account
- [ ] Only headers/metadata are read — confirm request scope excludes body content
- [ ] DMARC/SPF/DKIM check returns a real result for at least one real domain
- [ ] Scam heuristic flags at least one deliberately crafted test email correctly

### Data Leak Watch (mocked)
- [ ] Mock data is realistic (real-sounding domains, GST format, dates) — not placeholder Lorem Ipsum
- [ ] UI quality matches the "real" modules — no visual tells that this one is fake
- [ ] API route shape matches `types/alert.ts` exactly, so a real data source could be swapped in without UI changes

### Deepfake & Reputation Watch (mocked)
- [ ] Same bar as Leak Watch — realistic mock data, matching UI quality, contract-compliant API shape

### Panic Button
- [ ] Snapshot pulls real current state from all 4 module APIs (even where underlying data is mocked)
- [ ] LLM triage call is real (not a canned response) and returns a severity classification
- [ ] Incident report is generated as a structured document, viewable/downloadable
- [ ] CERT-In section is clearly labeled "draft — requires your review" and does not auto-submit anywhere
- [ ] Escalation status change is visible to the user with a plain-language explanation

---

## 3. Code Quality Checklist

- [ ] No `any` types in TypeScript without a comment explaining why
- [ ] Every component in `components/alerts/` and `components/dashboard/` is reused across at least 2 modules (if not, investigate duplication)
- [ ] No console.log left in committed code (use proper logging or remove)
- [ ] ESLint passes with no warnings on `main`
- [ ] Every API route has basic error handling (try/catch, meaningful status codes)

---

## 4. Security & PII Checklist

- [ ] No real reference photos, audio samples, GST numbers, or director names committed to the repo, even as test fixtures
- [ ] `.env.local` confirmed in `.gitignore`, never appears in `git log`
- [ ] Gmail integration scope confirmed as metadata/headers only, not full inbox read
- [ ] Supabase row-level security enabled if storing any real user data beyond the demo account
- [ ] Anthropic API calls don't send raw PII (director names, GST numbers) unless necessary for triage — prefer hashed/summarized input where possible

---

## 5. Pre-Demo Audit (Day 13–14)

- [ ] Full click-through of the app by someone who hasn't been building it (fresh eyes catch confusing copy/UX)
- [ ] Every "real" feature claimed in the demo is actually real (cross-check against `prd.md` Section 6 status tags)
- [ ] Every "mocked" feature is described honestly if asked directly — have the answer ready, don't get caught off guard
- [ ] Deployed Vercel URL loads without errors on a clean browser session (no dev-only state assumptions)
- [ ] `bugs.md` has no open **Critical** or **High** severity items
