import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, Database, Cpu, AlertTriangle, CheckCircle2, Flame, Zap, Trophy } from 'lucide-react';
import LeetCodeHeatmap from './LeetCodeHeatmap';

const LeetCodeDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Using a public proxy for LeetCode stats
                const response = await axios.get('https://leetcode-stats-api.herokuapp.com/sameerkhanyt09');
                if (response.data.status === 'error') {
                    throw new Error(response.data.message);
                }
                setStats(response.data);
            } catch (err) {
                console.error("Failed to fetch LeetCode stats:", err);
                // Fallback mock data
                setStats({
                    totalSolved: 178,
                    totalQuestions: 2800, // Added fallback
                    easySolved: 104,
                    totalEasy: 600,
                    mediumSolved: 68,
                    totalMedium: 1400,
                    hardSolved: 6,
                    totalHard: 800,
                    acceptanceRate: 68.5,
                    ranking: 12403,
                    status: 'fallback',
                    submissionCalendar: generateMockSubmissionCalendar()
                });
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        const generateMockSubmissionCalendar = () => {
            const calendar = {};
            const today = new Date();
            // Generate valid data for past 365 days
            for (let i = 0; i < 365; i++) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);

                // Randomize: 60% chance of 0, else 1-5 submissions
                // Higher chance on weekends? Maybe just simple random for now
                const rand = Math.random();
                if (rand > 0.6) {
                    // Create timestamp in seconds
                    const timestamp = Math.floor(date.getTime() / 1000);
                    calendar[timestamp] = Math.ceil(Math.random() * 5);
                }
            }
            return calendar;
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center font-mono text-[var(--success-color)] animate-pulse">
                <p>{'>'} fetching_runtime_stats...</p>
            </div>
        );
    }

    // Gauge Calculations
    const totalSolved = stats?.totalSolved || 0;
    const totalQuestions = stats?.totalQuestions || 1;

    // We want the gauge to visualize the *distribution* of solved problems
    // Full Circle = 100% of Solved.
    // To match the look of the "Arc", we use a 250-degree arc or similar.
    // Let's use a 260-degree arc opening at the bottom.

    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const arcAngle = 260;
    const arcLength = (arcAngle / 360) * circumference; // The visible length of the arc
    const gapLength = circumference - arcLength;

    // Proportions
    // Avoid division by zero
    const solvedSafe = totalSolved === 0 ? 1 : totalSolved;
    const easyPct = stats?.easySolved / solvedSafe;
    const medPct = stats?.mediumSolved / solvedSafe;
    const hardPct = stats?.hardSolved / solvedSafe;

    // Segment Lengths (in pixels/dash units)
    const easyLen = easyPct * arcLength;
    const medLen = medPct * arcLength;
    const hardLen = hardPct * arcLength;

    // Dash Arrays & Offsets
    // Pattern: [strokeLength, gapLength]
    // We need to carefully offset them.
    // Base Rotation: we want the gap at the bottom center.
    // Gap is 100 degrees (360 - 260).
    // So we rotate -90 (top) + 50 (half gap?) -> No.
    // Standard SVG starts at 3 o'clock (0deg).
    // gap is 100deg. So visible is 260deg.
    // We want clear space from 40deg to 140deg (bottom). 
    // Let's just rotate 140deg? 
    // Simpler: Rotate 135deg (Bottom Left start).

    // Rotation logic: 
    // Start point 140deg (approx bottom left). End point 40deg (approx bottom right).
    // Let's rotate the SVG 140 degrees?

    return (
        <div className="p-0 md:p-8 max-w-6xl mx-auto custom-scrollbar">
            <div className="flex items-center gap-3 mb-4 md:mb-8 border-b border-[var(--border-color)] pb-2 md:pb-4 px-2 md:px-0">
                <Activity size={18} md:size={20} className="text-[var(--success-color)]" />
                <h2 className="text-lg md:text-xl font-bold text-[var(--text-primary)] font-mono">Performance Monitor</h2>
                {error && <span className="text-[10px] md:text-xs text-yellow-500 font-mono ml-auto flex items-center gap-1"><AlertTriangle size={10} md:size={12} /> <span className="hidden sm:inline">CONNECTION_UNSTABLE</span><span className="sm:hidden">OFFLINE</span></span>}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-8">

                {/* Custom LeetCode Stats Card - Gauge Style */}
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4 md:p-6 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 h-full relative overflow-hidden group">

                    {/* Background Glow Effect */}
                    <div className="absolute top-1/2 left-0 w-32 h-32 bg-[#00b8a3] opacity-5 blur-[80px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 group-hover:opacity-10 transition-opacity duration-500" />

                    {/* Gauge Chart */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                        {/* Rotated SVG to position the arc opening at bottom */}
                        <svg viewBox="0 0 100 100" className="w-full h-full transform rotate-[140deg]">
                            {/* Background Track */}
                            <circle
                                cx="50" cy="50" r={radius}
                                fill="none"
                                stroke="var(--border-color)"
                                strokeWidth="5"
                                strokeDasharray={`${arcLength} ${gapLength}`}
                                strokeLinecap="round"
                            />

                            {/* Hard Segment (Bottom Layer) - we stack them or use offsets. 
                                Using offsets is cleaner. Order: Easy -> Med -> Hard. 
                                Actually, DashOffset is unrelated to layer order, but dasharray is.
                                To make them sequential:
                                Easy: stroke-dasharray="easyLen gap..." dashoffset="0"
                                Med: stroke-dasharray="medLen gap..." dashoffset="-easyLen"
                                Hard: stroke-dasharray="hardLen gap..." dashoffset="-(easyLen+medLen)"
                                Note: We must ensure the 'gap' in dasharray is large enough to hide the rest of the circle.
                            */}

                            {/* Easy (Teal) */}
                            <circle
                                cx="50" cy="50" r={radius}
                                fill="none"
                                stroke="#00b8a3"
                                strokeWidth="5"
                                strokeDasharray={`${easyLen} ${circumference}`}
                                strokeLinecap="round"
                            />

                            {/* Medium (Yellow) */}
                            <circle
                                cx="50" cy="50" r={radius}
                                fill="none"
                                stroke="#ffc01e"
                                strokeWidth="5"
                                strokeDasharray={`${medLen} ${circumference}`}
                                strokeDashoffset={-easyLen}
                                strokeLinecap="round"
                            />

                            {/* Hard (Red) */}
                            <circle
                                cx="50" cy="50" r={radius}
                                fill="none"
                                stroke="#ff375f"
                                strokeWidth="5"
                                strokeDasharray={`${hardLen} ${circumference}`}
                                strokeDashoffset={-(easyLen + medLen)}
                                strokeLinecap="round"
                            />
                        </svg>

                        {/* Overlay Text (Unrotated) */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] font-mono">{totalSolved}</span>
                                <span className="text-[10px] md:text-xs text-[var(--text-secondary)]">/{totalQuestions}</span>
                            </div>

                            <div className="flex items-center gap-1 text-[var(--success-color)] text-[10px] md:text-xs font-bold mt-1">
                                <CheckCircle2 size={10} md:size={12} />
                                <span>Solved</span>
                            </div>

                            {/* Bottom 'Attempting' Text - absolute positioning to fit visually in the gap */}
                            <div className="absolute bottom-4 text-[9px] md:text-[10px] text-[var(--text-secondary)] font-mono">
                                1 Attempting
                            </div>
                        </div>
                    </div>

                    {/* Legend - Vertical Stack */}
                    <div className="flex flex-col gap-2 md:gap-3 w-full sm:w-auto min-w-[140px]">
                        {/* Easy Row */}
                        <div className="flex items-center justify-between p-1.5 md:p-2 rounded bg-[var(--bg-primary)] border border-[var(--border-color)]">
                            <span className="text-[10px] md:text-xs text-[#00b8a3] font-bold">Easy</span>
                            <div className="text-[10px] md:text-xs font-mono">
                                <span className="text-[var(--text-primary)] font-bold">{stats?.easySolved}</span>
                                <span className="text-[var(--text-secondary)]">/{stats?.totalEasy || '??'}</span>
                            </div>
                        </div>

                        {/* Medium Row */}
                        <div className="flex items-center justify-between p-1.5 md:p-2 rounded bg-[var(--bg-primary)] border border-[var(--border-color)]">
                            <span className="text-[10px] md:text-xs text-[#ffc01e] font-bold">Med.</span>
                            <div className="text-[10px] md:text-xs font-mono">
                                <span className="text-[var(--text-primary)] font-bold">{stats?.mediumSolved}</span>
                                <span className="text-[var(--text-secondary)]">/{stats?.totalMedium || '??'}</span>
                            </div>
                        </div>

                        {/* Hard Row */}
                        <div className="flex items-center justify-between p-1.5 md:p-2 rounded bg-[var(--bg-primary)] border border-[var(--border-color)]">
                            <span className="text-[10px] md:text-xs text-[#ff375f] font-bold">Hard</span>
                            <div className="text-[10px] md:text-xs font-mono">
                                <span className="text-[var(--text-primary)] font-bold">{stats?.hardSolved}</span>
                                <span className="text-[var(--text-secondary)]">/{stats?.totalHard || '??'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Badges / Extras */}
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4 md:p-6 rounded-lg flex flex-col justify-between relative overflow-hidden">
                    {/* Background Glow Effect */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffa116] opacity-5 blur-[80px] rounded-full pointer-events-none translate-x-10 -translate-y-10" />

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[10px] md:text-xs text-[var(--text-secondary)] font-mono uppercase">Active Badge</h3>
                            <Trophy size={14} className="text-[#ffa116]" />
                        </div>

                        <div className="flex items-center gap-4 md:gap-5">
                            {/* Animated Badge Icon */}
                            <div className="relative group/badge">
                                <div className="absolute inset-0 bg-[#ffa116] blur-[20px] opacity-20 group-hover/badge:opacity-40 transition-opacity rounded-full" />
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)] rounded-full flex items-center justify-center border border-[#ffa116]/30 shadow-[0_0_15px_rgba(255,161,22,0.15)] relative z-10 group-hover/badge:scale-105 transition-transform duration-300">
                                    <Flame size={24} md:size={32} className="text-[#ffa116] drop-shadow-[0_0_8px_rgba(255,161,22,0.5)] animate-pulse" />
                                </div>
                                {/* Small orbital dot */}
                                <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-[var(--bg-tertiary)] rounded-full border border-[#ffa116] flex items-center justify-center z-20">
                                    <Zap size={8} md:size={10} className="text-[#ffa116]" fill="#ffa116" />
                                </div>
                            </div>

                            <div>
                                <div className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-1">50 Days Streak</div>
                                <div className="text-[10px] md:text-xs text-[var(--text-secondary)] font-mono bg-[var(--bg-tertiary)] px-2 py-1 rounded border border-[var(--border-color)] inline-block">
                                    2026 Season Badge
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 md:mt-8 pt-4 border-t border-[var(--border-color)]/50">
                        <div className="flex justify-between text-[10px] md:text-xs mb-2 md:mb-3 font-mono items-center">
                            <span className="text-[var(--text-secondary)] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00b8a3]" /> Global Ranking
                            </span>
                            <span className="text-[var(--text-primary)] font-bold">{stats?.ranking?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[10px] md:text-xs font-mono items-center">
                            <span className="text-[var(--text-secondary)] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#ffa116]" /> Acceptance
                            </span>
                            <span className="text-[var(--text-primary)] font-bold">{stats?.acceptanceRate}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Heatmap Section */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4 md:p-6 rounded-lg overflow-hidden">
                <h3 className="text-[10px] md:text-xs text-[var(--text-secondary)] font-mono uppercase mb-4 md:mb-6 flex items-center gap-2">
                    <Activity size={12} md:size={14} /> Submission Activity Scan
                </h3>
                <LeetCodeHeatmap submissionCalendar={stats?.submissionCalendar} />
            </div>
        </div>
    );
};

export default LeetCodeDashboard;
