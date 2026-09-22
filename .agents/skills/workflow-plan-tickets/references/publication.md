# Publish or recover a complete plan

Before the first remote mutation save plan.json with stable plan ID/revision, spec identity, approval evidence, all expected ticket keys/content/acceptance/original blockers and publication markers. Preserve that approved snapshot.

Ticket body sections: `## Parent` (exact parent and version identity), `## What to build` (bounded end-to-end outcome), `## Acceptance criteria`, `## Blocked by`. Include `<!-- workflow-ticket:<plan_id>:<key> -->`. Use domain vocabulary, avoid file-by-file instructions; keep a sourced prototype snippet only if it records an approved decision.

For each ticket in dependency order:

1. Reread an existing mapped Issue. If mapping is absent or a prior response uncertain, list/search all potentially matching Issues, including closed ones, and read exact publication markers. Verify target repo, parent and content. Use one matching object; multiple matches require resolution. A failed/incomplete lookup is not evidence of absence.
2. Create only a verified missing ticket. Persist its returned ID immediately. A lost response triggers step 1 before another create.
3. Establish native parent and blocking relationships using available gh/API capability; discover supported operations rather than inventing syntax. Resolve original key references to actual Issues, retaining the reviewed stable-key mapping. Native relationship unavailability is a capability blocker.
4. Ensure/apply ready-for-agent from the approved plan and remove conflicting state labels. Never apply Spec to implementation tickets. Preserve unrelated labels.
5. Read back full body, parent, blockers and labels, compare with the approved plan, record verified fields and outstanding failures. Resume by filling missing operations, not recreating successful tickets or overwriting unexpected human edits.

Finally enumerate the expected keys from the approved plan, not just the created Issues. Require nonzero count, unique key/Issue mapping and full coverage; read back the parent spec/approval again. Only then mark publication_status verified. Response loss, one successful Issue, or all labels present cannot alone finish publication. Do not edit or close the parent during normal planning. On an explicit requirement change after a stable baseline, use the common change route.
