import Link from 'next/link';
import { Plus, ArrowRight, Hash, Mic, Users } from 'lucide-react';
import Card from '@/src/components/Card';
import Badge from '@/src/components/Badge';

export default function LobbyPage() {
    return (
        <div className="max-w-4xl mx-auto py-8">
            <header className="flex items-center justify-between mb-12">
                <h1 className="text-2xl font-bold tracking-wider">ECHOCLASH</h1>
                <div className="flex items-center gap-4">
                    <Badge className="flex items-center gap-1">Mode: <Mic className="h-3 w-3 inline" /> Voice</Badge>
                    <Badge className="flex items-center gap-1 bg-card text-secondary border border-border">
                        Invite Code: <Hash className="h-3 w-3 inline" /> <span className="font-mono text-primary">E99</span>
                    </Badge>
                </div>
            </header>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
                <button className="flex items-center justify-center gap-2 bg-accent hover:bg-accent/80 transition-colors h-16 rounded-[12px] font-medium text-white">
                    <Plus className="h-5 w-5" />
                    Create Match
                </button>
                <button className="flex items-center justify-center gap-2 bg-card border border-border hover:bg-hover transition-colors h-16 rounded-[12px] font-medium text-primary">
                    Join Match
                    <ArrowRight className="h-5 w-5" />
                </button>
            </div>

            <Card className="p-0 overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-card/50">
                    <h2 className="font-medium text-sm text-secondary uppercase tracking-wider">Active Lobbies</h2>
                </div>
                <div className="divide-y divide-border">
                    {/* Example row */}
                    <div className="px-6 py-4 flex items-center justify-between hover:bg-hover transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-border flex items-center justify-center">
                                <span className="font-mono text-sm">P1</span>
                            </div>
                            <div>
                                <h3 className="font-medium">EchoHost</h3>
                                <p className="text-xs text-secondary flex items-center gap-1 mt-1">
                                    <Mic className="h-3 w-3" /> Voice mode
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-secondary text-sm flex items-center gap-1">
                                <Users className="h-4 w-4" /> 1/2
                            </div>
                            <Link href="/play/g_9xW" className="text-accent hover:text-white transition-colors text-sm font-medium flex items-center gap-1">
                                Join <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
