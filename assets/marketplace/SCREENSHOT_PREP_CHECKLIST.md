# 📸 Screenshot Preparation Checklist

**Date:** November 7, 2025  
**Status:** Ready to prepare for marketplace submission  
**Target:** 5 screenshots at 1258x706px

---

## ✅ **Screenshot Selection (Final 5)**

### 1️⃣ **Hero - "MeasureMint in Action"**
- **Source:** Screenshot 6 (measurement active on floor plan)
- **Purpose:** Show the app working in real-world scenario
- **Highlights:** Professional use case, calibrated + measuring
- **Filename:** `01-hero-measuremint-in-action.png`

### 2️⃣ **Feature Focus - "Easy Calibration with Separate Inputs"**
- **Source:** Screenshot 3 (73 ft + 8 in modal)
- **Purpose:** Showcase NEW separate feet/inches input feature
- **Highlights:** User-friendly interface, clear input fields
- **Filename:** `02-calibration-separate-inputs.png`

### 3️⃣ **Workflow - "Set Your Calibration"**
- **Source:** Screenshot 2 (success modal with green line)
- **Purpose:** Show calibration completion and feedback
- **Highlights:** Success state, visual confirmation
- **Filename:** `03-calibration-complete.png`

### 4️⃣ **Core Feature - "Measure Any Distance"**
- **Source:** Screenshot 5 (measurement line in progress)
- **Purpose:** Demonstrate measurement tool in action
- **Highlights:** Interactive measurement, clear instructions
- **Filename:** `04-measurement-in-progress.png`

### 5️⃣ **Professional Use - "Built for Technical Drawings"**
- **Source:** Screenshot 4 or 6 (completed workflow)
- **Purpose:** Show real architectural floor plan use case
- **Highlights:** Professional application, accurate results
- **Filename:** `05-professional-floor-plan.png`

---

## 🎯 **Preparation Steps**

### **Step 1: Resize to Exact Dimensions**
- [ ] Required size: **1258px wide × 706px tall**
- [ ] Use tool: Preview (Mac), Photoshop, Figma, or online tool
- [ ] Maintain aspect ratio as much as possible
- [ ] Crop from center to focus on key elements

**Quick Mac Preview Method:**
1. Open screenshot in Preview
2. Tools → Adjust Size
3. Set width to 1258px, height to 706px
4. Uncheck "Scale proportionally" if needed
5. Save as PNG

### **Step 2: Optimize Image Quality**
- [ ] Format: PNG (required by Miro)
- [ ] Color space: RGB
- [ ] Quality: High/Maximum
- [ ] File size: Keep under 2MB each
- [ ] Ensure text is readable at final size

### **Step 3: Review Checklist**
For each screenshot, verify:
- [ ] Dimensions exactly 1258×706px
- [ ] Text is clear and readable
- [ ] No sensitive information visible
- [ ] Panel UI is fully visible
- [ ] Key features are highlighted
- [ ] Professional appearance
- [ ] Consistent quality across all 5

### **Step 4: Save to Correct Location**
- [ ] Directory: `assets/marketplace/screenshots/`
- [ ] Naming convention: `01-hero-measuremint-in-action.png`
- [ ] All 5 files saved with proper names

---

## 📝 **Marketplace Captions (Required)**

You'll need to write a short description for each screenshot when submitting:

### Screenshot 1 - Hero
**Caption:** "MeasureMint enables precise measurements on any Miro board - perfect for floor plans, blueprints, and technical drawings."
**Max Length:** ~150 characters

### Screenshot 2 - Calibration Setup
**Caption:** "Easy calibration with separate input fields for feet and inches - just enter your known distance and start measuring."
**Max Length:** ~150 characters

### Screenshot 3 - Calibration Complete
**Caption:** "Visual confirmation when calibration is set. One calibration works for all measurements on your board."
**Max Length:** ~150 characters

### Screenshot 4 - Measurement
**Caption:** "Click two points to measure any distance. Real-time feedback guides you through the process."
**Max Length:** ~150 characters

### Screenshot 5 - Professional Use
**Caption:** "Built for professionals - accurately measure architectural plans, site drawings, and technical documents."
**Max Length:** ~150 characters

---

## 🛠️ **Tools You Can Use**

### **Mac Built-in (Easiest):**
1. **Preview** - Basic resize and crop
   - Open image → Tools → Adjust Size
   
2. **Screenshots App** - Crop and annotate
   - Markup tools available

### **Online Tools (Free):**
1. **Photopea** - https://www.photopea.com/
   - Photoshop-like interface
   - Resize to exact dimensions
   
2. **ResizeImage.net** - https://resizeimage.net/
   - Quick batch resize
   - Maintain quality

3. **Canva** - https://www.canva.com/
   - Custom dimensions
   - Add subtle branding

### **Professional (If Available):**
1. **Figma** - Use marketplace template
2. **Photoshop** - Precise control
3. **Sketch** - Mac design tool

---

## ⚡ **Quick Resize Commands (ImageMagick)**

If you have ImageMagick installed:

```bash
# Resize single image
convert input.png -resize 1258x706! output.png

# Batch resize all images
for file in *.png; do
  convert "$file" -resize 1258x706! "resized_$file"
done
```

---

## 🎨 **Optional Enhancements (Quick Adds)**

### **If You Have 5 Extra Minutes Per Screenshot:**
1. **Add subtle border:**
   - 1px light gray border for definition
   - Makes screenshots pop on white background

2. **Adjust brightness/contrast:**
   - Ensure panel is clearly visible
   - Make text crisp and readable

3. **Crop strategically:**
   - Focus on the panel and relevant board area
   - Remove excessive empty space

### **If You Have 15 Extra Minutes Per Screenshot:**
1. **Add MeasureMint logo watermark:**
   - Small, subtle in corner
   - Shows branding consistency

2. **Add subtle caption overlay:**
   - At bottom of image
   - Brief description of feature shown

3. **Highlight key UI elements:**
   - Subtle circle or arrow
   - Draw attention to new features

---

## ✅ **Final Quality Check**

Before submitting, verify:

### Technical Requirements:
- [ ] All images are exactly 1258×706px
- [ ] All images are PNG format
- [ ] All images under 2MB file size
- [ ] No compression artifacts
- [ ] Colors are accurate and vibrant

### Content Requirements:
- [ ] Panel interface is clearly visible
- [ ] Text is readable (zoom in to check)
- [ ] Flow makes sense (1→2→3→4→5)
- [ ] Professional appearance maintained
- [ ] No personal/sensitive data visible
- [ ] Each screenshot shows different feature/stage

### Marketplace Requirements:
- [ ] Minimum 3 screenshots (you have 5 ✓)
- [ ] Maximum 5 screenshots (perfect ✓)
- [ ] Shows actual product in use (✓)
- [ ] Demonstrates key features (✓)
- [ ] Professional quality (✓)

---

## 📤 **Ready to Submit?**

Once all screenshots are prepared:

1. **Save to repository:**
   ```bash
   # Add screenshots to git
   git add assets/marketplace/screenshots/
   git commit -m "feat: Add marketplace screenshots"
   git push
   ```

2. **Update TODO list:**
   - Mark "Create 5 Professional Marketplace Screenshots" as complete

3. **Next step:**
   - Test production deployment end-to-end
   - Then submit to Miro Marketplace!

---

## 🚀 **Estimated Time:**

- **Quick resize only:** 15-20 minutes (all 5 screenshots)
- **With basic optimization:** 30-40 minutes
- **With enhancements:** 1-1.5 hours

**You're so close to launch!** 🎉

---

## 📞 **Need Help?**

If you run into issues:
- Check Miro's marketplace guidelines: https://developers.miro.com/docs/marketplace-submission-guidelines
- Screenshot requirements: https://developers.miro.com/docs/app-screenshots
- Contact: support@measuremint.app

---

**Last Updated:** November 7, 2025  
**Status:** Ready to prepare screenshots for marketplace submission
