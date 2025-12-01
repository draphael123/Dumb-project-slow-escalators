'use client'

import { useState, useEffect, useRef } from 'react'

export default function DrearyMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume
    audio.loop = true

    // Try to autoplay (may be blocked by browser)
    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }
  }, [volume])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  return (
    <>
      {/* Dreary ambient music - using a free ambient sound */}
      {/* Using a longer dreary ambient track for background */}
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/11/17/audio_f6f1e7644e.mp3?filename=ambient-piano-127142.mp3"
        preload="auto"
      />
      
      {/* Music control button */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-lg">
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition mb-2"
            title={isPlaying ? 'Pause dreary music' : 'Play dreary music'}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
            <span className="text-sm">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => {
              const newVolume = parseFloat(e.target.value)
              setVolume(newVolume)
              if (audioRef.current) {
                audioRef.current.volume = newVolume
              }
            }}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gray-500"
          />
        </div>
      </div>
    </>
  )
}

