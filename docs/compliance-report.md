# Indian Legal Compliance & Technical Safeguards Report

**Date:** October 14, 2026  
**Project:** Estate Atelier Real Estate Website Template  
**Target Architecture:** Astro (SSR) + TypeScript + Tailwind CSS  
**Target Jurisdiction:** India (Union & State Specific)  

---

## 1. Executive Summary

This report documents the architectural audit, legal policy implementation, user disclosure systems, and technical safeguards developed for the **Estate Atelier** real estate website template under applicable Indian legislation:

- **Digital Personal Data Protection Act, 2023 (DPDP Act)** & Draft Rules, 2025
- **Real Estate (Regulation and Development) Act, 2016 (RERA)** & applicable State Rules
- **Information Technology Act, 2000** & **IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021**
- **Consumer Protection Act, 2019** & **Consumer Protection (E-Commerce) Rules, 2020**
- **Indian Contract Act, 1872**

> **Disclaimer:** Technical safeguards and draft policies provide a practical compliance foundation. They do not constitute formal legal certification. An advocate or legal professional qualified in Indian real estate and cyber law must review all business facts, corporate disclosures, and state-specific licensing before live production deployment.

---

## 2. Files Changed and Created

### New Legal & Governance Routes
1. **`src/pages/privacy-policy.astro`**: Comprehensive, server-rendered DPDP Act 2023 compliant privacy policy.
2. **`src/pages/terms-and-conditions.astro`**: Indian Contract Act 1872 & IT Act 2000 compliant terms of use with proportional liability and defined dispute resolution.
3. **`src/pages/property-disclaimer.astro`**: Statutory listing disclaimer and RERA buyer due diligence advisory.
4. **`src/pages/cookie-policy.astro`**: Technical cookie & local storage audit disclosure (identifying zero third-party tracking pixels).
5. **`src/pages/grievance-redressal.astro`**: Rule 3(2) IT Rules 2021 grievance officer portal with interactive ticket generator and appellate pathways.
6. **`src/pages/privacy.astro`**: Permanent 301 redirect to `/privacy-policy`.
7. **`src/pages/terms.astro`**: Permanent 301 redirect to `/terms-and-conditions`.

### Modified Application & Component Files
1. **`src/lib/config.ts`**:
   - Added typed `legal` configuration schema containing `publicTradingName`, `legalBusinessName`, `entityType`, `registeredAddress`, `operatingState`, `country`, `privacyEmail`, `grievance` (officer name, designation, email, phone, 15-day SLA), `rera` (agent registration status, authority name, verification URL), `businessRole`, `effectiveDates`, and `productionDomain`.
2. **`src/types/property.ts`**:
   - Extended `PropertyBase` with optional `reraId?: string` and `reraRegistrationUrl?: string`.
3. **`src/data/demo-properties.ts`**:
   - Configured sample RERA ID on demo property `prop-002` (`UPRERAPRJ12345/DEMO`) while leaving other properties un-registered to showcase both RERA and non-RERA states.
4. **`src/components/layout/Footer.astro`**:
   - Added navigation links for all 5 legal pages (`/privacy-policy`, `/terms-and-conditions`, `/property-disclaimer`, `/cookie-policy`, `/grievance-redressal`).
   - Added RERA buyer due diligence advisory banner in the footer.
5. **`src/components/property/PropertyOverview.astro`**:
   - Added RERA Statutory & Conveyancing Advisory Callout:
     - Displays verified state portal badge when `reraId` is present.
     - Displays independent title, encumbrance, and sanction plan verification warning when `reraId` is omitted.
6. **`src/components/property/PropertyEnquiry.astro`**:
   - Added anti-spam honeypot input (`website_hp`).
   - Added un-checked mandatory privacy consent checkbox with link to `/privacy-policy`.
   - Added unbundled optional marketing consent checkbox.
   - Added client-side phone format validation (at least 10 digits).
7. **`src/pages/contact.astro`**:
   - Added honeypot, un-checked privacy consent checkbox, unbundled marketing consent, and phone validation to inquiry submission form.
8. **`src/components/assistant/PropertyAssistant.astro`**:
   - Added demo disclosure and privacy advisory note in the assistant footer: *"Offline demo · Do not share sensitive personal or payment details · Privacy Policy"*.
9. **`src/lib/auth.ts`**:
   - Upgraded to read `ADMIN_USERNAME` and `ADMIN_PASSWORD` from environment variables, maintaining a safe fallback only for local development.
   - Added `secure: isProd` cookie flag for production deployments.
10. **`src/lib/upload.ts`**:
    - Enforced strict MIME whitelist (`image/jpeg`, `image/png`, `image/webp`, `image/avif`).
    - Enforced 5MB size limit to prevent memory exhaustion and denial-of-service.
    - Sanitized file names and extensions to prevent directory traversal attacks.
11. **`src/middleware.ts`**:
    - Created Astro server middleware injecting HTTP security headers:
      - `X-Content-Type-Options: nosniff`
      - `X-Frame-Options: SAMEORIGIN`
      - `Referrer-Policy: strict-origin-when-cross-origin`
      - `X-XSS-Protection: 1; mode=block`
      - `Permissions-Policy: camera=(), microphone=(), geolocation=(self)`
12. **`src/pages/admin/properties/new.astro` & `[id]/edit.astro`**:
    - Added form fields for RERA Registration Number and State Verification URL.
13. **`src/pages/admin/settings.astro`**:
    - Added Indian Legal & Regulatory Profile dashboard displaying current legal configuration status and preview links.

### Documentation Files
1. **`docs/legal-compliance-checklist.md`**: Structured compliance matrix against DPDP Act, RERA 2016, IT Rules 2021, and CPA 2020.
2. **`docs/compliance-report.md`**: This comprehensive report.

---

## 3. Data Collection, Storage, and Flow Audit

| Data Collection Point | Personal Data Collected | Purpose | Legal Basis (DPDP Act) | Storage Location / Transmission |
| :--- | :--- | :--- | :--- | :--- |
| **Property Inquiry Form** | Full Name, Phone Number, Email, Property Requirement | Facilitating contact between prospective buyers and advisors | Affirmative, purpose-specific consent (Sec 6) | Client-side simulation in demo; will transmit to server API in production |
| **Contact Advisory Form** | Full Name, Phone Number, Email, Property Category, Message | Responding to advisory inquiries | Affirmative consent (Sec 6) | Client-side simulation in demo; will transmit to server API in production |
| **Property Assistant (AI)** | Natural language search queries | Exploring demo property listings | User initiative / Legitimate interest | Processed entirely in-memory in browser (offline mock) |
| **CMS Admin Authentication** | Username, Password | Management access | Legitimate use (administrative security) | HTTP-only session cookie (`admin_session`) |
| **Technical Server Logs** | IP Address, User Agent, Timestamp | Security monitoring, DoS prevention | Legitimate use (Sec 7 DPDP Act) | Standard hosting environment logs (Vercel / Node) |

**Key Findings:**
- **Zero Third-Party Trackers:** No Google Analytics, Meta Pixel, Hotjar, or advertising cookies are installed.
- **No Private Data in Bundles:** Private inquiry submissions are never serialized into static bundles or publicly queryable endpoints.

---

## 4. Security Controls Implemented

1. **Anti-Spam & Bot Mitigation:** Hidden honeypot fields (`website_hp`) detect automated crawlers and silently reject bot submissions without disrupting legitimate users.
2. **Input Sanitization & Validation:** Telephone inputs require at least 10 valid digits; names and messages are sanitized before state updates.
3. **Upload Protection:** Strict whitelist restricted to raster images (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`), size capped at 5MB, path separators stripped.
4. **Credential Isolation:** Admin credentials decoupled into `process.env.ADMIN_USERNAME` and `process.env.ADMIN_PASSWORD`.
5. **Secure Cookie Configuration:** `admin_session` cookie enforces `httpOnly: true`, `sameSite: 'lax'`, and conditional `secure: true` in production.
6. **HTTP Hardening Headers:** Astro middleware attaches `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.

---

## 5. Regulatory Considerations (RERA & Real Estate)

- **Configurable Operating State:** The template's legal operating jurisdiction is configured as `Uttar Pradesh, India` (or client-specific state in `src/lib/config.ts`).
- **Granular RERA Handling:**
  - Registered properties clearly present their registration identifier and direct hyperlink to the state RERA portal.
  - Non-registered properties explicitly carry the advisory: *"Statutory Due Diligence Notice: Buyers are advised to independently verify all layout approvals, government sanctions, title deeds, and encumbrance certificates"*.
- **No False Verification:** The template avoids claiming that properties are "government verified" unless genuine verification details are supplied.

---

## 6. Client Information Pending for Production Launch

The following items must be supplied by the purchasing client before production deployment:

1. **Registered Legal Entity Name:** Replace `"Estate Atelier Consultant Pvt. Ltd. (Pending Client Incorporation Details)"` with the official registered name (Pvt. Ltd., LLP, Partnership, or Sole Proprietorship).
2. **Corporate Identity / Registration Numbers:** Supply CIN, LLPIN, or GSTIN as applicable.
3. **Physical Registered Address:** Provide the exact physical business address with postal PIN code.
4. **RERA Agent Registration:** Supply the client's official State RERA Real Estate Agent License number.
5. **Grievance Officer Designation:** Provide the name, title, direct telephone, and email of an actual company employee designated under Rule 3(2) of the IT Rules, 2021.
6. **Production Domain & SSL:** Supply the production domain and enforce HTTPS/HSTS at the DNS/CDN level.

---

## 7. Unresolved Legal Questions for Legal Counsel Review

Prior to launch, the client's legal counsel should advise on:

1. **Intermediary vs. Broker Classification:** Whether the business model operates as an authorized real estate agent (requiring Section 9 RERA license) or as a pure advertising platform/intermediary (governed under Section 79 of the IT Act).
2. **State-Specific RERA Rules:** Local state rules (e.g., MahaRERA circulars on QR codes, Haryana RERA guidelines on advertisement sizes) may require additional display formats.
3. **DPDP Commencement Schedule:** Monitoring MeitY's phased notification of the DPDP Rules, 2025 regarding specific Data Protection Officer (DPO) and Significant Data Fiduciary (SDF) thresholds.
4. **Multilingual Consent:** Determining whether the client's target audience requires consent notices in regional languages (e.g., Hindi, Marathi, Kannada) under Section 5(1) of the DPDP Act.
