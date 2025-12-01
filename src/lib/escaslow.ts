// Library for managing daily Escaslow photos
// This can be extended to use a database, API, or file system

export interface EscaslowData {
  date: string
  imageUrl: string
  location?: string
  description?: string
}

// For now, using a seed based on the current date
// In production, you'd want to use a database or API
const ESCASLOW_PHOTOS: EscaslowData[] = [
  {
    date: new Date().toISOString().split('T')[0],
    imageUrl: 'https://images.unsplash.com/photo-1544966503-7d3b2a212bb2?w=1200&q=80',
    location: 'Unknown Airport Terminal',
    description: 'A classic Escaslow in its natural habitat. Notice the passengers maintaining their zen-like patience.'
  },
  // Add more photos here or connect to a database/API
]

/**
 * Get today's Escaslow photo
 * Uses the current date to ensure consistency across the day
 */
export async function getDailyEscaslow(): Promise<EscaslowData> {
  const today = new Date().toISOString().split('T')[0]
  
  // Find photo for today, or use a default based on date hash
  let photo = ESCASLOW_PHOTOS.find(p => p.date === today)
  
  if (!photo) {
    // Generate a deterministic photo based on the date
    // This ensures the same photo is shown all day
    const dateHash = hashString(today)
    const photoIndex = dateHash % ESCASLOW_PHOTOS.length
    
    // For demo: use placeholder or rotate through available photos
    photo = {
      date: today,
      imageUrl: `https://source.unsplash.com/1200x900/?escalator,slow?sig=${dateHash}`,
      location: 'Mystery Location',
      description: 'Today\'s featured Escaslow. So slow, it might just be standing still.'
    }
  }
  
  return photo
}

/**
 * Simple hash function for deterministic date-based selection
 */
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

/**
 * Get all available Escaslow photos (for future gallery feature)
 */
export async function getAllEscaslows(): Promise<EscaslowData[]> {
  return ESCASLOW_PHOTOS
}


