import React from 'react';
import { Terminal, Activity, Server, Database, Cpu, Shield, Wifi } from 'lucide-react';

import soundManager from '../../utils/SoundManager';

const NavItem = ({ sectionId, label, icon: Icon, status = 'online' }) => {
    const scrollToSection = () => {
        const element = document.getElementById(sectionId);
        if (element) {
            soundManager.playClick();
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <button
            onClick={scrollToSection}
            onMouseEnter={() => soundManager.playHover()}
            className="w-full flex items-center justify-between px-4 py-3 border-l-2 border-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-color)] transition-all group text-left"
            title={`Go to ${label}`}
        >
            <div className="flex items-center gap-3">
                <Icon size={16} className="group-hover:text-[var(--accent-color)] transition-colors" />
                <span className="font-mono text-xs uppercase tracking-wider">{label}</span>
            </div>
            <div className={`w-1.5 h-1.5 rounded-full ${status === 'online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-yellow-500'}`} />
        </button>
    );
};

const Sidebar = () => {
    return (
        <div className="hidden md:flex w-64 bg-[var(--bg-primary)] border-r border-[var(--border-color)] flex-col h-screen flex-shrink-0 z-50 transition-colors duration-300 shadow-xl">
            {/* Header */}
            <div className="p-6 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/50 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[var(--text-primary)] mb-1">
                    <Terminal size={20} className="text-[var(--accent-color)]" />
                    <h1 className="font-bold font-mono tracking-tighter">PORTFOLIO.OS</h1>
                </div>
                <p className="text-[10px] text-[var(--text-secondary)] font-mono uppercase">v2.0.1</p>
            </div>

            {/* Modules */}
            <div className="flex-1 py-4 overflow-y-auto">
                <div className="px-4 mb-2">
                    <span className="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-widest opacity-70">Navigation</span>
                </div>
                <nav className="flex flex-col gap-1 px-2">
                    <NavItem sectionId="root-interface" label="Home" icon={Database} />
                    <NavItem sectionId="system-logs" label="Tech Stack" icon={Activity} />
                    <NavItem sectionId="active-services" label="Projects" icon={Server} />
                    <NavItem sectionId="performance" label="Coding Stats" icon={Cpu} />
                    <NavItem sectionId="network-gate" label="Contact" icon={Wifi} />
                </nav>
            </div>

            {/* Footer / Status Panel */}
            <div className="p-4 bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-secondary)]">
                        <span className="flex items-center gap-1"><Shield size={10} /> SECURITY</span>
                        <span className="text-[var(--success-color)]">ENCRYPTED</span>
                    </div>
                    <div className="h-1 w-full bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--accent-color)] w-2/3 animate-pulse opacity-50" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
