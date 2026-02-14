import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { subscribeToViewCount, formatViewCount } from '../../utils/viewCounter';

const VisitorBadge = () => {
    const [viewCount, setViewCount] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Subscribe to real-time updates
        const unsubscribe = subscribeToViewCount((count) => {
            setViewCount(count);
            setIsLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <div className="inline-flex items-center gap-2 bg-[var(--bg-secondary)] border border-lime-500/50 rounded px-3 py-1.5 font-mono text-xs md:text-sm shadow-lg shadow-lime-500/20 hover:shadow-lime-500/40 transition-all">
            <div className="relative flex items-center justify-center">
                {/* Animated ping effect */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75 animate-ping"></span>
                {/* Icon */}
                <Users size={14} className="relative text-lime-400" />
            </div>
            <span className="text-[var(--text-secondary)] hidden md:inline">
                VISITORS COUNT:
            </span>
            <span className="text-[var(--text-secondary)] md:hidden">
                VISITORS:
            </span>
            <span className="text-lime-400 font-bold tracking-wider">
                {isLoading ? (
                    <span className="animate-pulse">---</span>
                ) : (
                    formatViewCount(viewCount)
                )}
            </span>
        </div>
    );
};

export default VisitorBadge;
