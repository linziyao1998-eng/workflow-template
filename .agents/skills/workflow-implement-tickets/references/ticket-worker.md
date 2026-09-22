# Ticket worker contract

The coordinator supplies project root/worktree, parent spec identity and carrier, full plan reference, assigned ticket, completed predecessor evidence, approved testing seams, project rules/checks, installed tdd path and an evidence directory. Read them before coding. Report a missing prerequisite instead of inferring approval.

Work only in the assigned worktree. Read and use the configured tdd skill: prefer existing approved high seams, one observable failing test then the minimal passing implementation. Existing explicit seam approval is supplied evidence, not a reason to ask again. New/changed seams require approval before dependent work. Use the target project's package manager and commands, never the library developer's stack.

Keep changes scoped to this ticket. Run corresponding checks, commit intended code and return branch/worktree, base/head SHAs, changed scope, exact commands/results and evidence, dirty/unsaved work and unresolved issues. Worker completion is a stage result; the coordinator still owns postmerge validation, full review/gates and PR. If project instructions demand additional checks, satisfy them or report the conflict; this contract does not override AGENTS.md.

Do not update shared plan/execution records, remote labels, blocking edges or PRs. On global wind-down, stop expanding the task, preserve current changes (including uncommitted work), run feasible checks on current work and return its exact saved state. Never erase unfinished work to make a clean report.
