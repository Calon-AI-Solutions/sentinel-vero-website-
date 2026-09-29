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

[[CONFIRM: every row below is live in Vero today. Delete any row that is still on the roadmap.]]

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

[[CONFIRM: the list above matches what is live. Delete anything that is not.]]

## Your data under UK GDPR

**Who is responsible for what.** You are the data controller for your customer and employee data. Calon AI Solutions Ltd, which builds Vero, acts as your data processor. Our data processing agreement is available at [[DPA LINK]].

**Where data is stored.** [[HOSTING REGION, for example "EU West (Netherlands)". State the real region your Railway services and database run in.]]

**Encryption.** Data is encrypted in transit using TLS. [[CONFIRM: encryption at rest for the database and file storage, and how.]]

**Access control.** Access is role based. Office staff, managers and engineers see only what their role needs. [[CONFIRM: engineers can only see their own jobs.]] [[CONFIRM: multi-factor authentication is available and how.]]

**Audit trail.** [[CONFIRM: changes to jobs, certificates and user permissions are logged with who made them and when.]]

**Backups.** [[CONFIRM: backup frequency and retention period.]]

**Leaving Vero.** You can export your data at any time in [[FORMAT, for example CSV and PDF]]. When you leave, we delete your data within [[NUMBER]] days unless the law requires us to keep it.

### Sub-processors

| Provider | What they do | Location |
|---|---|---|
| Railway | Application and database hosting | [[REGION]] |
| Cloudflare | Network security and traffic routing | Global |
| [[AI MODEL PROVIDER]] | [[Purpose, for example transcription or text structuring]] | [[REGION]] |
| [[ADD OR DELETE ROWS]] | | |

## How Vero uses AI with your data

AI in Vero does three jobs: turning engineer voice notes into structured reports, reading supplier price lists, and drafting quote wording from your approved clause library.

The rules it works to:

- It structures what the engineer said. It does not invent readings, results or findings.
- A person reviews and signs off every certificate and every quote before it goes to a customer.
- [[CONFIRM: data sent to AI providers is not used to train their models, under the providers' API terms.]]
- [[CONFIRM: site access codes and alarm codes are never sent to AI providers, and how they are stored.]]

## Tracking engineers lawfully

Vehicle and location data about your engineers is personal data. The Information Commissioner's Office has published guidance on monitoring workers, and it expects employers to be open about tracking, to have a clear reason for it, and to assess the risks before they start.

What Vero provides to help: [[CONFIRM: private mode outside working hours; engineers can see their own tracking data; a data protection impact assessment template. Delete what is not live.]]

What remains your responsibility: telling engineers what is tracked and why, recording your lawful basis, and completing a data protection impact assessment before you switch tracking on.

## Company details

Calon AI Solutions Ltd\
Registered in England and Wales, company number 15984397\
Registered office: Ty Merlin, Caerphilly Business Park\
ICO registration number: [[ICO NUMBER]]

To report a security concern, email [[SECURITY EMAIL]]. We aim to reply within [[NUMBER]] working days.

[[CYBER ESSENTIALS: add a line with your certificate number only if you hold Cyber Essentials or Cyber Essentials Plus. Otherwise delete this line.]]

```cta
Questions from your compliance lead?
Send them over and we will answer in writing, or walk through them on a call.
Book a demo
```
