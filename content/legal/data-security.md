---
title: "Data security at Vero"
slug: data-security
summary: "How we protect your data across our infrastructure, application and team."
metaTitle: "Data Security at Vero | Vero"
metaDescription: "How Calon AI Solutions protects customer data in Vero: hosting, encryption, access control, backups, monitoring, AI processing and incident response."
lastReviewed: "[[REVIEW DATE]]"
---

# Data security at Vero

Vero holds your customer sites, access arrangements, engineer records and compliance paperwork. This policy explains how we protect it. It is part of the technical and organisational measures referred to in our [UK Data Protection Addendum](/legal/data-protection-addendum).

[[CONFIRM EVERY STATEMENT ON THIS PAGE IS TRUE TODAY. DELETE ANYTHING THAT IS PLANNED BUT NOT YET IN PLACE. A SHORTER TRUE POLICY IS BETTER THAN A LONGER ONE YOU CANNOT EVIDENCE.]]

## Our people

- Everyone at Calon with access to customer data is bound by confidentiality terms.
- Access to production systems is limited to the people who need it for their role, and reviewed [[every quarter]].
- When someone leaves or changes role, their access is removed [[on their last working day]].
- Our team completes security and data protection training [[when they join and every year after]].

## Infrastructure

- Vero runs on Railway in the [[REGION]] region. Database and application services are separated from each other.
- All traffic to Vero passes through Cloudflare, which protects against denial of service attacks and filters malicious requests.
- Production, testing and development environments are kept separate. Customer data is not used in development or testing [[CONFIRM]].

## Encryption

- All data travelling between your devices and Vero is encrypted using TLS.
- Data stored in our database and file storage is encrypted at rest [[CONFIRM AND STATE HOW]].
- Site access codes and alarm codes are [[stored with additional field level encryption / CONFIRM HOW THEY ARE PROTECTED]].

## Access to your account

- Every user has their own account. Shared logins are not supported.
- Access is role based. Office staff, managers and engineers see only what their role needs. [[CONFIRM: engineers can only see their own jobs.]]
- [[CONFIRM: multi factor authentication is available and how it is enforced.]]
- Sessions end automatically after [[PERIOD]] of inactivity.
- Passwords are stored using [[HASHING METHOD, for example bcrypt or Argon2]]. We never store passwords in plain text.

## Keeping customers separate

Each customer's data is logically separated from every other customer's data. [[CONFIRM HOW, for example "every record is tied to a customer account and every request is checked against it".]]

## Backups and recovery

- The database is backed up [[FREQUENCY]] and backups are kept for [[PERIOD]].
- We test restoring from backup [[FREQUENCY]].
- Our recovery targets are [[RECOVERY TIME]] to restore service and no more than [[RECOVERY POINT]] of data loss after a serious incident.

## Monitoring and logging

- We monitor Vero for errors, performance problems and unusual activity.
- [[CONFIRM: changes to jobs, certificates and user permissions are logged with who made them and when.]]
- Logs are kept for [[PERIOD]] and protected from alteration.

## Keeping the software secure

- Code changes are reviewed before they are released.
- We keep the software libraries Vero depends on up to date and apply security fixes promptly.
- [[CONFIRM: independent penetration testing, how often, and when the last one took place. Delete this line if none has been done.]]

## How we use AI with your data

Vero uses AI services to transcribe and structure engineer notes, read supplier price lists and draft quote wording from your approved clauses.

- AI structures what a person provided. It does not invent readings, results or findings.
- A person reviews and signs off every certificate and quote before it reaches a customer.
- [[CONFIRM: data sent to AI providers is not used to train their models, under the providers' API terms.]]
- [[CONFIRM: site access codes and alarm codes are never sent to AI providers.]]

The AI providers we use are listed on our [subprocessors page](/legal/subprocessors).

## If something goes wrong

We have a written incident response process. If a personal data breach affects your data, we will tell you without undue delay and within [[48]] hours of becoming aware of it, as set out in our Data Protection Addendum. We will keep you updated until it is resolved.

## Reporting a security concern

If you believe you have found a security problem in Vero, email [[SECURITY EMAIL]]. Please give us reasonable time to fix it before sharing it publicly. We will acknowledge your report within [[NUMBER]] working days and will not take legal action against anyone who reports a concern in good faith and does not access more data than needed to show the problem.
