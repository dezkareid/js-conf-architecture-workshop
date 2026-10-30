# Mentory corp: Architecture Quality Attributes

These are the four attributes Mentory corp holds its systems to. Each states the business
goal it serves, the consequence of getting it wrong, and what good looks like in
observable terms.

The **Supports** line is load-bearing: it is what lets an audit trace a code change to a
business goal instead of merely asserting that the change is aligned.

## Security

**Supports:** Core value "Security" — *we take the security of our user's information very
seriously*. Also protects every key result under Objective 1: a breach costs registered
and active users directly, and enterprise and institutional audiences will not adopt a
platform they cannot trust.

**Why it matters:** Mentoring conversations carry career history, salary expectations,
performance struggles, and personal goals. This is some of the most sensitive material a
user can share about their working life, and they share it with a named individual on the
assumption it goes nowhere else. A breach is not merely a compliance event — it destroys
the confidence the mentoring relationship depends on, and that confidence is the product.

**What good looks like:**

- Every path that touches session data, notes, or profile information is authenticated and
  authorized; a mentor can reach only their own mentees' data, and a mentee only their own.
- Personal data is encrypted in transit and at rest.
- Session notes and personal data never appear in logs, error reports, or analytics events.
- Access follows least privilege, including for internal and support tooling.
- Secrets are never committed; credentials are injected at runtime.

## Usability

**Supports:** Core value "Usability" — *our platform should be easy to use and understand*.
Directly drives the "1,000 active users" and "10,000 mentorías" key results: registration
can be bought with marketing, but activity and completed sessions are earned by the product
being easy enough to come back to.

**Why it matters:** The mission is that mentees *find* mentors and reach their goals. Every
point of friction between arriving and holding a useful session is a place the mission
fails quietly — the user does not complain, they simply never book. Mentoring also happens
between busy people fitting it around other work, so the platform competes with the ease of
just sending a message elsewhere.

**What good looks like:**

- Finding and booking a suitable mentor is achievable in a single sitting, without
  instruction.
- Scheduling, progress tracking, and goal review are discoverable without documentation.
- The interface is usable by people with disabilities — keyboard navigable, screen-reader
  friendly, sufficient contrast, respecting WCAG 2.2 AA as the working standard.
- Error states explain what happened and what to do next, in the user's terms.
- Core flows stay responsive enough not to interrupt the user's train of thought.

## Maintainability

**Supports:** Core value "Innovation" — *constantly seeking new ways to improve our
platform and services*. Innovation is a rate, and the rate is set by how safely the system
can be changed. Also protects the Q1 2027 launch date: a codebase that resists change turns
schedule pressure into defects.

**Why it matters:** A platform that is expensive to change cannot be improved constantly,
however much the company wants to. The cost shows up as an inability to respond to what
mentors and mentees actually ask for, and as a growing gap between what the team intends
and what the system does.

**What good looks like:**

- A new engineer can locate the code behind a user-visible behaviour without a guided tour.
- Behaviour is covered by tests at a level that makes changing it safe, so a regression in
  booking or session tracking is caught before release rather than reported by a user.
- Clear, simple logic is preferred over clever or opaque solutions; boundaries between
  concerns are explicit.
- Dependencies are deliberate and kept current; upgrades are routine, not expeditions.
- Changes arrive small and reviewable rather than large and all-or-nothing.

## Availability

**Supports:** Core value "Customer Service" — *committed to providing excellent customer
service to our users*. Directly protects the "10,000 mentorías" key result, and is a
precondition for the enterprise and institutional audiences named in the company context.

**Why it matters:** Mentoring sessions are scheduled commitments between two people who
have set aside time. An outage during a booked session does not merely inconvenience a
user — it wastes a mentor's donated time and breaks a commitment the platform brokered.
That failure is far more costly than the same downtime on a browsing-oriented product,
because it cannot be retried later without re-coordinating two calendars.

**What good looks like:**

- Session-critical paths — booking, joining, and recording a session — stay available
  during their scheduled windows, and degrade partially rather than failing whole.
- Failures are contained: a problem in a peripheral feature such as reporting or
  notifications does not prevent a session from happening.
- The system recovers without manual intervention where it can, and surfaces clear status
  where it cannot.
- Data integrity is never traded for availability; a booking is never silently lost.
- Problems are detected by monitoring before users report them.

<!--
  TODO: once real traffic and launch scope exist, attach explicit targets to these
  attributes — an availability objective for session-critical paths, a performance budget
  for core flows, and a WCAG conformance level the team formally commits to. Targets are
  deliberately absent for now rather than invented.

  TODO: consider whether Scalability needs to be its own attribute. The current OKRs
  (10,000 registered / 1,000 active) are modest enough that Availability and
  Maintainability cover it; the enterprise and institutional segments would change that.
-->
