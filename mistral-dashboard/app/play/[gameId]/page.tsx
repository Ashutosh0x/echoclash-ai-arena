"use client";

import React, { useState } from 'react';
import {
    SettingsIcon, HeartPulseIcon, RepeatIcon,
    BackpackIcon, ZapIcon, StatsIcon, ShieldIcon, SwordIcon, HeartIcon, FlameIcon
} from '@/src/components/icons';
import Card from '@/src/components/Card';
import VoiceButton, { VoiceState } from '@/src/components/VoiceButton';
import IconButton from '@/src/components/IconButton';

export default function GameRoom() {
    const [voiceState, setVoiceState] = useState<VoiceState>('idle');

    const handlePress = () => setVoiceState('listening');
    const handleRelease = () => {
        setVoiceState('processing');
        setTimeout(() => setVoiceState('speaking'), 1500);
        setTimeout(() => setVoiceState('idle'), 4000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] max-h-screen">
            {/* Top Bar */}
            <header className="flex justify-between items-center py-4 border-b border-border shrink-0">
                <h1 className="font-bold tracking-wider">ECHOCLASH</h1>
                <div className="flex items-center gap-6 text-sm font-mono">
                    <div className="flex items-center gap-2 text-secondary"><RepeatIcon className="h-4 w-4" /> Turn 5</div>
                    <div className="flex items-center gap-2 text-primary font-medium">
                        <HeartPulseIcon className="h-4 w-4 text-accent" /> HP: 84%
                    </div>
                </div>
                <IconButton icon={SettingsIcon} variant="ghost" />
            </header>

            <div className="flex flex-col md:flex-row gap-6 mt-6 flex-grow min-h-0">
                {/* Player Panel (Left Column) */}
                <div className="w-full md:w-64 shrink-0 flex flex-col gap-4">
                    <Card className="flex-grow flex flex-col gap-4">
                        <div className="text-xs uppercase text-secondary font-bold tracking-wider mb-2">Player Status</div>
                        <div className="flex items-center gap-3 text-sm">
                            <BackpackIcon className="h-4 w-4 text-secondary" /> Inventory
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <ZapIcon className="h-4 w-4 text-accent" /> Abilities
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <ShieldIcon className="h-4 w-4 text-secondary" /> Equipment
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <StatsIcon className="h-4 w-4 text-secondary" /> Stats
                        </div>
                    </Card>

                    <Card>
                        <div className="text-xs uppercase text-secondary font-bold tracking-wider mb-3">Quick Actions</div>
                        <div className="grid grid-cols-2 gap-2">
                            <IconButton icon={SwordIcon} label="Attack" variant="ghost" size="sm" iconPosition="top" className="h-[60px] border border-border bg-hover hover:text-accent" />
                            <IconButton icon={ShieldIcon} label="Defend" variant="ghost" size="sm" iconPosition="top" className="h-[60px] border border-border bg-hover hover:text-accent" />
                            <IconButton icon={FlameIcon} label="Spell" variant="ghost" size="sm" iconPosition="top" className="h-[60px] border border-border bg-hover hover:text-accent" />
                            <IconButton icon={HeartIcon} label="Heal" variant="ghost" size="sm" iconPosition="top" className="h-[60px] border border-border bg-hover hover:text-accent" />
                        </div>
                    </Card>
                </div>

                {/* Arena View (Center/Right) */}
                <div className="flex-grow flex flex-col min-h-0 bg-black border border-border rounded-[12px] relative overflow-hidden">

                    {/* Minimal Map Area */}
                    <div className="flex-grow flex items-center justify-center p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-hover to-bg">
                        <div className="text-center font-mono opacity-20">
                            Arena View (Abstract)
                        </div>
                    </div>

                    {/* Combat Log overlay (bottom left of arena) */}
                    <div className="absolute top-4 left-4 right-4 md:w-80 md:right-auto bg-card/80 backdrop-blur-md border border-border rounded-[12px] p-4 text-sm font-mono flex flex-col gap-2 max-h-48 overflow-y-auto">
                        <div className="text-secondary">&gt; You draw your bow...</div>
                        <div className="text-primary">&gt; The goblin staggers.</div>
                        <div className="text-accent">&gt; Goblin HP -8</div>
                    </div>

                    {/* Voice Control Area (Bottom) */}
                    <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border p-6 flex flex-col items-center justify-center gap-4">
                        <VoiceButton state={voiceState} onPress={handlePress} onRelease={handleRelease} />

                        <div className="h-6 flex items-center justify-center text-sm font-mono w-full px-4 text-center">
                            {voiceState !== 'idle' ? (
                                <span className="text-primary truncate">I attack the goblin...</span>
                            ) : (
                                <span className="text-secondary opacity-50 truncate">Press and hold to stream audio via Voxtral...</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
