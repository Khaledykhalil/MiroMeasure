# Loom Multi-Language Video Integration Guide

This guide explains how to set up multiple language versions of your Loom videos and integrate them with MeasureMint.

## Overview

MeasureMint supports multiple language versions of demo videos. The system automatically loads the appropriate video based on the user's selected language.

## How It Works

1. **Video Configuration**: Video IDs are mapped to locales in `/src/config/loom-videos.js`
2. **Dynamic Loading**: The page automatically loads the correct video based on the current locale
3. **Fallback**: If a language-specific video doesn't exist, it falls back to the English video

## Setting Up Language-Specific Videos

### Option 1: Create Separate Videos (Recommended)

For the best user experience, create separate videos for each language:

1. **Record or Upload Videos**:
   - Record a new video in each target language
   - Or upload existing videos to Loom
   - Ensure the audio/narration matches the target language

2. **Get Video IDs**:
   - Open your video in Loom
   - Click "Share" to get the share URL
   - Extract the video ID from the URL: `https://loom.com/share/VIDEO_ID`
   - Example: `https://loom.com/share/3a2b1b94850946fa93a4db2961d2b62d` → Video ID is `3a2b1b94850946fa93a4db2961d2b62d`

3. **Update Configuration**:
   - Open `/src/config/loom-videos.js`
   - Add your video ID to the `LOOM_VIDEOS` object:
   ```javascript
   export const LOOM_VIDEOS = {
     en: '3a2b1b94850946fa93a4db2961d2b62d', // English
     de: 'your-german-video-id-here',        // German
     es: 'your-spanish-video-id-here',       // Spanish
     // ... etc
   }
   ```

### Option 2: Use Loom's Transcription Feature

Loom automatically generates transcriptions in 50+ languages. However, this requires the video audio to be in the target language.

1. **Enable Transcriptions**:
   - Open your video in Loom
   - Go to Settings → Transcriptions
   - Enable automatic transcriptions
   - Loom will detect the language from the audio

2. **Viewer Experience**:
   - Viewers can toggle subtitles in the Loom player
   - Subtitles appear automatically if the video audio matches their language preference

## Supported Languages

Current supported locales:
- English (en) - Default
- German (de)
- Spanish (es)
- French (fr)
- Portuguese - Brazil (pt-BR)
- Russian (ru)
- Dutch (nl)
- Swedish (sv)
- Arabic (ar)
- Japanese (ja)
- Mandarin Chinese (zh-CN)
- Cantonese (zh-HK)

## Adding a New Language Video

1. Create or upload your video to Loom
2. Get the video ID from the share URL
3. Update `/src/config/loom-videos.js`:
   ```javascript
   export const LOOM_VIDEOS = {
     // ... existing videos
     'new-locale': 'new-video-id-here',
   }
   ```
4. The video will automatically load when users select that language

## Best Practices

1. **Consistent Content**: Keep the same structure and flow across all language versions
2. **Quality**: Ensure audio quality is good for transcriptions
3. **Timing**: Keep similar timing across versions for easier maintenance
4. **Subtitles**: If using transcriptions, ensure accurate translations
5. **Testing**: Test each language version to ensure it loads correctly

## Technical Details

### Video Embedding

Videos are embedded using Loom's embed API:
```javascript
https://www.loom.com/embed/{VIDEO_ID}
```

### Dynamic Loading

The page component uses the `getLoomEmbedUrl()` function to get the correct video URL:
```javascript
import { getLoomEmbedUrl } from "@/config/loom-videos"

// In component
<iframe
  key={locale} // Force re-render when locale changes
  src={getLoomEmbedUrl(locale)}
  // ...
/>
```

### Fallback Behavior

If a locale doesn't have a specific video, the system automatically falls back to the English video:
```javascript
export function getLoomVideoId(locale) {
  return LOOM_VIDEOS[locale] || LOOM_VIDEOS.en
}
```

## Troubleshooting

### Video Not Loading
- Check that the video ID is correct in `loom-videos.js`
- Verify the video is public or accessible
- Check browser console for errors

### Wrong Video Showing
- Clear browser cache
- Verify the locale mapping in `loom-videos.js`
- Check that the `key={locale}` prop is set on the iframe

### Subtitles Not Appearing
- Ensure transcriptions are enabled in Loom
- Check that the video audio matches the target language
- Verify Loom player settings allow subtitle toggling

## Future Enhancements

Potential improvements:
- [ ] Support for multiple subtitle tracks per video
- [ ] Automatic subtitle language detection
- [ ] Custom subtitle styling
- [ ] Video analytics per language
- [ ] A/B testing different video versions

