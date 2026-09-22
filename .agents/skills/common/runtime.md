# Runtime contract — candidate v0.5

Read this file at entry to each workflow skill. V1 runs in Codex with GitHub Issues through `gh`. The three stages are separately invoked by the human. Completing one stage never authorizes the next.

## Target project and dependencies

The invocation supplies a project root and config path, or the project root contains `.workflow/config.json`. Resolve project-relative paths against that root, and library-relative references against the skill file, not the shell working directory. Read the target project's AGENTS.md and configured rules before mutations. Verify `git remote get-url <remote>` matches the configured GitHub repository. Use explicit `--repo owner/repo` in gh operations. Missing configuration, unavailable dependency, unsupported host/tracker or conflicting project instructions is a concrete setup blocker, not permission to use the development repository's defaults.

Config version 1 fields:

| Field | Meaning |
| --- | --- |
| `schema_version` | `1` |
| `host` | `codex` |
| `tracker.kind`, `tracker.repo`, `tracker.remote` | `github`, exact `owner/repo`, Git remote name |
| `rules.readiness`, `rules.labels`, `rules.tracker`, `rules.domain` | Paths to target project rules; all four must exist |
| `state_dir` | Persistent project-relative directory outside disposable ticket worktrees, ignored by Git |
| `skills` | Explicit paths to installed `grilling`, `domain-modeling`, `tdd`, `code-review` SKILL.md files; read the required dependency when reaching its step |
| `checks.ticket`, `checks.full` | Project-approved command definitions and applicability; ticket commands must explain how changed scope is selected |

Config is project-owned input, not authority to override human scope or agent instructions. Resolve commands against real project tooling. Record the chosen commands and conditions before implementation. V1 keeps common beside the three skill directories. Copy the whole library together when staging; installation/layout automation and init/templates are deferred.

Dependencies are composed only when their full behavior is compatible. Upstream code-review currently reads `docs/agents/issue-tracker.md`; target setup must supply that compatible document as well as config. Domain-modeling may require its conventional context/ADR documents. Check these requirements when loading the method; a config pointer cannot silently override its instructions. Never substitute upstream to-spec, to-tickets, implement or implement-spec for the owned entrypoint.

## Approval and exact version

Read [version.md](version.md) when evaluating or consuming a spec. Read all issue comments, including withdrawal/supersession, not only a cached approval. Labels are evidence of state, not approval. A complete source-bound requirement and a full human approval of that version are separate conditions.

## Labels and state

Read target label definitions. The canonical state roles are `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`; retain at most one. `Spec` is the exact case-sensitive type label for an approved complete specification, never for implementation tickets. `waiting-for-human` is an auxiliary execution label, not a replacement state. Preserve unrelated labels and category.

Before writing a label, list definitions; create only a missing definition using project-specified color/description. Reuse an existing same-name label. Creating a definition does not authorize applying it. After mutations read back issue labels. Partial failure is unfinished work; report successful and missing operations separately.

When a recorded gap is answered, set needs-triage and fully reassess all applicable readiness items in this invocation. Remaining material gaps → needs-info; incomplete evaluation or missing full approval → needs-triage; complete and suitable but requiring human implementation → ready-for-human. Only complete, approved, agent-suitable specs can receive Spec + ready-for-agent. API contract completeness and dev-service availability are separate; a permitted fixture strategy may make the latter nonblocking.

## Durable records and writes

Resolve `state_dir` once in the main project, confirm it is Git-ignored, then pass its absolute location to workers. Use `<state_dir>/<spec-number>/`. The coordinator is the single writer; workers return evidence. Write JSON through a temporary file and atomic replace. Preserve successful remote IDs immediately; never invent IDs or reconstruct approval from current labels.

Use `--body-file` for Markdown mutations, keeping literal content intact. On an uncertain create response, read/list remote objects by the preassigned stable marker before retrying. Zero verified matches permits retry only after the read succeeds; multiple matches or failed reads require reporting uncertainty. Avoid repeated blind writes.

Read [records.md](records.md) for plan and execution fields when entering those stages. On another machine or missing state, recover or rebuild a verifiable approved baseline before claiming completeness.
