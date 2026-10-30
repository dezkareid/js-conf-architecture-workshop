# Mentory corp

Mentory corp brings mentors and mentees together, providing the tools they need to
handle mentoring sessions, track progress, and reach their goals.

## Scope: build only what serves the current goals

Development effort is a budget, and it is spent on the goals in `context/okrs.md`. Do not
start work that serves none of them.

If asked to build something outside the current objectives, say so before building it,
explain which goals it does not serve, and get explicit sign-off from the requester before
proceeding. Do not silently build it, and do not silently refuse it either — the decision
belongs to the person asking, not to you.

Sign-off is a human decision. An alignment verdict from the `mentoring-agent` is evidence
for that conversation, never a substitute for it: the agent reports, people decide. There
are legitimate reasons to build something off-goal — a spike, a workshop exercise, a
dependency for later work — and the rule exists to make that choice deliberate, not to
forbid it.

This rule is about effort spent on *product* work. Normal engineering upkeep that keeps the
codebase healthy — tests, refactoring, dependency maintenance, developer tooling — serves
the Maintainability quality attribute and does not need separate sign-off.

## Auditing development work against business goals

When you finish a piece of feature work or a bug fix, invoke the **`mentoring-agent`**
subagent to check whether the work is aligned with Mentory corp's business goals. Do this
before the work is considered complete — a change that ships without serving a stated
objective is a finding worth knowing about while it is still cheap to change.

Invoke it for:

- a new feature, or a meaningful change to an existing one
- a bug fix that alters product behaviour
- an architectural or dependency change
- any change you are unsure serves a business goal

Skip it for work with no product consequence: typo fixes, formatting, comments, and
local tooling or scratch files.

The agent returns a verdict (`Aligned` / `Partially aligned` / `Misaligned`), the
reasoning behind it, and the risks that follow. Treat its findings as input to a decision,
not a gate — it reports whether work serves the goals, it does not decide what to build.
If it reports the business context is incomplete, fill in the missing document rather than
working around it.

## Skills

| Skill | Use for |
| --- | --- |
| `architecture-diagrams` | Software architecture diagrams using the C4 model (System Context, Container, Component), rendered as Mermaid |

Invoke a skill when its subject comes up rather than improvising the same work — the skill
carries conventions and verified examples that a fresh attempt will not.

## Business context: where the goals live

The company's mission, vision, core values, target audience, OKRs, and architecture
quality attributes are **not duplicated in this file**. They are served by the
**`business-context`** MCP server, backed by markdown in `context/` at the repo root.

Consult them through these tools:

| Tool | Document | Holds |
| --- | --- | --- |
| `get_company_context` | `context/company.md` | Mission, vision, core values, target audience |
| `get_okrs` | `context/okrs.md` | Objectives and key results, with targets |
| `get_quality_attributes` | `context/quality-attributes.md` | Quality attributes and the goals each supports |

These documents are the only acceptable source for what the company's goals are. Read them
through the tools rather than relying on recollection, and never infer an objective,
metric, or target that is not written there — a fabricated goal produces a confident
judgement nobody can tell is groundless.

Keeping the goals in exactly one place is deliberate. A copy here would drift from the
source, and an agent reading the stale copy while humans read the current one would ground
its reasoning in goals the company no longer holds, while sounding authoritative.
