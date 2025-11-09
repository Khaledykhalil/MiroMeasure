# 🔧 Third-Party Tools & Services Used in MeasureMint

**Date:** November 8, 2025  
**Version:** 1.0.0

---

## 📦 NPM Packages (Dependencies)

### Core Framework & Libraries

#### 1. **Next.js** (^14.2.33)
- **Purpose:** React framework for web application
- **License:** MIT
- **Cost:** Free
- **Usage:** Main application framework, routing, server-side rendering
- **Website:** https://nextjs.org

#### 2. **React** (^18.2.0)
- **Purpose:** UI library
- **License:** MIT
- **Cost:** Free
- **Usage:** Building user interface components
- **Website:** https://react.dev

#### 3. **React DOM** (^18.2.0)
- **Purpose:** React rendering for web
- **License:** MIT
- **Cost:** Free
- **Usage:** Rendering React components to DOM
- **Website:** https://react.dev

---

### Miro Integration

#### 4. **@mirohq/miro-api** (^2.0.0)
- **Purpose:** Official Miro SDK
- **License:** MIT
- **Cost:** Free
- **Usage:** Integrating with Miro boards, creating widgets, handling board interactions
- **Website:** https://developers.miro.com
- **Critical:** Yes - Core functionality

#### 5. **Mirotone** (5)
- **Purpose:** Miro's design system
- **License:** MIT
- **Cost:** Free
- **Usage:** UI components and styling (minimal usage)
- **Website:** https://www.mirotone.xyz

---

### Email Service

#### 6. **Resend** (^6.4.2)
- **Purpose:** Email sending API
- **License:** MIT
- **Cost:** Free tier (3,000 emails/month), Paid plans available
- **Usage:** Sending support form submissions
- **Website:** https://resend.com
- **API Key Required:** Yes (RESEND_API_KEY)
- **Current Plan:** Free tier

---

### UI Components

#### 7. **React Icons** (^5.5.0)
- **Purpose:** Icon library
- **License:** MIT
- **Cost:** Free
- **Usage:** UI icons throughout the app (Material Design, Tabler icons)
- **Website:** https://react-icons.github.io/react-icons
- **Icons Used:**
  - Material Design Icons (Md*)
  - Tabler Icons (Tb*)

---

### Utilities

#### 8. **Cookie** (^1.0.2)
- **Purpose:** Cookie parsing and serialization
- **License:** MIT
- **Cost:** Free
- **Usage:** Handling authentication cookies
- **Website:** https://www.npmjs.com/package/cookie

#### 9. **Dotenv** (^16.0.3)
- **Purpose:** Environment variable management
- **License:** BSD-2-Clause
- **Cost:** Free
- **Usage:** Loading environment variables from .env files
- **Website:** https://www.npmjs.com/package/dotenv

---

### Analytics & Monitoring

#### 10. **@vercel/analytics** (^1.5.0)
- **Purpose:** Web analytics
- **License:** MIT
- **Cost:** Free (included with Vercel)
- **Usage:** Tracking page views and user interactions
- **Website:** https://vercel.com/analytics
- **Data Collection:** Anonymous usage data

#### 11. **@vercel/speed-insights** (^1.2.0)
- **Purpose:** Performance monitoring
- **License:** MIT
- **Cost:** Free (included with Vercel)
- **Usage:** Tracking Core Web Vitals and performance metrics
- **Website:** https://vercel.com/docs/speed-insights

---

## 🛠️ Development Dependencies

### Testing

#### 12. **Jest** (^30.2.0)
- **Purpose:** Testing framework
- **License:** MIT
- **Cost:** Free
- **Usage:** Running unit tests
- **Website:** https://jestjs.io

#### 13. **@testing-library/react** (^16.3.0)
- **Purpose:** React testing utilities
- **License:** MIT
- **Cost:** Free
- **Usage:** Testing React components
- **Website:** https://testing-library.com/react

#### 14. **@testing-library/jest-dom** (^6.9.1)
- **Purpose:** Custom Jest matchers for DOM
- **License:** MIT
- **Cost:** Free
- **Usage:** Enhanced DOM testing assertions

#### 15. **@testing-library/user-event** (^14.6.1)
- **Purpose:** User interaction simulation
- **License:** MIT
- **Cost:** Free
- **Usage:** Simulating user events in tests

#### 16. **jest-environment-jsdom** (^30.2.0)
- **Purpose:** DOM environment for Jest
- **License:** MIT
- **Cost:** Free
- **Usage:** Providing browser-like environment for tests

---

### Build Tools

#### 17. **Tailwind CSS** (^3.4.18)
- **Purpose:** Utility-first CSS framework
- **License:** MIT
- **Cost:** Free
- **Usage:** Styling (minimal usage, mostly inline styles)
- **Website:** https://tailwindcss.com

#### 18. **PostCSS** (^8.5.6)
- **Purpose:** CSS processing
- **License:** MIT
- **Cost:** Free
- **Usage:** CSS transformations (required by Tailwind)
- **Website:** https://postcss.org

#### 19. **Autoprefixer** (^10.4.21)
- **Purpose:** CSS vendor prefixing
- **License:** MIT
- **Cost:** Free
- **Usage:** Adding browser-specific CSS prefixes
- **Website:** https://autoprefixer.github.io

---

### Code Quality

#### 20. **ESLint** (9.39.0)
- **Purpose:** JavaScript linting
- **License:** MIT
- **Cost:** Free
- **Usage:** Code quality and style checking
- **Website:** https://eslint.org

#### 21. **eslint-config-next** (16.0.1)
- **Purpose:** Next.js ESLint configuration
- **License:** MIT
- **Cost:** Free
- **Usage:** Next.js-specific linting rules
- **Website:** https://nextjs.org/docs/basic-features/eslint

---

### Development Utilities

#### 22. **Concurrently** (^8.2.2)
- **Purpose:** Run multiple commands concurrently
- **License:** MIT
- **Cost:** Free
- **Usage:** Running dev server and ngrok simultaneously
- **Website:** https://www.npmjs.com/package/concurrently

#### 23. **js-yaml** (^4.1.0)
- **Purpose:** YAML parser
- **License:** MIT
- **Cost:** Free
- **Usage:** Parsing app-manifest.yaml file
- **Website:** https://www.npmjs.com/package/js-yaml

#### 24. **@types/react** (^19.2.2)
- **Purpose:** TypeScript type definitions for React
- **License:** MIT
- **Cost:** Free
- **Usage:** Type checking (even in JS projects)

#### 25. **@types/react-dom** (^19.2.2)
- **Purpose:** TypeScript type definitions for React DOM
- **License:** MIT
- **Cost:** Free
- **Usage:** Type checking

---

## ☁️ External Services

### Hosting & Deployment

#### 26. **Vercel**
- **Purpose:** Hosting and deployment platform
- **Cost:** Free tier (Hobby plan)
- **Usage:** 
  - Hosting the web application
  - Automatic deployments from GitHub
  - Serverless functions
  - Environment variables
  - Analytics and monitoring
- **Website:** https://vercel.com
- **Plan:** Free (Hobby)
- **Limits:** 
  - 100 GB bandwidth/month
  - 100 GB-hours compute time
  - Unlimited deployments

---

### Domain & DNS

#### 27. **Porkbun**
- **Purpose:** Domain registrar and DNS hosting
- **Cost:** ~$10/year for domain
- **Usage:**
  - Domain registration (measuremint.app)
  - DNS management
  - DNS records for Resend and ImprovMX
- **Website:** https://porkbun.com

---

### Email Services

#### 28. **Resend** (API Service)
- **Purpose:** Transactional email sending
- **Cost:** Free tier (3,000 emails/month)
- **Usage:** Sending support form submissions
- **Website:** https://resend.com
- **Current Usage:** ~10 emails/month
- **Plan:** Free tier

#### 29. **ImprovMX**
- **Purpose:** Email forwarding service
- **Cost:** Free tier
- **Usage:** Forwarding support@measuremint.app to Gmail
- **Website:** https://improvmx.com
- **Plan:** Free
- **Limits:** 10 aliases, unlimited forwarding

---

### Version Control

#### 30. **GitHub**
- **Purpose:** Git repository hosting
- **Cost:** Free (public repository)
- **Usage:**
  - Source code hosting
  - Version control
  - CI/CD integration with Vercel
- **Website:** https://github.com
- **Repository:** https://github.com/Khaledykhalil/MeasureMint

---

### Miro Platform

#### 31. **Miro Developer Platform**
- **Purpose:** App hosting and integration
- **Cost:** Free for developers
- **Usage:**
  - App registration
  - OAuth authentication
  - SDK access
  - App marketplace listing
- **Website:** https://developers.miro.com
- **Plan:** Free

---

## 💰 Cost Summary

### Monthly Costs

| Service | Plan | Cost | Status |
|---------|------|------|--------|
| **Vercel** | Hobby | $0 | ✅ Free |
| **Resend** | Free Tier | $0 | ✅ Free |
| **ImprovMX** | Free | $0 | ✅ Free |
| **GitHub** | Public Repo | $0 | ✅ Free |
| **Miro Platform** | Developer | $0 | ✅ Free |
| **NPM Packages** | Open Source | $0 | ✅ Free |

**Total Monthly Cost:** $0 ✅

### Annual Costs

| Service | Cost | Status |
|---------|------|--------|
| **Porkbun Domain** | ~$10/year | ✅ Paid |

**Total Annual Cost:** ~$10/year

---

## 📊 Usage Limits

### Current Usage vs Limits

| Service | Limit | Current Usage | % Used |
|---------|-------|---------------|--------|
| **Vercel Bandwidth** | 100 GB/month | <1 GB | <1% |
| **Resend Emails** | 3,000/month | ~10/month | <1% |
| **ImprovMX Aliases** | 10 aliases | 1 alias | 10% |
| **GitHub Storage** | Unlimited | ~50 MB | N/A |

**Status:** Well within all limits ✅

---

## 🔒 Security & Privacy

### Data Collection

#### Analytics (Vercel Analytics):
- ✅ Anonymous page views
- ✅ No personal data collected
- ✅ GDPR compliant
- ✅ No cookies required

#### Email (Resend):
- ✅ Only stores support form submissions
- ✅ Encrypted in transit (TLS)
- ✅ GDPR compliant
- ✅ Can delete data on request

#### Miro SDK:
- ✅ Only accesses boards user authorizes
- ✅ No data stored outside Miro
- ✅ Follows Miro's security standards

---

## 📝 License Compliance & Clarification

### ⚠️ IMPORTANT: MeasureMint is PROPRIETARY Software

**MeasureMint Code License:** PROPRIETARY (NOT MIT, NOT Open Source)  
**Copyright:** © 2025 Khaled Khalil. All Rights Reserved.  
**Status:** Fully protected, cannot be copied or replicated

### Third-Party Dependencies Use Permissive Licenses:
- ✅ **MIT License:** 24 packages (dependencies only)
- ✅ **BSD-2-Clause:** 1 package (dotenv)
- ✅ **No GPL or copyleft licenses**
- ✅ **All compatible with proprietary software**

### What This Means:
- ✅ MeasureMint can legally use MIT-licensed dependencies
- ✅ MeasureMint code remains 100% proprietary
- ✅ No one can copy, replicate, or commercialize MeasureMint
- ✅ Your intellectual property is fully protected

**See THIRD-PARTY-LICENSES.md for detailed explanation**

**Status:** Fully compliant, fully protected ✅

---

## 🔄 Update Status

### Package Versions (as of Nov 8, 2025)

| Package | Current | Latest | Status |
|---------|---------|--------|--------|
| Next.js | 14.2.33 | 14.2.x | ✅ Current |
| React | 18.2.0 | 18.3.x | ⚠️ Minor update available |
| Miro API | 2.0.0 | 2.0.x | ✅ Current |
| Resend | 6.4.2 | 6.x.x | ✅ Current |

**Overall:** Up to date ✅

---

## 🎯 Critical Dependencies

These are essential and cannot be removed:

1. **Next.js** - Core framework
2. **React** - UI library
3. **@mirohq/miro-api** - Miro integration
4. **Resend** - Email functionality

---

## 🔧 Optional Dependencies

These could be replaced or removed:

1. **React Icons** - Could use custom SVGs
2. **Tailwind CSS** - Minimal usage, could remove
3. **Mirotone** - Not heavily used
4. **Vercel Analytics** - Could use alternative

---

## 📚 Documentation Links

- **Next.js:** https://nextjs.org/docs
- **React:** https://react.dev/learn
- **Miro SDK:** https://developers.miro.com/docs
- **Resend:** https://resend.com/docs
- **Vercel:** https://vercel.com/docs

---

## ✅ Recommendations

### Keep Using:
- ✅ All current services (working well)
- ✅ Free tiers are sufficient
- ✅ No need to upgrade

### Monitor:
- ⚠️ Resend email usage (3,000/month limit)
- ⚠️ Vercel bandwidth (100 GB/month limit)

### Consider:
- 💡 Verify domain in Resend (better deliverability)
- 💡 Update React to 18.3.x (minor version)

---

**Total Third-Party Tools:** 31  
**Total Cost:** $10/year  
**Status:** All systems operational ✅

