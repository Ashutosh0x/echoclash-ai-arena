'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Card from '@/src/components/Card';

const navItems = [
  'Profile',
  'Account',
  'Voice & Audio',
  'Game Preferences',
  'Privacy & Replays',
  'Integrations & API',
  'Appearance & Accessibility',
  'Notifications',
  'Advanced / Developer',
  'Support & Legal',
] as const;

type ApiKeyItem = {
  id: string;
  name: string;
  permissions: 'full' | 'read-only' | 'webhook';
  createdAt: string;
  lastUsedAt: string;
  usage: number;
  preview: string;
};

const initialKeys: ApiKeyItem[] = [
  {
    id: 'key_01',
    name: 'CLI Key',
    permissions: 'full',
    createdAt: '2d ago',
    lastUsedAt: '1h ago',
    usage: 234,
    preview: 'ek_live_4f8a9c...2a1f',
  },
  {
    id: 'key_02',
    name: 'Replay Worker',
    permissions: 'webhook',
    createdAt: '11d ago',
    lastUsedAt: '8h ago',
    usage: 98,
    preview: 'ek_live_90bc31...b5ee',
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<(typeof navItems)[number]>('Profile');
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>(initialKeys);
  const [createdSecret, setCreatedSecret] = useState<string | null>(null);

  const panel = useMemo(() => {
    if (activeSection === 'Integrations & API') {
      return (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">API Keys</h2>
                <p className="text-sm text-secondary">Generate, rotate, and revoke keys for automation and integrations.</p>
              </div>
              <button
                onClick={() => {
                  const keyId = `key_${Date.now()}`;
                  const secret = `ek_live_${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`;
                  setApiKeys((prev) => [
                    {
                      id: keyId,
                      name: `New Key ${prev.length + 1}`,
                      permissions: 'read-only',
                      createdAt: 'just now',
                      lastUsedAt: 'never',
                      usage: 0,
                      preview: `${secret.slice(0, 14)}...${secret.slice(-4)}`,
                    },
                    ...prev,
                  ]);
                  setCreatedSecret(secret);
                }}
                className="px-4 py-2 rounded-[8px] bg-accent hover:bg-accent/80"
              >
                + Create API Key
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border text-secondary">
                  <tr>
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Permissions</th>
                    <th className="text-left py-2">Created</th>
                    <th className="text-left py-2">Last Used</th>
                    <th className="text-left py-2">Usage</th>
                    <th className="text-left py-2">Key</th>
                    <th className="text-left py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.map((key) => (
                    <tr key={key.id} className="border-b border-border/80">
                      <td className="py-2">{key.name}</td>
                      <td className="py-2 capitalize">{key.permissions}</td>
                      <td className="py-2">{key.createdAt}</td>
                      <td className="py-2">{key.lastUsedAt}</td>
                      <td className="py-2 metric">{key.usage} calls</td>
                      <td className="py-2 font-mono text-xs">{key.preview}</td>
                      <td className="py-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              const rotated = `ek_live_${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`;
                              setApiKeys((prev) =>
                                prev.map((item) =>
                                  item.id === key.id
                                    ? { ...item, createdAt: 'just now', preview: `${rotated.slice(0, 14)}...${rotated.slice(-4)}` }
                                    : item,
                                ),
                              );
                              setCreatedSecret(rotated);
                            }}
                            className="px-2 py-1 rounded-[8px] border border-border hover:bg-hover"
                          >
                            Rotate
                          </button>
                          <button
                            onClick={() => setApiKeys((prev) => prev.filter((item) => item.id !== key.id))}
                            className="px-2 py-1 rounded-[8px] bg-red-500/10 text-red-300 hover:bg-red-500/20"
                          >
                            Revoke
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {createdSecret && (
            <Card>
              <h3 className="font-semibold mb-2">Your API Key (shown once)</h3>
              <p className="text-xs text-secondary mb-3">Store this secret now. It will not be shown again.</p>
              <p className="font-mono text-sm break-all bg-bg border border-border rounded-[8px] p-3">{createdSecret}</p>
            </Card>
          )}
        </div>
      );
    }

    return (
      <Card className="space-y-4">
        <h2 className="text-lg font-semibold">{activeSection}</h2>
        <p className="text-sm text-secondary">
          This panel is scaffolded and ready to wire with backend endpoints (`GET /api/users/me/settings`, `PATCH /api/users/me/settings`).
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="text-sm space-y-2 flex flex-col">
            <span className="text-secondary">Primary Field</span>
            <input className="bg-bg border border-border rounded-[8px] px-3 py-2" defaultValue="Default value" />
          </label>
          <label className="text-sm space-y-2 flex flex-col">
            <span className="text-secondary">Secondary Field</span>
            <input className="bg-bg border border-border rounded-[8px] px-3 py-2" defaultValue="Optional" />
          </label>
        </div>
      </Card>
    );
  }, [activeSection, apiKeys, createdSecret]);

  return (
    <div className="max-w-7xl mx-auto py-8 flex flex-col gap-6">
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-wider">Settings</h1>
        <Link href="/profile" className="text-sm text-accent hover:text-white transition-colors">Back to profile</Link>
      </header>

      <div className="grid lg:grid-cols-[250px_1fr] gap-6">
        <Card className="h-fit p-3">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item)}
                className={`w-full text-left text-sm px-3 py-2 rounded-[8px] transition-colors ${
                  activeSection === item ? 'bg-accent text-white' : 'hover:bg-hover text-secondary'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </Card>

        <section className="space-y-4">
          {panel}
          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 rounded-[8px] border border-border hover:bg-hover">Revert</button>
            <button className="px-4 py-2 rounded-[8px] bg-accent hover:bg-accent/80">Save Changes</button>
          </div>
        </section>
      </div>
    </div>
  );
}
