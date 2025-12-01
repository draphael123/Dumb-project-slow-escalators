import { NextResponse } from 'next/server'
import { getDailyEscaslow } from '@/lib/escaslow'

/**
 * API route to get today's Escaslow photo
 * GET /api/daily
 */
export async function GET() {
  try {
    const escaslow = await getDailyEscaslow()
    return NextResponse.json(escaslow, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error fetching daily Escaslow:', error)
    return NextResponse.json(
      { error: 'Failed to fetch daily Escaslow' },
      { status: 500 }
    )
  }
}


