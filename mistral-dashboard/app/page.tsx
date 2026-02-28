import Link from 'next/link';
import { Trophy, User, Play, Video } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="flex justify-between items-center py-6 border-b border-border mb-16">
        <h1 className="text-xl font-bold tracking-wider">ECHOCLASH</h1>
        <nav className="flex gap-6 items-center">
          <Link href="/leaderboard" className="flex items-center gap-2 text-secondary hover:text-primary transition-colors text-sm font-medium">
            <Trophy className="h-4 w-4" /> Leaderboard
          </Link>
          <Link href="/profile" className="flex items-center gap-2 text-secondary hover:text-primary transition-colors text-sm font-medium">
            <User className="h-4 w-4" /> Profile
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center pb-20">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Voice-Controlled<br />
          <span className="text-accent">AI Battle Arena</span>
        </h2>

        <p className="text-secondary text-lg mb-10 max-w-lg">
          Adaptive NPCs. Infinite strategy. Speak your actions into reality.
        </p>

        <div className="flex gap-4">
          <Link href="/play" className="flex items-center gap-2 bg-accent hover:bg-accent/80 transition-colors px-6 py-3 rounded-[8px] font-medium text-white shadow-lg shadow-accent/20">
            <Play className="h-5 w-5 fill-current" />
            Play Now
          </Link>
          <Link href="/demo" className="flex items-center gap-2 bg-card border border-border hover:bg-hover transition-colors px-6 py-3 rounded-[8px] font-medium text-primary">
            <Video className="h-5 w-5" />
            Watch Demo
          </Link>
        </div>
      </main>

      {/* Footer / Sub-info */}
      <footer className="text-center py-8 text-secondary text-sm border-t border-border">
        <p className="mb-2 uppercase tracking-widest text-[10px] font-bold">Why EchoClash Works</p>
        <p className="font-mono text-xs opacity-50">Voxtral + Mistral + ElevenLabs + Next.js</p>
      </footer>
    </div>
  );
}
