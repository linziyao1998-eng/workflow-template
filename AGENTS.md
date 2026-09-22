# Workflow Template

Vue 3 + TypeScript + Vite project using npm. Use `npm ci` with the committed lockfile. Read package.json for commands; `npm run check` is the standard gate and `npm run check:all` includes Chromium E2E. After user-visible changes run the full gate. Report exact failures; do not weaken rules or tests to claim completion.

## Project rules

Read [Definition of Ready](docs/agents/definition-of-ready.md), [labels](docs/agents/triage-labels.md), [tracker](docs/agents/issue-tracker.md), [domain rules](docs/agents/domain.md) and [verification rules](docs/agents/verification.md) when applicable.

Prefer Vue Composition API and typed `<script setup lang="ts">`. Keep state local unless sharing is necessary. Use semantic HTML, labelled controls and keyboard support. Verify observable behavior through component and browser interfaces. Preserve unrelated work; exclude generated artifacts and credentials from Git.

## Skills and invocation

All 38 Matt skills from the pinned upstream revision coexist with three owned `workflow-*` skills in `.agents/skills/`. Upstream files retain their original names and content; an installed skill does not authorize running its operations. Some upstream skills target other hosts or remain in progress; consult their own compatibility and invocation restrictions.

For this project's enhanced requirement-to-PR flow the human separately invokes:

1. `workflow-clarify-spec`: authoritative, versioned, approved Spec.
2. `workflow-plan-tickets`: approved complete ticket set (at least one).
3. `workflow-implement-tickets`: execution, independent review, gates and formal PR.

Selecting upstream `to-spec`, `to-tickets` or `implement-spec` does not select the enhanced flow. Do not substitute them for owned entrypoints. Project readiness and explicit approval rules remain applicable when using upstream methods. The three stages do not automatically authorize one another.

Read `.workflow/config.json` for repository identity, dependencies and real project checks. Resolve paths relative to this Git root. No fallback to another project's config or a personal global skill path. Runtime state lives in the main checkout's ignored `.workflow-local/`, outside disposable ticket worktrees; pass its resolved path to workers. Read `.agents/skills/common/` for exact version and recovery contracts.

Dependency snapshots are verified by `npm run workflow:check`. An intentional skill update must update the source/byte hashes in `.workflow/skills-lock.json` and undergo focused review. Formatting excludes those byte-preserved snapshots; integrity checks cover them instead. Never rewrite lock hashes merely to hide an accidental change.
