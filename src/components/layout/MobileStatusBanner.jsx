import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Activity, Shield, Radio } from 'lucide-react';

const MobileStatusBanner = () => {
    const [uptime, setUptime] = useState(0);
    const [latency, setLatency] = useState(24);

    useEffect(() => {
        const startTime = Date.now();
        const uptimeInterval = setInterval(() => {
            setUptime(Date.now() - startTime);
        }, 1000);

        // Mock latency fluctuation
        const latencyInterval = setInterval(() => {
            setLatency(Math.floor(Math.random() * (45 - 20 + 1) + 20));
        }, 3000);

        return () => {
            clearInterval(uptimeInterval);
            clearInterval(latencyInterval);
        };
    }, []);

    const formatUptime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="md:hidden w-full bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
            {/* Top Row: System Status */}
            <div className="flex justify-between items-center px-4 py-2 text-[10px] font-mono text-[var(--text-secondary)] bg-[var(--bg-tertiary)]/50">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--success-color)] animate-pulse shadow-[0_0_5px_var(--success-color)]"></span>
                    <span>NET: SECURE</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <Wifi size={10} />
                        <span>5G</span>
                    </div>
                    <span>UPTIME: {formatUptime(uptime)}</span>
                </div>
            </div>

            {/* Middle Row: Scroll/Marquee or Data */}
            <div className="px-4 py-3 grid grid-cols-2 gap-2 border-b border-[var(--border-color)] border-dashed border-opacity-30">
                <div className="bg-[var(--bg-primary)] p-2 rounded border border-[var(--border-color)] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Activity size={12} className="text-[var(--accent-color)]" />
                        <span className="text-[10px] uppercase font-mono text-[var(--text-secondary)]">Latency</span>
                    </div>
                    <span className="text-xs font-mono text-[var(--text-primary)]">{latency}ms</span>
                </div>

                <div className="bg-[var(--bg-primary)] p-2 rounded border border-[var(--border-color)] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield size={12} className="text-[var(--success-color)]" />
                        <span className="text-[10px] uppercase font-mono text-[var(--text-secondary)]">Firewall</span>
                    </div>
                    <span className="text-xs font-mono text-[var(--success-color)]">ACTIVE</span>
                </div>
            </div>

            {/* Bottom Marquee */}
            <div className="overflow-hidden whitespace-nowrap py-1 bg-[var(--bg-secondary)]">
                <div className="inline-block animate-marquee text-[10px] font-mono text-[var(--text-secondary)] opacity-70">
                    <span className="mx-4"> ~ SYSTEM OPTIMIZED FOR MOBILE ~ </span>
                    <span className="mx-4"> ~ TOUCH INTERFACE ACTIVE ~ </span>
                    <span className="mx-4"> ~ SCROLL TO NAVIGATE ~ </span>
                    <span className="mx-4"> ~ TAP PROJECTS TO VIEW DETAILS ~ </span>
                </div>
            </div>
        </div>
    );
};

export default MobileStatusBanner;
