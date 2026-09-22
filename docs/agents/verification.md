# Verification contract

The starter's example is a counter: initial count 0, increment by one, reset to zero, reset disabled at zero, no persistence across reload. It exists to make the toolchain verifiable, not as a business requirement.

## Test surfaces

- Component: visible output and buttons in App.vue, using Vue Test Utils + Vitest.
- Browser: Chromium against a production build, using accessible roles/labels, keyboard input and reload.
- Workflow setup: file integrity, required dependencies, project paths and Git remote alignment, using Node's built-in test runner.

New business tests follow the configured TDD skill and the human-approved seams for that task.

## Commands

- `npm run check`: workflow integrity, TypeScript, ESLint, formatting, component tests, workflow setup tests and build.
- `npm run test:e2e`: production build and Chromium. Playwright starts its own preview server on port 4317 (overridable with `WORKFLOW_E2E_PORT`) and will fail rather than reuse another server.
- `npm run check:all`: standard gate plus E2E.
- `npx playwright install chromium`: one-time local browser installation; CI uses `--with-deps`.

For each serially integrated ticket, run the standard gate. This template uses a conservative full-file/full-unit scope; browser-visible changes also run E2E before the ticket is verified. All tickets completed: independent review, then the full gate on the same final commit. Failed or unrun checks are not passes.

CI mirrors these commands with `npm ci`; writing its YAML does not prove a remote CI run passed. API dependencies must use confirmed contracts and fixtures when the backend is unavailable. The starter has no backend or mock API contract to invent.
