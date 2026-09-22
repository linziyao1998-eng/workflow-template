---
name: workflow-plan-tickets
description: Turn a currently approved specification into an approved, fully published GitHub ticket set, or recover partial publication without duplicates.
---

# Plan and publish tickets

Independent human-invoked stage, adapted from Matt to-tickets. Read [runtime](../common/runtime.md), [version](../common/version.md) and [records](../common/records.md). Resolve configuration and read target rules. Planning approval authorizes publishing that plan, not implementation.

1. **Gate the parent.** Fetch the full Issue, all comments and authoritative carrier. Require Spec + ready-for-agent, current full-spec approval, exact version match and target readiness. Labels alone are insufficient. Stop on stale/revoked approval or a baseline change, identifying the stage to revisit.
2. **Identify prior publication.** Read plan.json and reconcile with GitHub. A fully verified approved set is returned directly; replan only on an explicit request. Partial approved publication goes to [publication recovery](references/publication.md). Missing local baseline is not proof that present tickets are complete: recover/rebuild it with appropriate human confirmation.
3. **Explore and draft.** Read the existing code, domain glossary, relevant ADRs, approved API/background and test decisions. Find useful prefactoring. Draft at least one bounded, independently verifiable vertical slice; even a one-ticket plan must express its implementation boundary. Each slice crosses the layers needed for a narrow outcome and fits a fresh context. Give stable keys and genuine blocking edges; reject cycles/missing keys.
4. **Handle wide changes.** Prefer expand–migrate–contract where each integrated ticket remains verifiable. A proposed scheme promising green only at the very end conflicts with this workflow's per-ticket integration gate: report that constraint instead of silently adopting the upstream exception.
5. **Review the whole plan.** Show titles, outcomes, acceptance, original dependencies and coverage of the entire spec. Ask about granularity, blocking edges and merge/split choices, and obtain full approval of this exact plan. Preserve the spec baseline; splitting does not authorize changing requirements.
6. **Persist, publish and verify.** Follow [publication.md](references/publication.md). Complete only after every expected ticket, parent/version link, blocking relationship, approved content and label has been read back. Return the complete set, baseline and any partial errors for human review. Keep parent and tickets open; do not start implementation.
