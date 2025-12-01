import Image from 'next/image'
import { getDailyEscaslow } from '@/lib/escaslow'
import EscaslowDisplay from '@/components/EscaslowDisplay'

export default async function Home() {
  const escaslow = await getDailyEscaslow()

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 neon-text">
            ESCASLOW:
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-yellow-400 font-semibold">
            The Slowest Escalators in the World
          </p>
          <p className="text-sm md:text-base text-gray-400 mt-4">
            A daily photo gallery celebrating the art of taking it slow
          </p>
        </header>

        {/* Daily Photo Display */}
        <EscaslowDisplay escaslow={escaslow} />

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>New slow escalator every day. Very slowly updated.</p>
        </footer>
      </div>
    </main>
  )
}


