import Link from 'next/link';
import Card from '@/src/components/Card';
import Table, { TableCell, TableHead, TableHeader, TableRow } from '@/src/components/Table';
import { leaderboardEntries } from '@/src/data/leaderboard';

export default function LeaderboardPage() {
  const rows = [...leaderboardEntries].sort((a, b) => b.elo - a.elo);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-wider">Global Leaderboard</h1>
          <p className="text-secondary text-sm mt-1">Snapshot only. Persist in Postgres/Redis for production.</p>
        </div>
        <Link href="/" className="text-sm text-accent hover:text-white transition-colors">Back home</Link>
      </header>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHead>
            <tr>
              <TableHeader>#</TableHeader>
              <TableHeader>Player</TableHeader>
              <TableHeader>Wins</TableHeader>
              <TableHeader>ELO</TableHeader>
              <TableHeader>NPC Adaptation</TableHeader>
            </tr>
          </TableHead>
          <tbody>
            {rows.map((entry, index) => (
              <TableRow key={entry.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{entry.playerName}</TableCell>
                <TableCell>{entry.wins}</TableCell>
                <TableCell>{entry.elo}</TableCell>
                <TableCell>{entry.npcAdaptationScore}%</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
