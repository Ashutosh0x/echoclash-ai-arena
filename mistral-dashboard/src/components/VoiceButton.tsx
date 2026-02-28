"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Loader2, Volume2, MicOff } from 'lucide-react';

export type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking' | 'muted';

type Props = {
    state: VoiceState;
    onPress: () => void;
    onRelease: () => void;
};

export default function VoiceButton({ state, onPress, onRelease }: Props) {
    const isListening = state === 'listening';

    return (
        <div className="flex flex-col items-center gap-4">
            <button
                onMouseDown={onPress}
                onMouseUp={onRelease}
                onTouchStart={onPress}
                onTouchEnd={onRelease}
                className={`relative flex items-center justify-center h-20 w-20 md:h-16 md:w-16 rounded-full transition-all duration-300
          ${state === 'idle' ? 'bg-card border border-border hover:bg-hover text-secondary' : ''}
          ${isListening ? 'bg-accent/20 border-2 border-accent text-accent' : ''}
          ${state === 'processing' ? 'bg-card border border-border text-secondary' : ''}
          ${state === 'speaking' ? 'bg-card border border-accent/50 text-accent' : ''}
          ${state === 'muted' ? 'bg-card border border-border text-red-500/70' : ''}
        `}
            >
                {isListening && (
                    <motion.div
                        className="absolute inset-0 rounded-full border border-accent"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                )}

                {state === 'idle' && <Mic className="h-6 w-6 md:h-5 md:w-5" />}
                {state === 'listening' && (
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                    >
                        <Mic className="h-6 w-6 md:h-5 md:w-5" />
                    </motion.div>
                )}
                {state === 'processing' && <Loader2 className="h-6 w-6 md:h-5 md:w-5 animate-spin" />}
                {state === 'speaking' && <Volume2 className="h-6 w-6 md:h-5 md:w-5" />}
                {state === 'muted' && <MicOff className="h-6 w-6 md:h-5 md:w-5" />}
            </button>

            <p className="font-mono text-sm text-secondary">
                {state === 'idle' && '[ HOLD TO SPEAK ]'}
                {state === 'listening' && 'Listening...'}
                {state === 'processing' && 'Thinking...'}
                {state === 'speaking' && 'AI speaking...'}
                {state === 'muted' && 'Muted...'}
            </p>
        </div>
    );
}
