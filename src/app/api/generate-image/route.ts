import { NextRequest, NextResponse } from 'next/server'
import Replicate from 'replicate'

/**
 * API route to generate AI images of slow escalators using Replicate (Stable Diffusion)
 * GET /api/generate-image?seed=YOUR_SEED
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const seed = searchParams.get('seed') || 'escaslow'
    
    // Check if REPLICATE_API_TOKEN is set
    const apiToken = process.env.REPLICATE_API_TOKEN
    
    if (!apiToken) {
      return NextResponse.json(
        { 
          error: 'REPLICATE_API_TOKEN not configured. Please add it to your Vercel environment variables.',
          fallbackUrl: `https://picsum.photos/seed/${seed}/1200/900`
        },
        { status: 500 }
      )
    }

    const replicate = new Replicate({
      auth: apiToken,
    })

    // Generate image using Stable Diffusion XL
    // Prompt specifically for slow escalators
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: `A slow escalator in a modern building, crowded with patient people waiting, architectural photography, dramatic lighting, detailed, photorealistic, high quality, 4k`,
          negative_prompt: `blurry, low quality, distorted, ugly, deformed, bad anatomy, extra limbs`,
          width: 1024,
          height: 768,
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 25,
          seed: seedToNumber(seed),
        }
      }
    ) as string[]

    const imageUrl = Array.isArray(output) ? output[0] : output

    if (!imageUrl) {
      throw new Error('No image URL returned from Replicate')
    }

    // Cache the result - return the URL
    return NextResponse.json({
      imageUrl,
      seed,
      generatedAt: new Date().toISOString(),
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

