# Local stage records

Persist under the resolved main-project state directory, never in a disposable ticket worktree. Schema version is 1. Preserve actual values, snapshots and evidence; an empty record is not approval.

## plan.json

- `schema_version`, `plan_id` (stable before any create), `revision`, `spec` (full version identity).
- `approval`: scope `full-plan`, real human source/time, exact approved content/version; retain the reviewed plan snapshot.
- `tickets`: nonempty array of `key`, `title`, `body`, `acceptance`, `blocked_by` (stable keys), `publication_marker`, `issue_number`, `verified`.
- `publication_status`: `approved`, `partial`, `verified`; `events` and readback evidence pointers.

Marker format: `<!-- workflow-ticket:<plan_id>:<key> -->`. The approved draft includes the marker and spec identity. Preserve approved substantive content. Resolving stable blocker keys to actual Issue numbers is a publication operation, not a scope change; retain both representations. Validate graph keys, absent/duplicate keys and cycles before publication or dispatch.

`verified` requires every expected issue, full approved content, parent/spec identity, native parent/blocking links and readiness labels to be read back. On a tracker without available native relationships, report the capability gap; do not quietly replace the agreed behavior with text-only links. Removing a satisfied execution blocker changes operational relationships, not the original dependency baseline. Compare ticket scope separately from these allowed changes.

## execution.json

- `schema_version`, `spec`, `plan_id`, `plan_revision`, exact implementation authorization source.
- `base_sha`, `delivery_branch`, `delivery_head`, resolved state directory, concurrency limit and active worker IDs.
- Per-ticket issue/key, original blockers, branch/worktree, base/commit SHAs, dirty files, state (`pending`, `running`, `saved`, `awaiting-merge`, `merged-unverified`, `verified`), evidence and unresolved blockers.
- Integration operation underway, completed validation and its SHA, independent reviews and their base/head, fixes, full gates and corresponding SHA, PR identity/head, global pause reason and resume point.

Only the coordinator marks verified after serial integration and checks. Worker completion or a removed blocking edge is insufficient. During recovery, inspect actual branches, worktrees, commits and tracker before selecting the next operation; code changes invalidate affected evidence. Preserve all unfinished work. Explicit human resume is required after global human-blocker wind-down.
