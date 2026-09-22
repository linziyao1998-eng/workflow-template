# Workflow labels

The colors below are template defaults for creating missing GitHub definitions. Review them with the target project's existing label scheme before use; existing same-name definitions are reused without recoloring.

| Label               | Color    | Definition / role                                                                      |
| ------------------- | -------- | -------------------------------------------------------------------------------------- |
| `needs-triage`      | `FBCA04` | Evaluation or complete-spec approval is pending.                                       |
| `needs-info`        | `D93F0B` | Specific material requirement gaps remain.                                             |
| `ready-for-agent`   | `0E8A16` | Complete, current, approved work is ready for an agent.                                |
| `ready-for-human`   | `5319E7` | Complete work requires human implementation or judgment.                               |
| `wontfix`           | `FFFFFF` | Evaluated work will not be actioned.                                                   |
| `Spec`              | `1D76DB` | Type label for the complete, current, human-approved authoritative specification only. |
| `waiting-for-human` | `B60205` | Auxiliary execution-blocker label; it does not replace the primary triage state.       |

Use at most one of the five primary triage labels. Preserve unrelated labels and category labels. Apply `Spec` only after the authoritative carrier passes `docs/agents/definition-of-ready.md`, its exact content identity has valid full human approval, and the final readback confirms that identity. Implementation tickets do not receive `Spec`.

When new information fills a recorded gap, move the Issue to `needs-triage` and reassess all applicable readiness items in that same invocation. Remaining material gaps return it to `needs-info`; an incomplete evaluation or missing full approval leaves it at `needs-triage`; fully approved agent-suitable work may receive `ready-for-agent`. Do not infer approval from a label, silence or an agent's confidence.

Before applying a label, check its GitHub definition and create only a missing definition using the project's approved color and description. Creating a definition does not authorize applying it. Read back the final Issue labels and report any partial failure.
