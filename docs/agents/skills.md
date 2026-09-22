# Skills inventory and provenance

Matt source: https://github.com/mattpocock/skills/tree/c55ee46073ed923f86ce59a5eb3b6d895095d1b7

All skill directories under that revision's `skills/` are installed as ordinary project files, preserving each directory's name, SKILL.md, references, scripts and metadata. This includes `in-progress` and host-specific skills; their presence does not imply Codex compatibility or independent validation of every skill.

The three additional entrypoints are `workflow-clarify-spec`, `workflow-plan-tickets`, `workflow-implement-tickets`; `common` contains their shared contracts, not another skill. Their candidate baseline is v0.5 from the local workflow study. Its original derivation provenance is retained in `.workflow/owned-provenance.json`. It was evaluated with prior local dependency snapshots; installing the current complete Matt set is not a replay of all historical evaluations. Critical dependency changes are recorded in `.workflow/dependency-comparison.json`.

`.workflow/skills-lock.json` lists the exact source revision/path and every installed file's SHA-256. `npm run workflow:check` checks this inventory and runtime dependencies. Upstream template/helper scripts remain inert until their skill is actually invoked. The upstream license is preserved in `THIRD-PARTY-LICENSES/mattpocock-skills.LICENSE`.

Historical design and raw trials remain in the original workflow research archive. This project contains the runnable engineering base, project policies and skills; it does not import old Issue IDs, approvals or execution records as current project state.
