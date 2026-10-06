---
title: "Data security at Vero"
slug: data-security
summary: "How we protect your data across our infrastructure, application and team."
metaTitle: "Data Security at Vero | Vero"
metaDescription: "How Calon AI Solutions protects customer data in Vero: hosting, encryption, access control, backups, monitoring, AI processing and incident response."
lastReviewed: "2026-10-06"
---

# Data security at Vero

Vero holds your customer sites, access arrangements, engineer records and compliance paperwork. This policy explains how we protect it. It is part of the technical and organisational measures referred to in our [UK Data Protection Addendum](/legal/data-protection-addendum).

## Our people

- Everyone at Calon with access to customer data is bound by confidentiality terms.
- Our founder, Mahbubul Alom, is ISO certified in data processing.
- Access to production systems is limited to the people who need it for their role, and reviewed every quarter.
- When someone leaves or changes role, their access is removed on their last working day.
- Our team completes security and data protection training when they join and every year after.

## Infrastructure

- Vero runs on Amazon Web Services (AWS) in the UK (London) region. Your data is stored in the UK.
- The database is a managed PostgreSQL service on AWS, kept separate from the application services.
- All traffic to Vero passes through Cloudflare, which protects against denial of service attacks and filters malicious requests.
- Production, testing and development environments are kept separate. Customer data is not used in development or testing.

## Encryption

- All data travelling between your devices and Vero is encrypted using TLS.
- Data stored in our database and file storage is encrypted at rest using AWS managed encryption.

## Access to your account

- Every user has their own account. Shared logins are not supported.
- Access is role based. Office staff, managers and engineers see only what their role needs. Engineers see only the jobs assigned to them.
- Passwords are stored using a strong one way hash. We never store passwords in plain text.

## Keeping customers separate

Each customer's data is logically separated from every other customer's data. Every record is tied to a customer account, and every request is checked against that account.

## Backups and recovery

- The database is backed up daily and backups are kept for 30 days.
- We test restoring from backup every quarter.
- Our recovery targets are 24 hours to restore service and no more than 24 hours of data loss after a serious incident.

## Monitoring and logging

- We monitor Vero for errors, performance problems and unusual activity.
- Changes to jobs, certificates and user permissions are logged with who made them and when.
- Logs are kept for 12 months and protected from alteration.

## Keeping the software secure

- Code changes are reviewed before they are released.
- We keep the software libraries Vero depends on up to date and apply security fixes promptly.

## How we use AI with your data

Vero uses AI services to transcribe and structure engineer notes, read supplier price lists and draft quote wording from your approved clauses.

- AI structures what a person provided. It does not invent readings, results or findings.
- A person reviews and signs off every certificate and quote before it reaches a customer.
- Data sent to AI providers through their business APIs is not used to train their models, under those providers' terms.

The AI providers we use are listed on our [subprocessors page](/legal/subprocessors).

## If something goes wrong

We have a written incident response process. If a personal data breach affects your data, we will tell you without undue delay and within 48 hours of becoming aware of it, as set out in our Data Protection Addendum. We will keep you updated until it is resolved.

## Reporting a security concern

If you believe you have found a security problem in Vero, email [hello@sentinelvero.com](mailto:hello@sentinelvero.com). Please give us reasonable time to fix it before sharing it publicly. We will acknowledge your report within 8 hours and will not take legal action against anyone who reports a concern in good faith and does not access more data than needed to show the problem.
