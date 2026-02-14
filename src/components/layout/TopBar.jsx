import React, { useState, useEffect } from 'react';
import { Activity, Clock, Github, Linkedin } from 'lucide-react';
import { profileData } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';

const TopBar = () => {
    const [time, setTime] = useState(new Date());
    const { theme, toggleTheme } = useTheme();
    const [uptime, setUptime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);

        // Simulating uptime since "boot" (random start point for effect)
        const startTime = Date.now() - (4 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000 + 32 * 60 * 1000); // 4d 12h 32m ago
        const uptimeInterval = setInterval(() => {
            setUptime(Date.now() - startTime);
        }, 1000);

        return () => {
            clearInterval(timer);
            clearInterval(uptimeInterval);
        };
    }, []);

    const formatUptime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div className="h-14 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-color)] flex items-center justify-between px-6 flex-shrink-0 z-40 transition-colors duration-300 sticky top-0">
            {/* Left: Current Path / Command */}
            <div className="flex items-center gap-2 font-mono text-sm text-[var(--text-secondary)]">
                <span className="text-[var(--success-color)] font-bold">root@portfolio</span>
                <span className="text-[var(--text-secondary)]">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-[var(--text-secondary)]">$</span>
                <span className="text-[var(--text-primary)] animate-pulse font-bold">_</span>
            </div>

            {/* Center: Hidden on mobile, visible dashboard stats */}
            <div className="hidden md:flex items-center gap-6 font-mono text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                    <div className="relative flex items-center justify-center w-2 h-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success-color)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--success-color)]"></span>
                    </div>
                    <span>SYSTEM NORMAL</span>
                </div>
                <div className="flex items-center gap-2">
                    <Activity size={12} className="text-[var(--text-secondary)]" />
                    <span className="tabular-nums">UPTIME: {formatUptime(uptime)}</span>
                </div>
            </div>

            {/* Right: Clock & Mode Toggle & Socials */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 border-r border-[var(--border-color)] pr-4 hidden sm:flex">
                    <a
                        href={profileData.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-secondary)] hover:text-[#2dba4e] transition-colors"
                        title="GitHub Protocol"
                    >
                        <Github size={16} />
                    </a>
                    <a
                        href={profileData.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-secondary)] hover:text-[#0a66c2] transition-colors"
                        title="LinkedIn Connection"
                    >
                        <Linkedin size={16} />
                    </a>
                </div>

                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors group"
                >
                    <span className="group-hover:rotate-12 transition-transform duration-300">
                        {theme === 'dark' ? '☾' : '☀'}
                    </span>
                    <span>{theme === 'dark' ? 'DARK' : 'DAY'}</span>
                </button>

                <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-primary)] bg-[var(--bg-secondary)] px-3 py-1.5 rounded border border-[var(--border-color)] shadow-sm">
                    <Clock size={12} className="text-[var(--accent-color)]" />
                    <span className="tabular-nums font-bold">{time.toLocaleTimeString([], { hour12: false })}</span>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
