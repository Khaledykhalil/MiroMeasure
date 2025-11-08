#!/bin/bash

# MeasureMint Screenshot Resize Script
# Resizes screenshots to Miro Marketplace requirements (1258x706px)
# Date: November 7, 2025

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   MeasureMint Screenshot Resize Tool      ║${NC}"
echo -e "${BLUE}║   Target: 1258x706px for Miro Marketplace ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
echo ""

# Check if sips is available (Mac built-in)
if command -v sips &> /dev/null; then
    echo -e "${GREEN}✓${NC} Using sips (Mac built-in image tool)"
    USE_SIPS=true
elif command -v convert &> /dev/null; then
    echo -e "${GREEN}✓${NC} Using ImageMagick convert"
    USE_SIPS=false
else
    echo -e "${YELLOW}⚠${NC}  No image processing tool found."
    echo "Please install ImageMagick: brew install imagemagick"
    exit 1
fi

# Create output directory
OUTPUT_DIR="assets/marketplace/screenshots"
mkdir -p "$OUTPUT_DIR"

# Function to resize with sips (Mac)
resize_with_sips() {
    local input="$1"
    local output="$2"
    sips -z 706 1258 "$input" --out "$output" > /dev/null 2>&1
}

# Function to resize with ImageMagick
resize_with_imagemagick() {
    local input="$1"
    local output="$2"
    convert "$input" -resize 1258x706! -quality 95 "$output"
}

# Process images
echo ""
echo "Looking for screenshot images..."
echo ""

# Counter
count=0

# Process each PNG file in current directory
for file in *.png; do
    if [ -f "$file" ]; then
        # Generate output filename
        filename=$(basename "$file" .png)
        output="$OUTPUT_DIR/${filename}_1258x706.png"
        
        echo -e "Processing: ${BLUE}$file${NC}"
        
        if [ "$USE_SIPS" = true ]; then
            resize_with_sips "$file" "$output"
        else
            resize_with_imagemagick "$file" "$output"
        fi
        
        if [ -f "$output" ]; then
            # Get file size
            size=$(du -h "$output" | cut -f1)
            echo -e "  ${GREEN}✓${NC} Saved: $output (${size})"
            ((count++))
        else
            echo -e "  ${YELLOW}✗${NC} Failed to create: $output"
        fi
        echo ""
    fi
done

# Summary
echo -e "${GREEN}╔════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║           Resize Complete!                 ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════╝${NC}"
echo ""
echo -e "Processed: ${GREEN}$count${NC} screenshot(s)"
echo -e "Output directory: ${BLUE}$OUTPUT_DIR${NC}"
echo ""
echo "Next steps:"
echo "1. Review resized screenshots in $OUTPUT_DIR"
echo "2. Rename files to marketplace format (01-hero.png, 02-calibration.png, etc.)"
echo "3. Verify dimensions: 1258x706px"
echo "4. Check file sizes (should be under 2MB each)"
echo ""
echo -e "${GREEN}Ready for marketplace submission! 🚀${NC}"
