# AI Voiceover Tools for Multilingual Videos

This document provides an overview of AI tools that can automatically generate voiceovers in multiple languages for your MeasureMint demo videos.

## Top Recommended Tools

### 1. **ElevenLabs** ⭐ (Most Popular)

**Best For:** High-quality, natural-sounding voices with voice cloning

**Features:**
- 29+ languages supported
- Voice cloning (clone your own voice in multiple languages)
- Natural-sounding AI voices
- API available for automation
- Multiple voice styles and emotions

**Supported Languages (Relevant to MeasureMint):**
- ✅ English, German, Spanish, French, Portuguese, Russian, Dutch, Swedish, Arabic, Japanese, Chinese (Mandarin & Cantonese)

**Pricing:**
- Free tier: 10,000 characters/month
- Starter: $5/month - 30,000 characters
- Creator: $22/month - 100,000 characters
- Pro: $99/month - 500,000 characters

**Website:** https://elevenlabs.io

**Pros:**
- Best quality voices
- Voice cloning feature
- API for automation
- Great for brand consistency

**Cons:**
- More expensive than alternatives
- Character limits

---

### 2. **Maestra** ⭐ (Best for Video Workflow)

**Best For:** Complete video localization workflow

**Features:**
- 125+ languages supported
- Automatic transcription + translation + voiceover
- Upload video directly
- Edit transcripts and sync voiceovers
- Export in multiple formats
- Subtitle generation

**Supported Languages:**
- ✅ All MeasureMint languages supported

**Pricing:**
- Free: 30 minutes/month
- Starter: $15/month - 120 minutes
- Pro: $39/month - 500 minutes
- Business: Custom pricing

**Website:** https://maestra.ai

**Pros:**
- Complete workflow (transcribe → translate → voiceover)
- Video upload directly
- Subtitle generation included
- Good value for money

**Cons:**
- Less voice customization than ElevenLabs
- Quality may vary by language

---

### 3. **Smartcat AI Speech Translate**

**Best For:** Large-scale multilingual projects

**Features:**
- 280+ languages supported
- AI-driven transcription and translation
- Multiple AI voice options
- Brand voice matching
- Cost-effective for bulk projects

**Supported Languages:**
- ✅ All MeasureMint languages + many more

**Pricing:**
- Contact for pricing (enterprise-focused)

**Website:** https://www.smartcat.com/ai-speech-translate/

**Pros:**
- Most languages supported
- Good for enterprise
- Cost-effective at scale

**Cons:**
- Less transparent pricing
- May require sales contact

---

### 4. **Visla**

**Best For:** Video creation with built-in voiceover

**Features:**
- Multiple languages supported
- Natural-sounding voices
- Pronunciation corrections
- Brand voice consistency
- Subtitle translation

**Supported Languages:**
- ✅ Multiple languages (check website for full list)

**Pricing:**
- Free tier available
- Paid plans start around $20/month

**Website:** https://www.visla.us/ai-voice-over

**Pros:**
- Video-focused platform
- Easy to use
- Good for quick projects

**Cons:**
- Less customization
- Fewer languages than competitors

---

### 5. **Speaktor**

**Best For:** Text-to-speech with multilingual support

**Features:**
- 50+ languages
- Natural-sounding voices
- Customizable download options
- Multiple audio formats

**Supported Languages:**
- ✅ Most MeasureMint languages

**Pricing:**
- Free tier available
- Paid plans vary

**Website:** https://speaktor.com/multilingual-voice-over/

**Pros:**
- Simple interface
- Good for basic needs
- Affordable

**Cons:**
- Fewer languages than others
- Less advanced features

---

## Recommended Workflow for MeasureMint

### Option 1: ElevenLabs (Best Quality)

1. **Script Preparation:**
   - Write your English demo script
   - Translate to all target languages
   - Prepare scripts for each language

2. **Voice Generation:**
   - Use ElevenLabs API or web interface
   - Generate voiceover for each language
   - Download audio files

3. **Video Production:**
   - Use video editing software (Premiere, Final Cut, DaVinci Resolve)
   - Replace audio track for each language version
   - Export separate videos for each language

4. **Upload to Loom:**
   - Upload each language version to Loom
   - Get video IDs
   - Update `/src/config/loom-videos.js`

### Option 2: Maestra (Easiest Workflow)

1. **Upload Original Video:**
   - Upload your English demo video to Maestra
   - Let Maestra transcribe automatically

2. **Translate & Generate:**
   - Maestra translates transcript
   - Generate AI voiceover in target language
   - Review and edit if needed

3. **Export:**
   - Export video with new voiceover
   - Upload to Loom
   - Update configuration

### Option 3: Hybrid Approach (Recommended)

1. **Use ElevenLabs for Voice:**
   - Generate high-quality voiceovers
   - Use voice cloning for brand consistency

2. **Use Maestra for Workflow:**
   - Use Maestra for transcription/translation
   - Import ElevenLabs audio into Maestra
   - Sync and export final videos

---

## Integration with MeasureMint

### API Integration Example (ElevenLabs)

```javascript
// Example: Generate voiceover for a script
const generateVoiceover = async (text, language, voiceId) => {
  const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/{voice_id}', {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': process.env.ELEVENLABS_API_KEY
    },
    body: JSON.stringify({
      text: text,
      model_id: 'eleven_multilingual_v2', // Supports 29 languages
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75
      }
    })
  })
  
  return response.blob() // Audio file
}
```

### Language Mapping

```javascript
const LANGUAGE_VOICE_MAP = {
  'en': 'voice-id-english',
  'de': 'voice-id-german',
  'es': 'voice-id-spanish',
  'fr': 'voice-id-french',
  'pt-BR': 'voice-id-portuguese',
  'ru': 'voice-id-russian',
  'nl': 'voice-id-dutch',
  'sv': 'voice-id-swedish',
  'ar': 'voice-id-arabic',
  'ja': 'voice-id-japanese',
  'zh-CN': 'voice-id-mandarin',
  'zh-HK': 'voice-id-cantonese',
}
```

---

## Cost Estimation

### For 12 Languages (MeasureMint):

**ElevenLabs:**
- Script length: ~500 words per language = ~2,500 characters
- Total: 12 × 2,500 = 30,000 characters
- Cost: $5-22/month (depending on plan)
- One-time generation: ~$5-10

**Maestra:**
- Video length: ~5 minutes per language
- Total: 12 × 5 = 60 minutes
- Cost: $15-39/month
- One-time: ~$20-40

**Smartcat:**
- Contact for pricing
- Likely $50-200/month for enterprise

---

## Best Practices

1. **Script Consistency:**
   - Keep scripts similar across languages
   - Maintain same timing/pacing
   - Use professional translators

2. **Voice Selection:**
   - Use same voice style across languages
   - Consider voice cloning for brand consistency
   - Test voices with native speakers

3. **Quality Control:**
   - Review all voiceovers
   - Check pronunciation
   - Ensure natural flow

4. **Video Sync:**
   - Ensure audio matches video timing
   - Adjust video speed if needed
   - Maintain visual consistency

5. **Testing:**
   - Test with native speakers
   - Get feedback on naturalness
   - Iterate based on feedback

---

## Quick Start Guide

### Using ElevenLabs (Recommended):

1. **Sign up:** https://elevenlabs.io
2. **Get API key:** Dashboard → Profile → API Key
3. **Choose voices:** Browse voice library or clone your voice
4. **Generate audio:** Use API or web interface
5. **Download:** Get MP3 files for each language
6. **Edit video:** Replace audio tracks in video editor
7. **Upload to Loom:** Create separate videos for each language

### Using Maestra (Easiest):

1. **Sign up:** https://maestra.ai
2. **Upload video:** Upload your English demo
3. **Select languages:** Choose all target languages
4. **Generate:** Let Maestra handle transcription, translation, and voiceover
5. **Review:** Edit transcripts and voiceovers as needed
6. **Export:** Download videos for each language
7. **Upload to Loom:** Upload each language version

---

## Next Steps

1. **Choose a tool** based on your needs:
   - Quality-focused → ElevenLabs
   - Workflow-focused → Maestra
   - Budget-focused → Speaktor or Visla

2. **Create test video** in 1-2 languages first

3. **Get feedback** from native speakers

4. **Scale up** to all 12 languages

5. **Update configuration** in `/src/config/loom-videos.js` with new video IDs

---

## Additional Resources

- **ElevenLabs Documentation:** https://elevenlabs.io/docs
- **Maestra Help Center:** https://maestra.ai/help
- **Video Editing Tools:** Premiere Pro, Final Cut Pro, DaVinci Resolve
- **Translation Services:** DeepL, Google Translate (for initial drafts)

---

## Support

For questions about integrating AI voiceovers with MeasureMint:
- Check tool documentation
- Test with small samples first
- Consider professional review for final versions

