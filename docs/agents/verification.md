# Verification contract

The starter's example is a counter: initial count 0, increment up to 10, decrement down to 0, reset to zero, and one-step undo; decrement/reset are disabled at zero and undo is disabled without a prior effective change; no persistence across reload. It exists to make the toolchain verifiable, not as a business requirement.

## Test surfaces

- Component: visible output and buttons in App.vue, using Vue Test Utils + Vitest.
- Browser: Chromium against a production build, using accessible roles/labels, keyboard input and reload.
- Workflow setup: complete file-lock inventory, file integrity, owned skill/common relative Markdown links, required dependencies, project paths, relocated Git identity and exact content hashes, using Node's built-in test runner and Python 3.

New business tests follow the configured TDD skill and the human-approved seams for that task.

## Commands

- `npm run check`: workflow integrity, TypeScript, ESLint, formatting, component tests, workflow setup tests and build.
- `npm run test:e2e`: production build and Chromium. Playwright starts its own preview server on port 4317 (overridable with `WORKFLOW_E2E_PORT`) and will fail rather than reuse another server.
- `npm run check:all`: standard gate plus E2E.
- `npx playwright install chromium`: one-time local browser installation; CI uses `--with-deps`.

For each serially integrated ticket, run the standard gate. This template uses a conservative full-file/full-unit scope; browser-visible changes also run E2E before the ticket is verified. All tickets completed: independent review, then the full gate on the same final commit. Failed or unrun checks are not passes.

CI mirrors these commands with `npm ci`; writing its YAML does not prove a remote CI run passed. API dependencies must use confirmed contracts and fixtures when the backend is unavailable. The starter has no backend or mock API contract to invent.

## Target-project workflow acceptance

Offline checks validate infrastructure, not whether an agent follows every natural-language protocol or has working GitHub permissions. On first adoption, verify the following scenarios in the authorized target repository and record the actual objects, approved versions and results:

1. Complete requirements, missing API contracts, input below the minimum intake gate, and existing external Issues follow their respective clarification and carrier routes.
2. After full-spec approval, human-invoked planning publishes at least one ticket with full-plan approval and verified native parent/blocking relationships. Planning approval must not trigger implementation.
3. An authorized complete ticket graph with independent and dependent tickets uses isolated workers and serial integration. Failed validation must not release dependencies.
4. Human blockers, uncertain remote writes, specification corrections, new or changed requirements, and interrupted execution preserve approval identities and recovery evidence. Verify explicit resume authorization, readback and resumption at the first unfinished operation.
5. Independent Standards and Spec reviews, fix reviews, gates on the final HEAD, formal PR closure references, and post-PR cleanup satisfy the ownership, integration and clean-worktree requirements.

Record passes, failures, blockers and unrun scenarios separately. Successful local checks do not establish remote workflow or CI acceptance.
