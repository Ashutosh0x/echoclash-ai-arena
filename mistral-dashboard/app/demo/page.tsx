import Link from 'next/link';
import Card from '@/src/components/Card';

export default function DemoPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-wider">Demo</h1>
        <Link href="/" className="text-sm text-accent hover:text-white transition-colors">Back home</Link>
      </header>

      <Card>
        <p className="text-secondary text-sm leading-6">
          Demo video route placeholder. In production, embed a recorded game session and stream telemetry from
          the real-time backend for replay sync.
        </p>
      </Card>
    </div>
  );
}
