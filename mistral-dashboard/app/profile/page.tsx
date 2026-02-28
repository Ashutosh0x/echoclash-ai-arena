import Link from 'next/link';
import Card from '@/src/components/Card';
import Metric from '@/src/components/Metric';

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto py-8 flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wider">Player Profile</h1>
        <Link href="/" className="text-sm text-accent hover:text-white transition-colors">Back home</Link>
      </header>

      <Card>
        <h2 className="text-lg font-semibold mb-6">EchoHost</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Metric title="Wins" value={28} />
          <Metric title="Current ELO" value={1650} />
          <Metric title="Voice Commands Matched" value={947} />
        </div>
      </Card>
    </div>
  );
}
