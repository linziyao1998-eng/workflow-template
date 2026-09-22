# Wind-down and recovery

Any ticket requiring human action pauses the whole coordinator: no new worker dispatch or subsequent merge. Notify other running workers to save and validate their current work, then pause. Record an integration/check already in flight at its actual completion or interruption point; never mark an uncompleted check successful. Preserve each worktree/branch, commits and dirty files, command evidence, original blockers and next operation in execution.json. Keep primary state and add waiting-for-human only for the relevant execution blocker. An explicit user pause records location/reason without changing labels.

This implementation-stage boundary also applies when the entry gate detects changed spec/ticket scope or invalid approval: preserve the existing primary triage state and add waiting-for-human to the affected issue. Report the discrepancy for a separately invoked clarification/approval flow; a wind-down does not itself re-triage the issue.

Return the blocking fact, human action needed, successful/partial operations and recovery entrypoint. Finishing the current invocation does not discard in-flight work.

After explicit human resume:

1. Reread spec, full approval, plan and current ticket scope; compare exact baseline and inspect withdrawals/supersession.
2. Inspect actual worktrees, branches, commits and dirty changes; compare to records. Never treat a missing local file or stale worker report as successful integration.
3. Validate evidence against actual code SHA and command scope. Pending integration is merged then validated; merged-unverified code is checked before dependency release. Changed code invalidates affected review/gate evidence.
4. Confirm blocker resolution, then remove waiting-for-human, preserving primary state. Resume the first incomplete necessary operation: work, integration, independent review, full gate or PR-only retry. A PR-only retry reuses still-valid final-code evidence.

Missing records require recovering/rebuilding a verifiable baseline and any necessary human confirmation. Keep old branches and partial remote results. An environment failure can be retried after environment repair; it is never equivalent to a passed test.
