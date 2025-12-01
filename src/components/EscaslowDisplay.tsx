'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface EscaslowData {
  date: string
  imageUrl: string
  location?: string
  description?: string
}

interface EscaslowDisplayProps {
  escaslow: EscaslowData
}

export default function EscaslowDisplay({ escaslow }: EscaslowDisplayProps) {
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const [imageSrc, setImageSrc] = useState(escaslow.imageUrl)

  useEffect(() => {
    // Reset when escaslow changes
    setLoading(true)
    setImageError(false)
    setImageSrc(escaslow.imageUrl)
    // Simulate slow loading (very fitting for Escaslow!)
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [escaslow])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-10 border border-yellow-500/20 shadow-2xl slow-pulse">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">
          Today&apos;s Escaslow
        </h2>
        <p className="text-gray-400">{formatDate(escaslow.date)}</p>
      </div>

      {loading ? (
        <div className="aspect-[4/3] bg-gray-700/50 rounded-xl flex items-center justify-center">
          <div className="text-gray-500 text-lg">Loading very slowly...</div>
        </div>
      ) : imageError ? (
        <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center border-4 border-yellow-500/30 shadow-lg">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🐌</div>
            <p className="text-gray-400 text-lg">This Escaslow is moving so slowly,</p>
            <p className="text-gray-400 text-lg">the image hasn&apos;t arrived yet!</p>
            <button
              onClick={() => {
                setImageError(false)
                setImageSrc(escaslow.imageUrl + '&t=' + Date.now())
              }}
              className="mt-4 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 hover:bg-yellow-500/30 transition"
            >
              Try Loading Again
            </button>
          </div>
        </div>
      ) : (
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-4 border-yellow-500/30 shadow-lg">
          <Image
            src={imageSrc}
            alt={escaslow.description || 'Daily Escaslow photo'}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            onError={(e) => {
              console.error('Image failed to load:', imageSrc)
              setImageError(true)
              setLoading(false)
            }}
            onLoad={() => {
              setLoading(false)
              setImageError(false)
            }}
            unoptimized={false}
          />
        </div>
      )}

      {(escaslow.location || escaslow.description) && (
        <div className="mt-6 space-y-2">
          {escaslow.location && (
            <p className="text-lg text-gray-300">
              <span className="text-yellow-400 font-semibold">Location:</span>{' '}
              {escaslow.location}
            </p>
          )}
          {escaslow.description && (
            <p className="text-gray-400 italic">{escaslow.description}</p>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <p className="text-yellow-300 text-sm md:text-base text-center">
          ⚠️ This escalator is moving very slowly. Please be patient.
        </p>
      </div>
    </div>
  )
}


