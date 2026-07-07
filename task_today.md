# Sentinel Shield — Today's Tasks

**How to use this file:** At the start of each day, both people fill in their section from `implementation_plan.md`'s plan for that day. At the end of the day, check off what's done and carry over anything unfinished to tomorrow's section — don't silently drop it. If something's blocked, write down what's blocking it so the other person sees it at the morning sync.

---

## Day 1 — July 7, 2026

**Morning sync (5 min):** Confirm `types/alert.ts` and `types/score.ts` are agreed and committed before either of you branches off.

### Adyan (Frontend)
- [ ] Set up `styles/tokens.ts` — color palette (safe-green, warning-amber, action-red, neutral grays)
- [ ] Build `app/layout.tsx` and dashboard shell in `app/page.tsx`
- [ ] Build `components/dashboard/ScoreDisplay.tsx` (takes `SecurityScore`, shows number + SAFE/ACTION REQUIRED badge)
- [ ] Push branch, open PR into `main`

### Ashutosh (Backend)
- [ ] Write `types/alert.ts` and `types/score.ts`, share with Adyan before either of you proceeds
- [ ] Build `lib/scoring/engine.ts` — `calculateSecurityScore()` function
- [ ] Write unit tests: no alerts, one critical alert, all resolved scenarios
- [ ] Push branch, open PR into `main`

### Blockers
- None yet — first day.

### Carried over to Day 2
- (fill in at end of day if anything's incomplete)

---

## Template for Future Days

Copy this block, update the date and tasks by pulling from `implementation_plan.md`'s row for that day.

```markdown
## Day N — [Date]

**Morning sync (5 min):** [anything that needs a quick verbal check before starting — especially on Day 6 and Day 11 integration checkpoints]

### Adyan (Frontend)
- [ ] Task 1
- [ ] Task 2

### Ashutosh (Backend)
- [ ] Task 1
- [ ] Task 2

### Blockers
- [Anything stopping either person, and who/what it depends on]

### Carried over to Day N+1
- [Anything not finished today]
```

---

## Quick Reference — Full Sprint Task Source

Don't re-derive daily tasks from scratch — pull them directly from the table in `implementation_plan.md` Section 5, and cross-check completion against the Definition of Done in `audit.md` Section 2 before checking a module off as done here.
