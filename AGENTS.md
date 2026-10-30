# Mentory corp

Mentory corp brings mentors and mentees together, providing the tools they need to
handle mentoring sessions, track progress, and reach their goals.

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

## Business context: where the goals live

The authoritative goals are served by the **`business-context`** MCP server, backed by
markdown in `context/` at the repo root. Consult them through these tools rather than
relying on recollection, including this file:

| Tool | Document | Holds |
| --- | --- | --- |
| `get_company_context` | `context/company.md` | Mission, vision, core values, target audience |
| `get_okrs` | `context/okrs.md` | Objectives and key results, with targets |
| `get_quality_attributes` | `context/quality-attributes.md` | Quality attributes and the goals each supports |

`context/company.md` is the single source of truth for company identity. The summary below
is a convenience copy for human readers; if the two ever disagree, `context/company.md`
wins and this section should be corrected.

Never infer an objective, metric, or target that is not written in these documents. A
fabricated goal produces a confident judgement nobody can tell is groundless.

## Mission

Enable the mentees to find mentors to reach their goals.

## Vision

Become the leading platform for mentoring.

## Core Values

- **Security**: We take the security of our user's information very seriously.
- **Innovation**: We are constantly seeking new ways to improve our platform and services.
- **Usability**: We believe that our platform should be easy to use and understand.
- **Customer Service**: We are committed to providing excellent customer service to our users.

## Target Audience

1. Individual users (mentors & mentees)
2. Small & Medium Businesses (SMBs)
3. Enterprise clients
4. Institutional investors
