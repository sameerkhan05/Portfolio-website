import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Cpu, Code, Database, X, Zap } from 'lucide-react';
import soundManager from '../../utils/SoundManager';

const milestones = [
    {
        year: '2018',
        event: 'SYSTEM_BOOT',
        details: 'Matriculation Completed',
        status: 'CLEARED',
        icon: Terminal,
        color: 'text-green-400'
    },
    {
        year: '2020',
        event: 'MODULE_LOAD',
        details: 'Intermediate (College) Finished',
        status: 'CLEARED',
        icon: Shield,
        color: 'text-blue-400'
    },
    {
        year: '2021',
        event: 'EXEC_INIT',
        details: 'Started Coding Journey (Hello World)',
        status: 'RUNNING',
        icon: Code,
        color: 'text-yellow-400'
    },
    {
        year: '2023',
        event: 'COMPILING',
        details: 'Full Stack Development Mastery',
        status: 'COMPLETE',
        icon: Database,
        color: 'text-purple-400'
    },
    {
        year: '2025',
        event: 'DEPLOY',
        details: 'Software Developer @Paynext',
        status: 'ACTIVE',
        icon: Cpu,
        color: 'text-red-400 animate-pulse'
    }
];

const Journey = ({ isOpen, onClose }) => {

    // Play sound on mount
    useEffect(() => {
        if (isOpen) {
            soundManager.playBoot();
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    onClick={() => {
                        soundManager.playClick();
                        onClose();
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-[var(--bg-secondary)] border border-[var(--accent-color)] rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* CRT Scanline Effect */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[10] bg-[length:100%_4px,3px_100%] opacity-20" />

                        {/* Terminal Header */}
                        <div className="bg-[var(--bg-tertiary)] px-4 py-2 flex items-center justify-between border-b border-[var(--border-color)]">
                            <div className="flex items-center gap-2">
                                <Terminal size={16} className="text-[var(--accent-color)]" />
                                <span className="text-xs md:text-sm font-mono text-[var(--text-primary)]">journey_log.json</span>
                            </div>
                            <button
                                onClick={() => {
                                    soundManager.playClick();
                                    onClose();
                                }}
                                onMouseEnter={() => soundManager.playHover()}
                                className="text-[var(--text-secondary)] hover:text-red-500 transition-colors z-20"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Terminal Content */}
                        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar font-mono relative z-20">
                            <div className="space-y-6">
                                {milestones.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.4 }}
                                        onAnimationComplete={() => soundManager.playTyping()}
                                        className="relative pl-8 border-l-2 border-[var(--border-color)] last:border-l-0 group"
                                        onMouseEnter={() => soundManager.playHover()}
                                    >
                                        {/* Timeline Dot */}
                                        <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[var(--bg-primary)] border-2 ${index === milestones.length - 1 ? 'border-[var(--accent-color)] animate-ping' : 'border-[var(--text-secondary)] group-hover:border-[var(--accent-color)] transition-colors'}`} />

                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-3">
                                                <span className={`text-xs font-bold px-2 py-0.5 rounded bg-[var(--bg-tertiary)] ${item.color}`}>
                                                    [{item.year}]
                                                </span>
                                                <span className="text-[var(--text-primary)] text-sm font-bold tracking-wide">
                                                    {item.event}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm mt-1">
                                                <item.icon size={14} />
                                                {item.details}
                                            </div>
                                            <div className="text-[10px] text-[var(--text-secondary)] opacity-50 uppercase tracking-widest mt-1">
                                                STATUS: {item.status}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: milestones.length * 0.4 + 0.5 }}
                                    className="flex items-center gap-2 text-[var(--accent-color)] animate-pulse mt-8 border-t border-[var(--border-color)] pt-4"
                                >
                                    <Zap size={16} />
                                    <span className="text-sm">Awaiting next instruction...</span>
                                    <span className="w-2 h-4 bg-[var(--accent-color)] inline-block" />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Journey;
