'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Card from '@/src/components/Card';

const achievements = [
  { title: 'First Blood', desc: 'Win your first battle.', unlocked: '2026-01-04' },
  { title: 'Voice Master', desc: 'Reach 95%+ command accuracy.', unlocked: '2026-01-16' },
  { title: 'Adaptive Slayer', desc: 'Defeat adaptive mode boss.', unlocked: '2026-02-02' },
  { title: 'No-Death Victory', desc: 'Win a match without damage.', unlocked: '2026-02-08' },
  { title: 'AI Tactician', desc: 'Maintain 10-win streak.', unlocked: '2026-02-14' },
  { title: 'Speed Runner', desc: 'Win in under 90 seconds.', unlocked: '2026-02-18' },
];

const matchHistory = [
  { date: '2026-02-27', opponent: 'Grimhowl', result: 'Win', damage: 1620, turns: 9, replayId: 'rpl_901' },
  { date: '2026-02-26', opponent: 'Shard Drake', result: 'Win', damage: 1192, turns: 7, replayId: 'rpl_873' },
  { date: '2026-02-25', opponent: 'Iron Warden', result: 'Loss', damage: 932, turns: 11, replayId: 'rpl_859' },
  { date: '2026-02-24', opponent: 'Hexblade', result: 'Win', damage: 1428, turns: 8, replayId: 'rpl_841' },
];

const stats = [
  { label: 'Matches', value: 132 },
  { label: 'Wins', value: 87 },
  { label: 'Win Rate', value: '65.9%' },
  { label: 'Damage Dealt', value: '149,220' },
  { label: 'Accuracy', value: '93.4%' },
  { label: 'Avg Turns', value: 8.4 },
  { label: 'Fastest Win', value: '1m 18s' },
  { label: 'Voice Commands', value: '4,912' },
];

const profileDefaults = {
  displayName: 'Ashutosh Singh',
  username: 'ash_0x',
  bio: 'Voice-first strategist building adaptive AI arenas.',
  location: 'India',
  pronouns: 'He / Him',
  voicePersona: 'Dramatic AI',
  github: 'https://github.com/Ashutosh0x',
  linkedin: 'https://linkedin.com',
  twitter: 'https://x.com',
  website: 'https://echoclash.ai',
  publicProfile: true,
  showStats: true,
  showHistory: true,
};

export default function ProfilePage() {
  const [isEditMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(profileDefaults);
  const joined = useMemo(() => new Date('2025-11-14').toLocaleDateString(), []);

  return (
    <div className="max-w-6xl mx-auto py-8 flex flex-col gap-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-wider">Profile</h1>
        <div className="flex items-center gap-3 text-sm">
          <button
            onClick={() => setEditMode((prev) => !prev)}
            className="px-4 py-2 rounded-[8px] border border-border hover:bg-hover transition-colors"
          >
            {isEditMode ? 'Cancel Edit' : 'Edit Profile'}
          </button>
          <Link href="/settings" className="px-4 py-2 rounded-[8px] bg-accent hover:bg-accent/80 transition-colors">
            Settings
          </Link>
        </div>
      </header>

      <Card className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="relative">
          <div className="h-28 w-28 rounded-full border border-border bg-hover flex items-center justify-center text-2xl font-semibold ring-2 ring-accent/40">
            AS
          </div>
          {isEditMode && (
            <button className="absolute bottom-0 right-0 text-xs px-2 py-1 rounded-[8px] bg-card border border-border hover:bg-hover">
              Change Avatar
            </button>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <h2 className="text-xl font-semibold">{profile.displayName}</h2>
          <p className="text-secondary">@{profile.username}</p>
          <p className="text-sm text-secondary">{profile.bio}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-sm">
            <p><span className="text-secondary">Rank:</span> Gold II</p>
            <p><span className="text-secondary">ELO:</span> <span className="metric">1840</span></p>
            <p><span className="text-secondary">Level:</span> 37</p>
            <p><span className="text-secondary">Joined:</span> {joined}</p>
            <p><span className="text-secondary">Location:</span> {profile.location}</p>
            <p><span className="text-secondary">Pronouns:</span> {profile.pronouns}</p>
            <p><span className="text-secondary">Voice Persona:</span> {profile.voicePersona}</p>
            <p><span className="text-secondary">NPC Trust:</span> 82</p>
          </div>
        </div>
      </Card>

      {isEditMode && (
        <Card className="space-y-4">
          <h3 className="text-lg font-semibold">Edit Profile</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              ['Display Name', 'displayName'],
              ['Username', 'username'],
              ['Bio', 'bio'],
              ['Location', 'location'],
              ['Pronouns', 'pronouns'],
              ['Voice Persona', 'voicePersona'],
              ['GitHub', 'github'],
              ['LinkedIn', 'linkedin'],
              ['Twitter', 'twitter'],
              ['Website', 'website'],
            ].map(([label, key]) => (
              <label key={key} className="text-sm space-y-2 flex flex-col">
                <span className="text-secondary">{label}</span>
                <input
                  value={profile[key as keyof typeof profile] as string}
                  onChange={(e) => setProfile((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="bg-bg border border-border rounded-[8px] px-3 py-2"
                />
              </label>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={profile.publicProfile}
                onChange={(e) => setProfile((prev) => ({ ...prev, publicProfile: e.target.checked }))}
              />
              Public profile
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={profile.showStats}
                onChange={(e) => setProfile((prev) => ({ ...prev, showStats: e.target.checked }))}
              />
              Show stats
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={profile.showHistory}
                onChange={(e) => setProfile((prev) => ({ ...prev, showHistory: e.target.checked }))}
              />
              Show match history
            </label>
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-2 rounded-[8px] bg-accent hover:bg-accent/80">Save Profile</button>
          </div>
        </Card>
      )}

      {profile.showStats && (
        <Card>
          <h3 className="text-lg font-semibold mb-4">Stats Overview</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((item) => (
              <div key={item.label} className="border border-border rounded-[8px] p-4">
                <p className="text-secondary text-sm">{item.label}</p>
                <p className="metric text-2xl">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <h3 className="text-lg font-semibold mb-4">Achievements</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {achievements.map((badge) => (
            <div key={badge.title} className="border border-border rounded-[8px] p-4 hover:bg-hover transition-colors">
              <p className="font-medium">{badge.title}</p>
              <p className="text-sm text-secondary">{badge.desc}</p>
              <p className="text-xs text-secondary mt-2">Unlocked: {badge.unlocked}</p>
            </div>
          ))}
        </div>
      </Card>

      {profile.showHistory && (
        <Card>
          <h3 className="text-lg font-semibold mb-4">Match History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-secondary border-b border-border">
                <tr>
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Opponent</th>
                  <th className="text-left py-2">Result</th>
                  <th className="text-left py-2">Damage</th>
                  <th className="text-left py-2">Turns</th>
                  <th className="text-left py-2">Replay</th>
                </tr>
              </thead>
              <tbody>
                {matchHistory.map((row) => (
                  <tr key={row.replayId} className="border-b border-border/70">
                    <td className="py-2">{row.date}</td>
                    <td className="py-2">{row.opponent}</td>
                    <td className={`py-2 ${row.result === 'Win' ? 'text-green-400' : 'text-red-400'}`}>{row.result}</td>
                    <td className="py-2 metric">{row.damage}</td>
                    <td className="py-2 metric">{row.turns}</td>
                    <td className="py-2"><Link href={`/play/${row.replayId}`} className="text-accent">View</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Card>
        <h3 className="text-lg font-semibold mb-4">Voice Profile & Reputation</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="border border-border rounded-[8px] p-4 space-y-2">
            <p><span className="text-secondary">Preferred TTS Voice:</span> ElevenLabs / Dramatic Narrator</p>
            <p><span className="text-secondary">Capture Mode:</span> Hold-to-talk</p>
            <p><span className="text-secondary">Avg Response Time:</span> <span className="metric">420ms</span></p>
            <p><span className="text-secondary">Voice Accuracy:</span> <span className="metric">93.4%</span></p>
            <p><span className="text-secondary">Most Used Command:</span> Flame Arc</p>
          </div>
          <div className="border border-border rounded-[8px] p-4 space-y-2">
            <p><span className="text-secondary">NPC Trust Score:</span> <span className="metric">82/100</span></p>
            <p><span className="text-secondary">Most Feared By:</span> Goblin Clans</p>
            <p><span className="text-secondary">Known As:</span> “Flame Caller”</p>
            <p><span className="text-secondary">Last Remembered Action:</span> Spared an ally NPC at low HP.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
