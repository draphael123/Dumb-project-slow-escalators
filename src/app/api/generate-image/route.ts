import { NextRequest, NextResponse } from 'next/server'

/**
 * API route to generate AI images of slow escalators using Pollinations.ai (FREE, no API key required!)
 * GET /api/generate-image?seed=YOUR_SEED
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const seed = searchParams.get('seed') || 'escaslow'
    
    // Convert seed to number for deterministic generation
    const seedNumber = seedToNumber(seed)
    
    // Pollinations.ai free API - no API key required!
    // Using Stable Diffusion with a dreary, depressing prompt for slow escalators
    const prompt = encodeURIComponent(
      'A slow, dreary escalator in a dimly lit, abandoned building, empty desolate scene, people waiting with expressions of despair and exhaustion, muted colors, dark shadows, gloomy atmosphere, depressing mood, grayscale tones, weathered walls, flickering fluorescent lights, melancholic, somber, bleak, dismal, sad, desolate, monochrome, low saturation, dark moody lighting, cinematic, photorealistic, high quality, 4k'
    )
    
    const negativePrompt = encodeURIComponent(
      'bright, cheerful, happy, colorful, vibrant, energetic, fast movement, clean modern, well-lit, optimistic, joyful, colorful, sunny, warm lighting'
    )
    
    // Pollinations.ai API endpoint
    // seed ensures same image for same date, width/height for aspect ratio
    const imageUrl = `https://image.pollinations.ai/prompt/${prompt}?negative=${negativePrompt}&seed=${seedNumber}&width=1024&height=768&nologo=true&enhance=true`
    
    // Return the image URL (Pollinations generates on-demand)
    return NextResponse.json({
      imageUrl,
      seed,
      seedNumber,
      generatedAt: new Date().toISOString(),
      service: 'pollinations.ai',
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      },
    })

  } catch (error: any) {
    console.error('Error generating image:', error)
    
    // Return fallback to Picsum Photos
    const seed = request.nextUrl.searchParams.get('seed') || 'escaslow'
    return NextResponse.json({
      error: error.message || 'Failed to generate image',
      fallbackUrl: `https://picsum.photos/seed/${seed}/1200/900`,
      imageUrl: `https://picsum.photos/seed/${seed}/1200/900`,
    }, { status: 500 })
  }
}

/**
 * Convert seed string to number for Stable Diffusion
 */
function seedToNumber(seed: string): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash) % 2147483647
}

