# 🎯 MeasureMint Marketplace Submission Guide

**Complete checklist and submission instructions for Miro Marketplace**

---

## 📋 Table of Contents

1. [Pre-Submission Checklist](#pre-submission-checklist)
2. [App Listing Information](#app-listing-information)
3. [Visual Assets Requirements](#visual-assets-requirements)
4. [Compliance Requirements](#compliance-requirements)
5. [Submission Process](#submission-process)
6. [Post-Submission](#post-submission)

---

## ✅ Pre-Submission Checklist

### Technical Requirements

- [x] **App Deployed to Production**
  - URL: https://measuremint.app
  - Platform: Vercel
  - SSL/HTTPS: Active

- [x] **Miro App Configuration**
  - App URL: `https://measuremint.app`
  - SDK URI: `https://measuremint.app/panel`
  - Redirect URI: `https://measuremint.app/api/redirect`
  - Permissions: `boards:read`, `boards:write`

- [x] **Legal Documents**
  - Privacy Policy: https://measuremint.app/privacy
  - Terms of Service: https://measuremint.app/terms
  - Both are GDPR/CCPA/COPPA compliant

- [x] **Support Resources**
  - Support Email: support@measuremint.app
  - Help Documentation: https://measuremint.app/help
  - Support Form: https://measuremint.app/support

- [ ] **Visual Assets** ⚠️ REQUIRED
  - App Icon (512x512px PNG)
  - Toolbar Icon (24x24px PNG)
  - 3-5 Screenshots (1280x720px)
  - Optional: Demo video

- [x] **Production Testing**
  - OAuth flow tested
  - All features functional
  - Mobile responsive
  - Performance optimized

---

## 📝 App Listing Information

### Basic Information

**App Name:**
```
MeasureMint
```

**Tagline:** (60-80 characters)
```
Professional Measurement Tool for Miro Boards
```

**Category:**
- Primary: **Utilities & Productivity**
- Secondary: **Design & Planning**

**Description:** (400-450 characters)
```
Professional measurement and calibration tool for architects, engineers, designers, and construction professionals. Accurately measure distances on blueprints, floor plans, and technical drawings directly in Miro.

Features:
• Scale calibration for any drawing
• 8 unit types (feet, inches, yards, miles, meters, centimeters, millimeters, kilometers)
• Instant unit conversions
• Measurement history
• Visual markers and labels

Scale on Miro - Measure on Miro.
```

**Keywords/Tags:**
```
measurement, calibration, architecture, engineering, construction, floor plans, blueprints, technical drawings, scale, units, imperial, metric
```

---

## 🎨 Visual Assets Requirements

### 1. App Icon (Required)

**Specifications:**
- Size: 512x512px
- Format: PNG with transparency
- File size: < 1MB
- Design: Clear, recognizable at small sizes
- Content: Logo with measurement theme

**File Name:** `app-icon-512.png`

### 2. Toolbar Icon (Required)

**Specifications:**
- Size: 24x24px
- Format: SVG or PNG
- Design: Simple, monochrome-friendly
- Content: Simplified logo or measurement symbol

**File Name:** `toolbar-icon-24.png` or `toolbar-icon-24.svg`

### 3. Screenshots (3-5 Required)

**Specifications:**
- Size: 1280x720px (16:9 ratio)
- Format: PNG or JPG
- File size: < 5MB each
- Quality: High resolution, clear text

**Recommended Screenshots:**

1. **Hero Shot - Calibration Process**
   - Show the app panel with calibration interface
   - Demonstrate setting a known distance
   - Include clear labels and instructions

2. **Measurement in Action**
   - Show measuring a distance on a floor plan
   - Display measurement result with conversions
   - Highlight visual markers on board

3. **Measurement History**
   - Show multiple measurements on a board
   - Display history panel with past measurements
   - Show unit conversion table

4. **Real-World Use Case**
   - Professional floor plan or blueprint
   - Multiple measurements visible
   - Show practical application

5. **Unit System Toggle**
   - Demonstrate Imperial/Metric switching
   - Show all 8 unit types available
   - Highlight conversion capabilities

**File Names:** `screenshot-1.png`, `screenshot-2.png`, etc.

**Design Guidelines:**
- Use actual app interface (no mockups)
- Add descriptive text (max 20% of image)
- Avoid white/light gray backgrounds
- No rounded corners
- Full bleed images
- Show real content, not placeholder text

**Template:** Use Miro's Figma template: https://www.figma.com/community/file/1164176923625311143

### 4. Demo Video (Optional but Recommended)

**Specifications:**
- Length: 30-90 seconds
- Format: MP4, WebM, or YouTube/Vimeo link
- Resolution: 1280x720px minimum
- Content: Quick walkthrough of key features

**Script Outline:**
1. Open MeasureMint in Miro (3s)
2. Upload/select a floor plan (3s)
3. Set calibration on known distance (10s)
4. Make a measurement (10s)
5. Show unit conversions (5s)
6. Make multiple measurements (5s)
7. End with logo and tagline (4s)

---

## ✅ Compliance Requirements

### 1. App Fit & Purpose

**✅ MeasureMint Complies:**
- Enhances collaboration for technical teams
- Solves real workflow problem (accurate measurements)
- Professional tool for AEC industry
- Teams can share calibrated measurements

### 2. Technical Standards

**✅ Requirements Met:**
- Miro SDK v2.0 (current version)
- Next.js 14 modern framework
- HTTPS deployed (Vercel)
- OAuth 2.0 properly implemented
- Responsive design
- Performance optimized

### 3. Data Privacy & Security

**✅ Compliance Achieved:**
- GDPR compliant (EU users)
- CCPA compliant (California users)
- COPPA compliant (children protection)
- Privacy policy accessible
- Terms of service accessible
- Minimal data collection
- Secure OAuth tokens (encrypted)
- No third-party data selling

### 4. Content Guidelines

**✅ MeasureMint Follows:**
- Professional app name and description
- Clear value proposition
- Accurate feature descriptions
- No misleading claims
- Appropriate category selection
- Family-friendly content

---

## 🚀 Submission Process

### Step 1: Access Submission Portal

1. Go to: https://miro.com/app/settings/user-profile/apps/
2. Find "MeasureMint" in your app list
3. Click **"Publish to Marketplace"** button

**Alternative:**
- Visit: https://developers.miro.com/
- Navigate to "My Apps"
- Select MeasureMint
- Click "Submit to Marketplace"

### Step 2: Fill Out Submission Form

**Basic Information:**
- App Name: `MeasureMint`
- Tagline: `Professional Measurement Tool for Miro Boards`
- Category: `Utilities & Productivity`
- Description: (Copy from "App Listing Information" above)
- Keywords: measurement, calibration, architecture, engineering

**URLs:**
- App URL: `https://measuremint.app`
- Panel URL: `https://measuremint.app/panel`
- Privacy Policy: `https://measuremint.app/privacy`
- Terms of Service: `https://measuremint.app/terms`
- Help/Documentation: `https://measuremint.app/help`
- Support Contact: `support@measuremint.app`

**Permissions Justification:**
- `boards:read`: "Required to access board content and place measurement markers"
- `boards:write`: "Required to create visual markers and labels for measurements"

**Upload Assets:**
- App Icon (512x512px)
- Toolbar Icon (24x24px)
- Screenshots (3-5 images)
- Demo Video (optional)

### Step 3: Review & Submit

1. **Preview** your listing
2. **Check all information** for accuracy
3. **Verify all links** work correctly
4. **Review screenshots** display properly
5. **Click "Submit for Review"**

### Step 4: Confirmation

- You'll receive confirmation email
- Miro team will review (typically 5-10 business days)
- May request changes or clarifications
- You'll be notified of approval or required changes

---

## 📊 Review Process

### What Miro Reviews

1. **Technical Functionality**
   - App installs correctly
   - OAuth flow works
   - Core features function as described
   - No critical bugs

2. **Compliance**
   - Privacy policy complete
   - Terms of service present
   - Data handling transparent
   - Permissions justified

3. **Quality Standards**
   - Professional presentation
   - Clear value proposition
   - Quality screenshots
   - Accurate description

4. **User Experience**
   - Intuitive interface
   - Helpful documentation
   - Support resources available
   - Mobile responsive

### Timeline

- **Initial Review:** 5-10 business days
- **Revisions (if needed):** 3-5 business days per revision
- **Final Approval:** 1-2 business days
- **Publication:** Immediately after approval

---

## 📬 Post-Submission

### If Approved ✅

1. **Celebrate!** 🎉
2. **Monitor feedback** from users
3. **Respond to reviews** promptly
4. **Track analytics** in Miro Developer Dashboard
5. **Plan updates** based on feedback

### If Revisions Requested 🔄

1. **Review feedback** carefully
2. **Make requested changes**
3. **Update documentation** if needed
4. **Resubmit** with changes explained
5. **Follow up** if clarification needed

### Common Revision Requests

- Better screenshot quality
- More descriptive text on images
- Clearer feature descriptions
- Privacy policy clarifications
- Performance improvements
- Bug fixes

---

## 📋 Quick Reference Checklist

Before clicking "Submit":

- [ ] App name: MeasureMint ✓
- [ ] Production URL: https://measuremint.app ✓
- [ ] Privacy policy live and accessible ✓
- [ ] Terms of service live and accessible ✓
- [ ] App icon uploaded (512x512px)
- [ ] Toolbar icon uploaded (24x24px)
- [ ] 3-5 screenshots uploaded (1280x720px)
- [ ] Description written (400-450 chars) ✓
- [ ] Keywords added ✓
- [ ] Support email: support@measuremint.app ✓
- [ ] Help docs accessible ✓
- [ ] OAuth tested in production ✓
- [ ] All features working ✓
- [ ] Mobile responsive ✓

---

## 🎯 Success Metrics

### After Publication

**Monitor:**
- Installation count
- Active users
- User reviews and ratings
- Support requests volume
- Feature usage analytics

**Optimize:**
- Screenshots based on conversion
- Description based on user feedback
- Features based on usage data
- Support resources based on inquiries

---

## 📞 Support & Resources

### Miro Resources

- **Developer Platform:** https://developers.miro.com
- **SDK Documentation:** https://developers.miro.com/docs
- **Marketplace Guidelines:** https://developers.miro.com/docs/publish-your-app
- **Developer Community:** https://community.miro.com/developer-platform-forum-55

### MeasureMint Resources

- **Website:** https://measuremint.app
- **Support:** support@measuremint.app
- **GitHub:** https://github.com/Khaledykhalil/MeasureMint
- **Documentation:** https://measuremint.app/help

---

## 🚦 Status Tracking

### Submission Status

- [ ] **Preparing** - Gathering assets and information
- [ ] **Ready** - All requirements met, ready to submit
- [ ] **Submitted** - Waiting for Miro review
- [ ] **In Review** - Miro team reviewing
- [ ] **Revisions Requested** - Changes needed
- [ ] **Approved** - Ready for publication
- [ ] **Published** - Live on Miro Marketplace ✅

### Current Status: **PREPARING**
**Blocked By:** Visual assets (icons and screenshots)
**Next Action:** Create app icons and screenshots

---

**Last Updated:** November 8, 2025  
**Version:** 2.0  
**Maintainer:** Khaled Khalil (support@measuremint.app)
