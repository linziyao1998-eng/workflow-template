---
name: workflow-clarify-spec
description: Clarify source requirements or a GitHub Issue into a complete, human-approved versioned specification, and resume incomplete clarification.
---

# Clarify a specification

This is an independent human-invoked stage. Read [common runtime](../common/runtime.md) and [version rules](../common/version.md) before acting. Resolve target configuration, then read its readiness, label, tracker and domain rules. The output is an approved authoritative specification or a precise, recoverable gap report. Stop at that handoff; planning and implementation require separate human invocations.

## Read and route

Read full input materials, Issue body/comments/labels and existing local plan records. Preserve source links, revisions/timestamps and inaccessible sources. Confirm whether tickets already establish a stable baseline before changing requirements.

- **Existing external Issue in the target repo:** preserve its original body. Read [carriers.md](references/carriers.md), investigate the reported behavior and search the codebase by domain concept for existing implementation and prior rejected requests. For bugs reproduce the claim when possible. Present category/outcome recommendation and evidence; obtain human direction for rejection/closure. Already implemented means cite the code, not add a rejection knowledge-base entry. A rejected enhancement may update the configured rejection notes. Otherwise continue clarification; the final Agent Brief comment is the authority.
- **Conversation, materials or another repo's Issue:** treat these as sources for a workflow-created target Issue. Clarify until the problem/title are stable, sources and known/unknown facts can be recorded, and outstanding questions are specific. Then create or resume the Issue using the seven-section body in [carriers.md](references/carriers.md). An incomplete record is allowed; unknowns remain explicit. A stable creation marker and local source record precede creation, so an uncertain response is recovered rather than duplicated.
- **Existing workflow-created Issue:** recover its creation record and authoritative body, then incorporate the supplied information. If source provenance is missing, ask to resolve it instead of guessing from headings.

## Clarify and evaluate

Use the configured `grilling` skill for unresolved requirements; read and follow it. Use `domain-modeling` as domain terms or consequential decisions emerge, preserving prior decisions and creating ADRs only when warranted. Reuse answered questions and approved test seams. Source gaps cannot be filled with invented behavior, interfaces or design choices.

After creating/updating a carrier or receiving answers, reassess all applicable readiness items in this invocation, not only the last gap. Record the outcome and precise missing information. `needs-info` means real unresolved requirements; `needs-triage` means evaluation or full approval is pending. For external Issues keep working notes in Triage Notes; do not publish an incomplete draft as the final approved Agent Brief.

When a body no longer matches its approved hash, assess the changed content as well as approval validity. Compare added requirements against existing behavior, exclusions and acceptance for contradictions. An unresolved contradiction is a needs-info outcome: ask which behavior is intended, then form a coherent exact draft. Full-spec approval belongs to the subsequent step, once those choices are settled; do not combine a still-open requirement choice with approval of the contradictory current body.

## Approve and publish

When the complete draft passes readiness apart from final approval, show its entire exact publishable content and identity/hash, and request full-spec approval. Test-seam approval alone cannot satisfy this. Reuse an existing valid full approval; no duplicate confirmation. Any final prefixes/markers belong to the displayed content before hashing.

After full approval, follow common version rules in this invocation: publish/bind the exact carrier, read it back, record approval separately, ensure missing label definitions, apply Spec + ready-for-agent while removing conflicting triage state, then verify content and labels. Preserve category and unrelated labels. Partial failure remains recoverable work. Never apply readiness on a shortcut request without the same completeness/version/approval checks.

Return authoritative identity, approval and publication/label evidence, or remaining gaps/partial results. The human may then review and separately invoke planning.
