// Library for managing daily Escaslow photos
// This can be extended to use a database, API, or file system

export interface EscaslowData {
  date: string
  imageUrl: string
  location?: string
  description?: string
}

// Using reliable image services for Escaslow photos
// Primary: Picsum Photos (very reliable, deterministic)
// Fallback: Direct URLs from reliable CDNs
const ESCASLOW_PHOTOS: EscaslowData[] = [
  {
    date: new Date().toISOString().split('T')[0],
    imageUrl: 'https://picsum.photos/seed/escaslow1/1200/900',
    location: 'Unknown Airport Terminal',
    description: 'A classic Escaslow in its natural habitat. Notice the passengers maintaining their zen-like patience.'
  },
  {
    date: '2025-01-15',
    imageUrl: 'https://picsum.photos/seed/escaslow2/1200/900',
    location: 'Shopping Mall',
    description: 'An escalator so slow, shoppers have time to contemplate life choices.'
  },
  {
    date: '2025-01-16',
    imageUrl: 'https://picsum.photos/seed/escaslow3/1200/900',
    location: 'Metro Station',
    description: 'Where time stands still, one step at a time.'
  },
  {
    date: '2025-01-17',
    imageUrl: 'https://picsum.photos/seed/escaslow4/1200/900',
    location: 'Business Center',
    description: 'The slowest way to reach the top floor. Literally.'
  },
  {
    date: '2025-01-18',
    imageUrl: 'https://picsum.photos/seed/escaslow5/1200/900',
    location: 'University Library',
    description: 'Moving at the speed of research.'
  },
  {
    date: '2025-01-19',
    imageUrl: 'https://picsum.photos/seed/escaslow6/1200/900',
    location: 'Convention Center',
    description: 'Where slow and steady wins the race.'
  },
  {
    date: '2025-01-20',
    imageUrl: 'https://picsum.photos/seed/escaslow7/1200/900',
    location: 'Hotel Lobby',
    description: 'Patience is a virtue, especially here.'
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
    
    // Use a fallback photo from our array or generate a deterministic one
    if (ESCASLOW_PHOTOS.length > 0) {
      photo = {
        ...ESCASLOW_PHOTOS[photoIndex],
        date: today,
      }
    } else {
      // Use Picsum Photos with a seed based on the date
      // This ensures the same photo appears each day
      const seed = `escaslow-${dateHash}`
      photo = {
        date: today,
        imageUrl: `https://picsum.photos/seed/${seed}/1200/900`,
        location: 'Mystery Location',
        description: 'Today\'s featured Escaslow. So slow, it might just be standing still.'
      }
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


