# Security Policy

## Supported Versions

| Version        | Supported |
| -------------- | --------- |
| 0.1.x (latest) | Yes       |

Only the latest release on the `main` branch receives security updates. There are no backported fixes for older versions at this time.

## Reporting a Vulnerability

**Do not open a public issue for security vulnerabilities.**

Use [GitHub Private Vulnerability Reporting](https://github.com/michelve/draft_v0/security/advisories/new) to submit a report. This keeps the details confidential until a fix is available.

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Affected files or components
- Potential impact (data exposure, privilege escalation, etc.)

### Response Timeline

| Step                        | Target                 |
| --------------------------- | ---------------------- |
| Acknowledgment              | Within 48 hours        |
| Initial assessment          | Within 5 business days |
| Fix for critical issues     | Within 14 days         |
| Fix for non-critical issues | Next release cycle     |

## Scope

### In Scope

- Dependency vulnerabilities (npm packages, Prisma, etc.)
- Injection attacks (SQL, XSS, command injection)
- Authentication and authorization bypasses
- Sensitive data exposure (API keys, database credentials, tokens)
- Server-side request forgery (SSRF)
- Insecure defaults in configuration

### Out of Scope

- Bugs that do not have a security impact
- Feature requests
- Denial of service via resource exhaustion (pre-production project)
- Social engineering

## Automated Security Tooling

This project uses automated security scanning as part of its development workflow:

- **TypeScript strict mode** - Catches type-safety issues at compile time
- **Codacy + Trivy** - Dependency vulnerability scanning runs automatically after any package installation
- **Biome + ESLint** - Static analysis catches common security anti-patterns
- **Prisma Client API** - No raw SQL queries allowed, preventing SQL injection by design

## Disclosure Policy

We follow coordinated disclosure:

1. Reporter submits via GitHub Private Vulnerability Reporting
2. We acknowledge and assess the report
3. A fix is developed and tested privately
4. The fix is released and the advisory is published
5. The reporter is credited (unless they prefer anonymity)

We ask reporters to allow a reasonable window for a fix before any public disclosure.
