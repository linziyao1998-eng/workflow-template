# GitHub tracker

Issues, specifications, implementation tickets and PRs live in `linziyao1998-eng/workflow-template`. The canonical remote is `origin`, whose URL must match that repository. Use `gh` and explicitly set `--repo linziyao1998-eng/workflow-template` on applicable Issue, label and PR commands. For `gh api`, name the exact repository in the endpoint.

Before operations verify Git identity, `gh` authentication and permissions. Read all relevant Issue comments, including superseding or withdrawn approvals; a label alone proves no approval. Use `--body-file` for Markdown writes and read back the result.

Use native parent/sub-issue and blocking relationships required by the owned flow. Report missing capabilities or permissions; do not substitute a text link for a native relation. Uncertain creation results require reconciliation by stable identity before retrying. Preserve successful IDs and partial results.

PRs are not a triage request surface by default. The enhanced flow creates a formal PR only after independent review and full gates match final HEAD. Verify PR base/head and closure references for the parent and entire approved ticket set. Keep Issues open until human merge; do not automatically monitor CI or merge.

Creating the template and configuring this repository do not create Issues, labels or PRs, and do not grant blanket approval for future specs or implementations.
