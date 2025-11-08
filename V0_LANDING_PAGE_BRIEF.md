# MeasureMint Landing Page - v0 Design Brief

## 🎯 Project Overview

**Product Name:** MeasureMint  
**Tagline:** Professional measurement and calibration tool for Miro boards  
**Website:** https://measuremint.app  
**Current Version:** 1.0.0

## 📋 Design Requirements

### Technical Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Typography:** Ultra-minimal, Vercel-inspired blog aesthetic
- **Design Philosophy:** 
  - Massive typography (text-6xl to text-8xl headings)
  - Pure white background
  - No gradients or colored backgrounds
  - Minimal borders (only where necessary)
  - tracking-tighter for modern typography
  - Large spacing between sections
  - Simple blue links with underlines (no buttons for secondary actions)

### Design Reference
The design should match the existing `/guide` page at https://measuremint.app/guide which features:
- Ultra-minimal Vercel blog aesthetic
- Large, bold typography
- Generous whitespace
- Clean, professional appearance
- No decorative elements

## 📄 Page Structure

### 1. Navigation Header
**Style:** Minimal, single line
- Logo/Brand: "MeasureMint." (with period)
- Links: Guide | Help | Support
- Primary CTA: "Launch App" button (links to `/panel`)

### 2. Hero Section
**Headline:** Make exact measurements on Miro boards  
**Subheadline:** Professional measurement and calibration tool for architects, engineers, and construction professionals. Set scale once, measure anything with precision.

**CTA Buttons:**
- Primary: "Launch App" → `/panel`
- Secondary: "Watch Demo" → Link to Loom video: https://loom.com/share/3a2b1b94850946fa93a4db2961d2b62d

**Hero Visual:** 
- Screenshot or illustration of MeasureMint in action on a Miro board
- Show measurement lines and calibration in context
- Optional: Animated demo or video embed

### 3. Problem/Solution Statement
**Problem Statement:**
"Measuring drawings on Miro boards is frustrating. You can't get accurate dimensions from blueprints, floor plans, or technical drawings without complex workarounds."

**Solution Statement:**
"MeasureMint solves this with professional-grade measurement tools built directly into Miro. Calibrate once, measure anything."

### 4. Key Features Section
**Section Title:** Built for professionals

**Features to highlight:**

1. **Precise Scale Calibration**
   - Set a known distance to establish accurate scale
   - Works with any drawing, blueprint, or technical diagram
   - One-time calibration per drawing

2. **Professional Measurements**
   - Measure any distance on calibrated drawings
   - Visual feedback with clear markers directly on the board
   - Track measurement history with automatic conversions

3. **Dual Unit Systems**
   - Full Imperial and Metric support
   - 8 unit types: Feet, inches, yards, miles, meters, centimeters, millimeters, kilometers
   - Instant conversion between any units
   - Toggle between systems anytime

4. **No Image Selection Required**
   - Measure anywhere on the board instantly
   - Works with any drawing, PDF, or image
   - Seamless integration with Miro workflow

5. **Conversion Tables**
   - View measurements across all units simultaneously
   - Compare Imperial and Metric instantly
   - Export-ready measurement data

6. **Professional Grade**
   - Built for architects, engineers, and construction professionals
   - Inspired by Bluebeam Revu's measurement tools
   - Designed for the AEC industry

### 5. Use Cases Section
**Section Title:** Perfect for

Display with icons/emojis:
- 🏗️ **Construction Blueprints** - Measure dimensions, verify specifications, check clearances
- 🏠 **Floor Plans** - Space planning, room dimensions, furniture layouts
- 🗺️ **Site Plans** - Property measurements, lot dimensions, site analysis
- 📐 **Technical Drawings** - Engineering schematics, mechanical drawings, diagrams
- 🎨 **Architectural Designs** - Elevations, sections, detail drawings

### 6. How It Works (3 Simple Steps)
**Section Title:** Get started in 60 seconds

**Step 1: Calibrate Scale**
- Click two points on a known distance (like "20 ft" on your drawing)
- Enter the actual distance
- Choose your unit
- Done! Your scale is set

**Step 2: Measure Anything**
- Click "Measure Distance"
- Click any two points on your drawing
- See instant measurements with full unit conversions

**Step 3: Switch Units Anytime**
- Toggle between Imperial (🇺🇸) and Metric (🌍)
- All measurements update automatically
- View conversion tables for all units

**CTA:** "See detailed guide" → `/guide`

### 7. Target Audience Section
**Section Title:** Built for professionals who demand precision

**Target Users:**
- Architects and architectural firms
- Engineers (civil, mechanical, structural)
- Construction project managers
- Interior designers
- Real estate professionals
- Facility managers
- Anyone who works with technical drawings on Miro

### 8. Roadmap/Coming Soon (Optional)
**Section Title:** More features coming soon

- Area calculations with perimeter
- Angle measurements
- Export measurements to CSV
- Custom unit definitions
- Measurement templates
- Multi-language support

### 9. Social Proof / Stats (Optional)
If available, include:
- Number of measurements taken
- Number of teams using MeasureMint
- Time saved vs manual methods
- Accuracy improvements

### 10. Final CTA Section
**Headline:** Ready to measure with precision?  
**Subheadline:** Join architects and engineers who trust MeasureMint for accurate measurements on Miro.

**CTA Buttons:**
- Primary: "Launch MeasureMint" → `/panel`
- Secondary: "View Documentation" → `/guide`

### 11. Footer
**Layout:** Minimal, single line with centered or split layout

**Left Side:**
- © 2025 MeasureMint. All rights reserved.

**Right Side Links:**
- Guide → `/guide`
- Help → `/help`
- Support → `/support`
- Privacy → `/privacy`
- Terms → `/terms`

**Contact:**
- Email: support@measuremint.app

## 🎨 Design Guidelines

### Typography Scale
- Hero headline: `text-6xl md:text-8xl` with `font-bold tracking-tighter`
- Section headlines: `text-4xl md:text-5xl` with `font-bold tracking-tighter`
- Subheadings: `text-2xl md:text-3xl` with `font-bold`
- Body text: `text-lg md:text-xl` with `text-gray-700`
- Small text: `text-sm` with `text-gray-500`

### Colors
- Primary text: `text-gray-900`
- Secondary text: `text-gray-700`
- Muted text: `text-gray-500`
- Links: `text-blue-500 hover:underline`
- Primary button: `bg-black text-white` with `hover:bg-gray-800`
- Background: Pure white (`bg-white`)

### Spacing
- Section spacing: `mb-32` (large gaps between sections)
- Content max-width: `max-w-5xl mx-auto`
- Padding: `px-5` on mobile, `px-6` on desktop

### Buttons
- Primary: Black background, white text, rounded corners
- Secondary: Blue text with underline on hover (no background)
- Size: `px-6 py-3` for primary actions

### Layout
- Single column, centered content
- Max-width container: `max-w-5xl`
- Consistent padding: `px-5 md:px-6`
- Generous vertical spacing between sections

## 📝 Copy & Messaging

### Key Messages
1. **Main Value Prop:** "Professional measurement tools for Miro boards"
2. **Primary Benefit:** "Set scale once, measure anything with precision"
3. **Differentiation:** "Built for architects, engineers, and construction professionals"
4. **Ease of Use:** "Get started in 60 seconds"

### Tone of Voice
- Professional but approachable
- Clear and direct
- Confidence without arrogance
- Technical accuracy with simplicity

### Call-to-Actions
- Primary: "Launch App", "Launch MeasureMint", "Get Started"
- Secondary: "Watch Demo", "View Guide", "See Documentation"
- Tertiary: "Learn More", "Contact Support"

## 🔗 Navigation & Links

### Required Navigation Links
- **Launch App** → `/panel` (Primary CTA in header)
- **Guide** → `/guide` (How to use documentation)
- **Help** → `/help` (Help center)
- **Support** → `/support` (Contact/support page)
- **Privacy** → `/privacy` (Privacy policy)
- **Terms** → `/terms` (Terms of service)

### External Links
- **Demo Video:** https://loom.com/share/3a2b1b94850946fa93a4db2961d2b62d
- **Miro SDK Docs:** https://developers.miro.com/docs/
- **GitHub Issues:** https://github.com/Khaledykhalil/MeasureMint/issues

## 📱 Responsive Requirements

### Mobile (< 768px)
- Stack all sections vertically
- Reduce heading sizes appropriately
- Maintain readability and spacing
- Ensure CTAs are thumb-friendly
- Single column layout

### Tablet (768px - 1024px)
- Maintain single column for content
- Slightly larger typography
- Comfortable reading width

### Desktop (> 1024px)
- Max-width container at 5xl (64rem)
- Full typography scale
- Generous spacing

## 🎯 Success Metrics (for your reference)

The landing page should optimize for:
1. **Clarity:** Visitor immediately understands what MeasureMint does
2. **Trust:** Professional design builds confidence
3. **Action:** Clear path to try the app
4. **Education:** Easy access to documentation and guides

## 📦 Deliverables Needed from v0

1. **Homepage component** (`page.tsx` or `page.jsx`)
2. **Responsive design** (mobile, tablet, desktop)
3. **Tailwind CSS styling** (matching the minimal aesthetic)
4. **Next.js App Router compatible** (using Link components)
5. **Accessible markup** (semantic HTML, ARIA labels)
6. **Performance optimized** (lazy loading, optimized images)

## 🎨 Visual Elements to Include

### Screenshots/Images Needed
1. Hero image showing MeasureMint in action on Miro
2. Calibration process screenshot
3. Measurement display screenshot
4. Unit conversion interface
5. Multiple use case examples (optional)

### Icons
- Measurement ruler icon for logo
- Feature icons (optional, can use emojis initially)
- Use case icons (construction, architecture, etc.)

## ⚡ Additional Notes

- The app is live at https://measuremint.app
- Target audience is professional (AEC industry)
- Emphasize precision, ease of use, and professional-grade quality
- Avoid overly playful or consumer-focused design
- Match the minimal aesthetic of existing `/guide` page
- This is a B2B SaaS tool, not a consumer app

## 🚀 Quick Reference

**Brand Name:** MeasureMint (one word, capital M)  
**Domain:** measuremint.app  
**Primary CTA:** Launch App → `/panel`  
**Demo Video:** https://loom.com/share/3a2b1b94850946fa93a4db2961d2b62d  
**Support Email:** support@measuremint.app  
**Target Market:** AEC professionals (Architecture, Engineering, Construction)  
**Design Style:** Ultra-minimal Vercel blog aesthetic  
**Tech Stack:** Next.js 14 + Tailwind CSS

---

## 📋 v0 Prompt Template

**Copy this to v0:**

"Create a minimal, professional landing page for MeasureMint, a measurement tool for Miro boards. Use Next.js 14 App Router and Tailwind CSS.

Design should match Vercel's ultra-minimal blog aesthetic:
- Massive typography (text-6xl to text-8xl headings)
- Pure white background, no gradients
- tracking-tighter for headings
- Large spacing between sections (mb-32)
- Simple blue underline links
- Black primary buttons

Include these sections:
1. Hero with headline 'Make exact measurements on Miro boards' and CTA to /panel
2. Problem/solution statement
3. Key features (Calibration, Measurements, Unit Systems, Conversion Tables)
4. Use cases (Construction, Floor Plans, Site Plans, Technical Drawings)
5. How it works (3 steps)
6. Final CTA section
7. Minimal footer with links to /guide, /help, /support, /privacy, /terms

Target audience: Architects, engineers, construction professionals.

Make it clean, professional, and conversion-focused."

---

**End of Brief**
