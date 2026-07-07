# Sentinel Shield — Bug & Error Log

**How to use this log:** Whenever either of you finds a bug — while building, testing, or during a demo rehearsal — add a row here before fixing it, even if the fix is 30 seconds. This keeps a record of what broke and why, which matters most right before the Day 13–14 demo when you need to know nothing critical is still open (see `audit.md` Section 5).

Assign the next sequential ID. Never delete a row — mark it Resolved and keep it for the record.

---

## Severity Definitions

| Severity | Meaning |
|---|---|
| **Critical** | Breaks the demo or a core flow entirely (score doesn't load, Panic Button crashes, app won't deploy) |
| **High** | A module is visibly broken or shows wrong data, but the rest of the app works |
| **Medium** | Cosmetic/UX issue, wrong copy, minor state bug — noticeable but not demo-breaking |
| **Low** | Nitpick, polish item, "would be nice to fix" |

---

## Bug Table

| ID | Date | Reported By | Module | Severity | Description | Steps to Reproduce | Status | Fixed By | Fix Notes |
|---|---|---|---|---|---|---|---|---|---|
| BUG-001 | Jul 7 | (example) | Score Engine | Medium | Score doesn't recalculate when an alert is resolved without a page refresh | Resolve an alert → observe score badge stays stale | Open | — | Likely missing state invalidation after resolve action |

---

## Status Definitions

- **Open** — logged, not yet started
- **In Progress** — someone's actively fixing it
- **Fixed — Needs Verification** — code changed, needs the other person (or a test) to confirm
- **Resolved** — verified fixed, closed

---

## Pre-Demo Rule (Day 13–14)

Before the final demo rehearsal, sort this table by Severity. Zero **Critical** or **High** severity bugs should remain **Open** or **In Progress** — this is a hard gate per `audit.md` Section 5. If one exists, that's the priority over any polish work.
