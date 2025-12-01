'use client'

import { useState, useEffect, useRef } from 'react'

export default function DrearyMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume
    audio.loop = true

    // Handle audio loading
    const handleCanPlay = () => {
      setAudioError(false)
    }

    const handleError = () => {
      console.error('Audio failed to load')
      setAudioError(true)
    }

    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)

    // Try to autoplay after user interaction
    if (hasInteracted) {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
            setAudioError(false)
          })
          .catch((err) => {
            console.error('Autoplay failed:', err)
            setIsPlaying(false)
          })
      }
    }

    return () => {
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('error', handleError)
    }
  }, [volume, hasInteracted])

  // Enable interaction on any user click
  useEffect(() => {
    const enableAudio = () => {
      setHasInteracted(true)
    }
    
    // Listen for any user interaction
    document.addEventListener('click', enableAudio, { once: true })
    document.addEventListener('touchstart', enableAudio, { once: true })
    
    return () => {
      document.removeEventListener('click', enableAudio)
      document.removeEventListener('touchstart', enableAudio)
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    setHasInteracted(true)

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      try {
        await audio.play()
        setIsPlaying(true)
        setAudioError(false)
      } catch (error) {
        console.error('Failed to play audio:', error)
        setAudioError(true)
        setIsPlaying(false)
      }
    }
  }

  // Multiple fallback audio sources for reliability
  const audioSources = [
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
  ]

  return (
    <>
      {/* Dreary ambient music - using multiple fallback sources */}
      <audio
        ref={audioRef}
        preload="auto"
        crossOrigin="anonymous"
      >
        <source src={audioSources[0]} type="audio/mpeg" />
        <source src={audioSources[1]} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      {/* Music control button */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-lg min-w-[120px]">
          {audioError ? (
            <div className="text-xs text-red-400 mb-2">
              Audio unavailable
            </div>
          ) : null}
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition mb-2 w-full"
            title={isPlaying ? 'Pause dreary music' : 'Play dreary music'}
          >
            {isPlaying ? (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Pause</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Play</span>
              </>
            )}
          </button>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-4.617a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
            </svg>
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
              className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-gray-500"
            />
          </div>
        </div>
      </div>
    </>
  )
}

