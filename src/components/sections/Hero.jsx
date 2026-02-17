import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ChevronRight, Play, ArrowRight, Server, Cpu } from 'lucide-react';
import { HERO_CONTENT } from '../../constants';
import VisitorBadge from './VisitorBadge';
import Journey from './Journey';
import soundManager from '../../utils/SoundManager';

const Hero = () => {
    const [text, setText] = useState('');
    const fullText = ">> initializing_system...\n>> loading_user_profile...\n>> mount_subject: Sameer Khan\n>> status: ONLINE";
    const [showContent, setShowContent] = useState(false);
    const [showJourney, setShowJourney] = useState(false);

    useEffect(() => {
        let i = 0;
        const typing = setInterval(() => {
            setText(fullText.substring(0, i + 1));
            i++;
            if (i > fullText.length) {
                clearInterval(typing);
                setTimeout(() => setShowContent(true), 500);
            }
        }, 30);
        return () => clearInterval(typing);
    }, []);

    return (
        <div className="flex-1 min-h-full p-2 md:p-12 flex flex-col justify-center max-w-5xl mx-auto">
            {/* Mobile Visitor Badge (outside terminal) */}
            <div className="md:hidden mb-2 flex justify-center">
                <VisitorBadge />
            </div>

            <div className="border border-[var(--border-color)] bg-[var(--bg-secondary)] rounded-lg shadow-2xl overflow-hidden min-h-[35vh] md:min-h-[60vh] flex flex-col">
                {/* Terminal Header */}
                <div className="bg-[var(--bg-tertiary)] px-3 py-2 md:px-4 md:py-3 flex items-center justify-between border-b border-[var(--border-color)]">
                    <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Terminal size={14} md:size={16} className="text-[var(--text-secondary)]" />
                        <span className="text-[var(--text-secondary)] text-xs md:text-sm font-mono">bash</span>
                    </div>
                </div>

                {/* Terminal Content */}
                <div className="flex-1 p-3 md:p-6 overflow-y-auto">
                    {/* Boot Sequence (Typing Effect) */}
                    <div className="font-mono text-xs md:text-base text-[var(--terminal-color)] mb-2 md:mb-12 min-h-[60px] md:min-h-[110px] whitespace-pre-line">
                        {text}
                        <span className="animate-pulse inline-block w-2 H-4 bg-[var(--terminal-color)] ml-1">_</span>
                    </div>

                    {/* Main Content (Always rendered to reserve space, but hidden initially) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-6">
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 md:px-3 md:py-1 border border-cyan-500/50 text-cyan-400 text-[10px] md:text-xs font-mono tracking-widest uppercase shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all">
                                <Server size={12} className="animate-pulse" />
                                Backend Engineer
                            </div>
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 md:px-3 md:py-1 border border-purple-500/50 text-purple-400 text-[10px] md:text-xs font-mono tracking-widest uppercase shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all">
                                <Cpu size={12} className="animate-pulse" />
                                System Architect
                            </div>
                            {/* Desktop Visitor Badge (inside with other badges) */}
                            <div className="hidden md:inline-flex">
                                <VisitorBadge />
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-7xl font-bold text-[var(--text-primary)] mb-3 md:mb-8 font-mono tracking-tighter">
                            Sameer<span className="text-[var(--text-secondary)]">Khan</span>
                        </h1>

                        <div className="p-3 md:p-6 bg-[var(--bg-primary)] border-l-4 border-[var(--accent-color)] rounded-r-lg mb-4 md:mb-10 max-w-2xl shadow-lg border-y border-r border-[var(--border-color)]">
                            <p className="text-[var(--text-primary)] font-mono text-xs md:text-lg leading-relaxed opacity-90">
                                {HERO_CONTENT}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3 md:gap-4">
                            <button
                                className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-mono font-bold flex items-center gap-2 hover:bg-[var(--accent-color)] hover:text-white transition-all group"
                                onClick={() => {
                                    soundManager.playClick();
                                    document.getElementById('active-services').scrollIntoView({ behavior: 'smooth' });
                                }}
                                onMouseEnter={() => soundManager.playHover()}
                            >
                                <Terminal size={14} md:size={18} />
                                ./projects.sh
                                <ArrowRight size={14} md:size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => {
                                    soundManager.playClick();
                                    setShowJourney(true);
                                }}
                                onMouseEnter={() => soundManager.playHover()}
                                className="border border-[var(--border-color)] text-[var(--text-secondary)] px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-mono flex items-center gap-2 hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] transition-all"
                            >
                                <Play size={14} md:size={18} />
                                open_journey.exe
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Journey Modal */}
            <Journey isOpen={showJourney} onClose={() => setShowJourney(false)} />
        </div>
    );
};

export default Hero;
