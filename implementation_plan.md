# Sentinel Shield — Implementation Plan

**Sprint:** July 7 – July 20, 2026 (14 days)
**Team:** Adyan (Frontend) · Ashutosh (Backend)

This is the blueprint. `task_today.md` pulls the day's tasks from here into a daily checklist; `audit.md` verifies each phase actually meets its Definition of Done before moving on.

---

## 1. Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database/Auth | Supabase |
| Backend | Next.js API routes (`app/api/`) |
| Email integration | Gmail API (OAuth2) |
| Domain fuzzy matching | `fuzzball` or `string-similarity` (npm) |
| Email auth checks | `mailauth` (DMARC/SPF/DKIM) |
| AI/LLM | Anthropic API (Claude) |
| Testing | Vitest/Jest + React Testing Library + Playwright |
| CI | GitHub Actions |
| Deployment | Vercel |
| Version control | GitHub |

## 2. Repo & File Structure

```
sentinel-shield/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (dashboard)/
│   │   ├── identity/page.tsx
│   │   ├── email/page.tsx
│   │   ├── leaks/page.tsx
│   │   ├── deepfake/page.tsx
│   │   └── panic/page.tsx
│   └── api/
│       ├── score/route.ts
│       ├── identity/{scan,route}.ts
│       ├── email/{auth,sync,dmarc,route}.ts
│       ├── leaks/route.ts
│       ├── deepfake/route.ts
│       └── panic/{snapshot,triage,route}.ts
├── components/
│   ├── ui/ (Button, Badge, Card)
│   ├── dashboard/ (ScoreDisplay, ModuleCard, ModuleGrid)
│   ├── alerts/ (AlertCard, AlertList, AlertEmptyState, TakedownButton)
│   └── panic/ (PanicButton, IncidentReportPreview, EscalationStatus)
├── lib/
│   ├── supabase/{client,server}.ts
│   ├── scoring/engine.ts
│   ├── matching/fuzzyDomain.ts
│   ├── email/{dmarcCheck,scamHeuristics}.ts
│   ├── llm/triageClassifier.ts
│   └── mock/{identityAlerts,emailAlerts,leakAlerts,deepfakeAlerts}.ts
├── types/{alert,score,incident}.ts
├── __tests__/ (mirrors lib/ and components/ structure)
├── e2e/ (Playwright specs)
└── .env.local (not committed)
```

**Ownership boundary:** Adyan owns `components/`. Ashutosh owns `lib/` and `app/api/`. `types/` is shared — changes here require a quick message to the other person before pushing.

## 3. Shared Contracts (agree before writing feature code)

`types/alert.ts` and `types/score.ts` define the shape every module, every mock file, and every component depends on. These must be committed to `main` on Day 1 before either person branches off into feature work.

## 4. Team Split — Working Model

- Branch per feature (`feature/identity-ui`, `feature/fuzzy-matching`), PR into `main`, no direct pushes to `main`.
- Daily: `git pull origin main` each morning before starting.
- Integration checkpoints on **Day 6** and **Day 11** — run the full app together locally, not just review code on GitHub.
- Secrets (`.env.local`) shared directly (Signal/WhatsApp/1Password), never committed or emailed.

## 5. Day-by-Day Plan

| Day | Date | Adyan (Frontend) | Ashutosh (Backend) |
|---|---|---|---|
| 1 | Jul 7 | Design tokens, dashboard shell layout, ScoreDisplay component | Score engine logic (`lib/scoring/engine.ts`) + unit tests |
| 2 | Jul 8 | AlertCard, ModuleCard components; wire mock data into shell | `/api/score` route; mock alert API routes for all 4 modules |
| 3 | Jul 9 | Identity Monitoring page UI, wired to mock API | Real fuzzy-matching logic (`lib/matching/fuzzyDomain.ts`) + tests |
| 4 | Jul 10 | Identity Monitoring: takedown flow, empty/error states | Fuzzy matching: integrate with `/api/identity/scan`, test against sample domain set |
| 5 | Jul 11 | Email Protection page UI, wired to mock API | Gmail OAuth setup (`/api/email/auth`) |
| 6 | Jul 12 | **Integration checkpoint** — run full app together, confirm contracts haven't drifted | **Integration checkpoint** |
| 7 | Jul 13 | Email Protection: alert states, plain-language DMARC copy | Gmail header sync (`/api/email/sync`) + DMARC/SPF/DKIM check (`mailauth`) |
| 8 | Jul 14 | Leak Watch UI — fully mocked, polished, realistic alert copy | Rules-based scam heuristic (`lib/email/scamHeuristics.ts`) |
| 9 | Jul 15 | Deepfake Watch UI — fully mocked, polished | Refine score engine with real signal inputs from Identity + Email |
| 10 | Jul 16 | Panic Button UI, incident report preview component | LLM triage classifier (`lib/llm/triageClassifier.ts`) via Anthropic API |
| 11 | Jul 17 | **Integration checkpoint** — wire Panic Button UI to real triage + snapshot | **Integration checkpoint** — snapshot logic across all modules |
| 12 | Jul 18 | Full app walkthrough; tone/copy consistency pass across all modules | Bug fixes on real integrations (Identity, Email, Panic triage) |
| 13 | Jul 19 | Demo polish, responsive check, seed realistic demo data | Bug fixes, run full test suite, fix failures |
| 14 | Jul 20 | Final rehearsal of demo flow, deploy to Vercel | Final rehearsal, deploy verification, buffer for last-minute fixes |

## 6. Environment & Secrets

Required accounts/keys before Day 5 (Gmail integration):
- Google Cloud Console project + OAuth consent screen + Gmail API enabled
- Supabase project (URL + anon key + service role key)
- Anthropic API key
- Vercel project linked to GitHub repo

All keys live in `.env.local` on each person's machine individually — never committed. `.env.example` (committed, no real values) should list every required variable name so onboarding a key doesn't require guessing.

## 7. Deployment

Vercel auto-deploys from `main` plus preview deployments per PR. Production env vars set directly in Vercel dashboard, mirrored from `.env.local`.
