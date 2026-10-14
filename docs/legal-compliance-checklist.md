# Indian Legal Compliance Checklist — Real Estate Website Template

**Platform / Product:** Estate Atelier Real Estate Website Template  
**Target Legal Jurisdiction:** India (Union & State Specific)  
**Applicable Statutes:**  
1. Digital Personal Data Protection Act, 2023 (DPDP Act) & Draft Rules, 2025  
2. Real Estate (Regulation and Development) Act, 2016 (RERA) & State Rules  
3. Information Technology Act, 2000 & IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021  
4. Consumer Protection Act, 2019 & Consumer Protection (E-Commerce) Rules, 2020  
5. Indian Contract Act, 1872  

---

## 1. Statutory Compliance Status Overview

| Compliance Domain | Statute / Reference | Technical Status | Production Pre-Requisite |
| :--- | :--- | :--- | :--- |
| **Privacy Notice** | DPDP Act 2023 Sec 5 | ✅ Implemented (`/privacy-policy`) | Verify against client data storage providers |
| **Notice Before Consent** | DPDP Act 2023 Sec 5(1) | ✅ Implemented on forms | Add regional languages if targeting non-English users |
| **Affirmative Consent** | DPDP Act 2023 Sec 6(1) | ✅ Un-checked checkboxes | Ensure backend logs consent version & timestamp |
| **Unbundled Consent** | DPDP Act 2023 Sec 6(2) | ✅ Separate marketing checkbox | Keep marketing decoupled from consultation |
| **Grievance Redressal** | IT Rules 2021 R 3(2) / DPDP Sec 13 | ✅ Implemented (`/grievance-redressal`) | Designate real employee & official email/phone |
| **Property Disclosures** | RERA Act 2016 Sec 11(2) & 12 | ✅ Implemented (`/property-disclaimer`) | Audit all listings for authentic RERA certificates |
| **RERA Agent Registration** | RERA Act 2016 Sec 9 | ✅ Configured in `src/lib/config.ts` | Enter client's State RERA registration ID |
| **Terms of Use** | IT Act 2000 & Contract Act 1872 | ✅ Implemented (`/terms-and-conditions`) | Legal counsel review of jurisdiction clause |
| **Cookie & Storage Disclosures** | Technical Audit | ✅ Implemented (`/cookie-policy`) | Audit if new analytics or pixels are added later |
| **Form Abuse & Bot Protection** | IT Security Best Practices | ✅ Honeypot & phone validation | Consider Turnstile/reCAPTCHA for high traffic |
| **Upload Security** | IT Act 2000 Sec 43A | ✅ MIME + 5MB size limit enforced | Configure S3/Cloudflare R2 private bucket in prod |
| **HTTP Security Headers** | CERT-In / ISO 27001 | ✅ Middleware headers added | Enforce HSTS via CDN / production domain |

---

## 2. Digital Personal Data Protection Act, 2023 (DPDP Act)

### Notice Requirements (Section 5)
- [x] **Data Fiduciary Identification:** Fully identified in `src/lib/config.ts` (`config.legal.legalBusinessName`).
- [x] **Itemized Data Categories:** Clear disclosure of name, telephone, email address, property preferences, and server logs.
- [x] **Specific Purposes:** Stated purpose restricted to property inquiry facilitation, consultation, and optional newsletters.
- [x] **Data Principal Rights:** Clear explanation of right to access, right to correction, right to erasure, and right of grievance redressal.
- [x] **Withdrawal of Consent:** Instructions provided for withdrawing consent at any time via privacy email.
- [ ] **Multilingual Support:** DPDP Act contemplates notices in English or any 8th Schedule language. *Action for Client:* Provide translations if operating in non-English regional markets.

### Consent Standards (Section 6)
- [x] **Free, Specific, Informed, Unconditional, and Unambiguous:** Checkboxes are un-checked by default.
- [x] **Unbundled Marketing:** Optional marketing consent is strictly separate from property consultation consent.
- [x] **No Coercion:** Refusal of marketing does not inhibit property consultation submission.
- [x] **Consent Persistence:** Submissions record affirmative opt-in state.

### Children's Data Safeguards (Section 9)
- [x] Clear stipulation that the service is intended for persons 18 years of age or older (competent to contract under Indian Contract Act, 1872).
- [x] No tracking, behavioral profiling, or targeted advertising directed at minors.

### Data Security & Breach Reporting (Section 8)
- [x] Standard HTTP security headers enabled via Astro middleware (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`).
- [x] No plaintext storage or public API exposure of client inquiry submissions.
- [x] File upload restrictions: strict MIME whitelist (`image/jpeg`, `image/png`, `image/webp`, `image/avif`) and 5MB size cap.
- [ ] **CERT-In 6-Hour Reporting Plan:** In production, client must maintain a documented incident response procedure for 6-hour CERT-In cyber incident reporting.

---

## 3. Real Estate (Regulation and Development) Act, 2016 (RERA)

### Broker / Real Estate Agent Obligations (Section 9 & 10)
- [x] **No Blanket Compliance Claims:** The site clearly disclaims that listings are representations, not official title certifications.
- [x] **Configurable Agent Registration:** `src/lib/config.ts` contains `config.legal.rera.agentRegistrationNumber`.
- [x] **Per-Listing RERA Verification:**
  - If a property has a RERA ID, it displays an official badge with a direct link to the state RERA portal.
  - If a property does not have a RERA ID, it displays a statutory buyer due diligence advisory warning.
- [ ] **Client Action:** Client must register as a Real Estate Agent under the applicable State RERA (e.g., UP-RERA, Haryana-RERA, Delhi-RERA, MahaRERA) and replace the placeholder with their valid certificate number.

### Advertising & Promotional Standards (Section 11 & 12)
- [x] Listings state that floor plans, dimensions, and specifications are indicative and subject to physical verification.
- [x] Disclaimer explicitly bars misleading marketing representations.
- [x] Transparent pricing disclaimers: Prices exclude registration fees, stamp duty, GST, and conveyance charges.

---

## 4. Information Technology Act, 2000 & 2021 Intermediary Rules

### Grievance Officer Designation (Rule 3(2))
- [x] Dedicated route implemented at `/grievance-redressal`.
- [x] Officer name, official designation, physical business address, email, and phone number configured.
- [x] **Statutory SLA Displayed:** Acknowledgement within 24–48 hours, resolution within 15 days as required by Rule 3(2).
- [x] Ticket generator on `/grievance-redressal` allows complainants to receive a structured reference code.

### Intermediary Due Diligence
- [x] Terms and Conditions clearly forbid posting unlawful, obscene, defamatory, infringing, or fraudulent content.
- [x] Notice-and-takedown procedure documented on Grievance page.

---

## 5. Consumer Protection (E-Commerce) Rules, 2020

- [x] **Legal Entity Identity:** Legal business name, principal address, customer care number, and email prominently displayed.
- [x] **No Hidden Drip-Pricing Claims:** Disclaimers inform purchasers of statutory closing expenses (stamp duty, registration).
- [x] **Complaint Escalation:** Clear pathway provided from Grievance Officer to National Consumer Helpline (NCH / Umang).

---

## 6. Pre-Production Launch Readiness Checklist

Before shifting this template into production for a paying client:

1. [ ] **Update `src/lib/config.ts`:**
   - [ ] Replace `Estate Atelier` with the registered partnership / corporate entity name.
   - [ ] Enter official CIN / LLPIN / GSTIN if applicable.
   - [ ] Enter verified physical office address with PIN code.
   - [ ] Enter real telephone and email contacts.
   - [ ] Enter state-licensed RERA Agent Certificate Number.
2. [ ] **Designate Real Grievance Officer:**
   - [ ] Provide legal name, direct designation, and grievance contact number.
3. [ ] **Audit Live Property Portfolio:**
   - [ ] Ensure every ongoing residential/commercial project listing has an authentic RERA number and verification URL.
   - [ ] Ensure non-registered or resale plots carry the statutory advisory.
4. [ ] **Set Environment Variables in Hosting:**
   - [ ] Set `ADMIN_USERNAME` and strong `ADMIN_PASSWORD`.
   - [ ] Set `SITE_URL` to production HTTPS domain.
5. [ ] **Engage Legal Counsel:**
   - [ ] Have an advocate qualified in Indian real estate and cyber law review the policies for state-specific amendments.
