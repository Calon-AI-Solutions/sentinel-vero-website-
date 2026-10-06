---
title: "Security and compliance"
slug: security
description: "How Vero protects your data and helps you keep the records BAFE, NSI and SSAIB audits ask for."
metaTitle: "Security and Compliance: BAFE, NSI, SSAIB and GDPR | Vero"
metaDescription: "How Vero protects customer and engineer data under UK GDPR, and how it helps fire and security contractors keep audit-ready records for BAFE SP203-1, NSI and SSAIB."
published: 2026-10-05
updated: 2026-10-05
author: "Calon AI Solutions"
---

# Security and compliance

Vero holds your customer sites, engineer records and compliance paperwork. This page explains how that data is protected, and how Vero helps you meet the schemes you are audited against.

## What Vero is, and what it is not

Vero is software. BAFE, NSI and SSAIB certify the companies that design, install and maintain fire and security systems. They do not certify the tools those companies use.

Vero does not hold, and cannot give you, any of those certifications. What it does is produce and keep the records your certification body asks to see, so preparing for an audit becomes a check rather than a project.

## BAFE SP203-1 and BS 5839-1:2025

BAFE SP203-1 is the third-party certification scheme for companies that design, install, commission, hand over and maintain fire detection and alarm systems. Your certification body samples your jobs and expects complete records for each one.

| What your auditor looks for | How Vero keeps it |
|---|---|
| Design, installation, commissioning and acceptance certificates | Generated from the job record at each stage, in BS 5839-1:2025 format |
| Maintenance certificates for every service visit | Created at sign-off from the engineer's visit record |
| Modification certificates and recorded variations | Logged against the system whenever a change or variation is recorded |
| Evidence that services happen on time | Service window tracked per system, with alerts before the seven month limit |
| Panel clock checked and zone chart verified at each service | Required checklist items on every service visit |
| Engineer competence and training records | Qualification register per engineer, with expiry alerts |
| A sample of complete job files | Export of any job's full record on demand |

## NSI and SSAIB

NSI and SSAIB certify security and fire companies against the relevant British and European standards, including BS EN 50131 and PD 6662 for intruder alarms, and BS EN 62676 and BS 8418 for CCTV and remotely monitored systems. NSI Gold also requires an ISO 9001 quality management system.

Vero's compliance records were first built with a contractor following an SSAIB audit visit. For security work, Vero keeps:

- A record per system of every installation, service and fault visit
- Engineer qualifications, with alerts before they expire
- Customer handover documents and signed acceptance
- A timeline per site that an auditor can follow from enquiry to latest service

## Your data under UK GDPR

**Who is responsible for what.** You are the data controller for your customer and employee data. Calon AI Solutions Ltd, which builds Vero, acts as your data processor. Our data processing agreement is available at [UK Data Protection Addendum](/legal/data-protection-addendum).

**Where data is stored.** In the UK. Vero runs on Amazon Web Services (AWS) in the London region, with a managed PostgreSQL database in the same region.

**Encryption.** Data is encrypted in transit using TLS. The database and file storage are encrypted at rest using AWS managed encryption.

**Access control.** Access is role based. Office staff, managers and engineers see only what their role needs. Engineers see only the jobs assigned to them.

**Audit trail.** Changes to jobs, certificates and user permissions are logged with who made them and when.

**Backups.** The database is backed up daily and backups are kept for 30 days.

**Leaving Vero.** You can export your data at any time in CSV, with certificates and reports as PDF. When you leave, we delete your data within 90 days unless the law requires us to keep it.

### [Subprocessors](/legal/subprocessors)

| Provider | What they do | Location |
|---|---|---|
| Amazon Web Services (AWS) | Application hosting and PostgreSQL database | UK (London) |
| Cloudflare | Network security and traffic routing | Global |
| OpenAI | Transcribing and structuring engineer notes and documents | United States |
| Anthropic | Reading images and documents, such as supplier price lists | United States |
| Google | AI processing of mixed media as a fallback service | United States |

The full detail is in our [Data security policy](/legal/data-security).

## How Vero uses AI with your data

AI in Vero does three jobs: turning engineer voice notes into structured reports, reading supplier price lists, and drafting quote wording from your approved clause library.

The rules it works to:

- It structures what the engineer said. It does not invent readings, results or findings.
- A person reviews and signs off every certificate and every quote before it goes to a customer.
- Data sent to AI providers through their business APIs is not used to train their models, under those providers' terms.

## Tracking engineers lawfully

Vehicle and location data about your engineers is personal data. The Information Commissioner's Office has published guidance on monitoring workers, and it expects employers to be open about tracking, to have a clear reason for it, and to assess the risks before they start.

Your responsibility as the employer: telling engineers what is tracked and why, recording your lawful basis, and completing a data protection impact assessment before you switch tracking on.

## Company details

Calon AI Solutions Ltd\
Registered in England and Wales, company number 15984397\
Registered office: Ty Merlin, Caerphilly Business Park, Caerphilly

Our founder, Mahbubul Alom, is ISO certified in data processing.

To report a security concern, or for any other question, email [hello@sentinelvero.com](mailto:hello@sentinelvero.com). We aim to reply to every query within 8 hours.

```cta
Questions from your compliance lead?
Send them over and we will answer in writing, or walk through them on a call.
Book a demo
```
