---
status: accepted
date: 2026-03-08
---

# Use helmet for HTTP security headers

## Context and Problem Statement

The Express server shipped with no HTTP security headers, leaving it vulnerable to well-known browser-based attacks: clickjacking (missing `X-Frame-Options`), MIME-type sniffing (`X-Content-Type-Options`), and information leakage via `X-Powered-By: Express`. Every major security assessment checklist and OWASP recommendations require these mitigations.

## Considered Options

- `helmet` - de-facto Express security middleware; sets 11+ headers in one call
- Manual `res.setHeader()` calls - no dependency, but error-prone and easy to miss headers
- Custom middleware wrapping `res.setHeader()` - same burden as manual; adds maintenance cost

## Decision Outcome

Chosen option: "helmet", because it covers all recommended security headers in a single well-maintained package with sensible defaults, requires no manual enumeration, and is the standard solution endorsed by the Express documentation.

### Consequences

- Good, because clickjacking, MIME-sniffing, and information-leakage headers are set automatically.
- Good, because `X-Powered-By` is removed, reducing fingerprinting surface.
- Good, because the package is actively maintained (Mozilla, Express core contributors).
- Neutral, because Helmet's CSP defaults are strict and may need configuration once the app serves HTML directly (current SPA is served by Vite separately, so no immediate conflict).
