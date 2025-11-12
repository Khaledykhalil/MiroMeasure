/**
 * Loom Video Configuration
 * 
 * Maps locales to Loom video IDs for multi-language support.
 * 
 * To add a new language video:
 * 1. Record or upload the video to Loom
 * 2. Get the video ID from the Loom share URL (e.g., https://loom.com/share/VIDEO_ID)
 * 3. Add the mapping below
 * 
 * If a locale doesn't have a specific video, it will fall back to the English video.
 */

export const LOOM_VIDEOS = {
  // Default English video
  en: '3a2b1b94850946fa93a4db2961d2b62d',
  
  // Add language-specific videos here as you create them
  // Example:
  // de: 'your-german-video-id-here',
  // es: 'your-spanish-video-id-here',
  // fr: 'your-french-video-id-here',
  // etc.
  
  // For now, all languages use the English video
  // You can add specific video IDs as you create them
  'pt-BR': '3a2b1b94850946fa93a4db2961d2b62d', // Using English for now
  ru: '3a2b1b94850946fa93a4db2961d2b62d',
  es: '3a2b1b94850946fa93a4db2961d2b62d',
  de: '3a2b1b94850946fa93a4db2961d2b62d',
  nl: '3a2b1b94850946fa93a4db2961d2b62d',
  sv: '3a2b1b94850946fa93a4db2961d2b62d',
  fr: '3a2b1b94850946fa93a4db2961d2b62d',
  it: '3a2b1b94850946fa93a4db2961d2b62d',
  ar: '3a2b1b94850946fa93a4db2961d2b62d',
  ja: '3a2b1b94850946fa93a4db2961d2b62d',
  'zh-CN': '3a2b1b94850946fa93a4db2961d2b62d',
  'zh-HK': '3a2b1b94850946fa93a4db2961d2b62d',
}

/**
 * Get Loom video ID for a given locale
 * Falls back to English if locale not found
 */
export function getLoomVideoId(locale) {
  return LOOM_VIDEOS[locale] || LOOM_VIDEOS.en
}

/**
 * Get Loom embed URL for a given locale
 */
export function getLoomEmbedUrl(locale) {
  const videoId = getLoomVideoId(locale)
  return `https://www.loom.com/embed/${videoId}`
}

/**
 * Get Loom share URL for a given locale
 */
export function getLoomShareUrl(locale, timestamp = null) {
  const videoId = getLoomVideoId(locale)
  const baseUrl = `https://loom.com/share/${videoId}`
  return timestamp ? `${baseUrl}?t=${timestamp}` : baseUrl
}

/**
 * Loom supports automatic transcriptions in 50+ languages.
 * The transcription language is determined by the video's audio language.
 * 
 * To enable subtitles:
 * 1. Ensure your Loom video has transcriptions enabled
 * 2. Loom will automatically generate transcriptions based on the audio
 * 3. Viewers can toggle subtitles in the Loom player
 * 
 * For multiple language videos:
 * - Create separate videos for each language (recommended for best quality)
 * - Or use Loom's transcription feature and translate manually
 */

