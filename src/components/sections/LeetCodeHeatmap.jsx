import React, { useMemo, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { ChevronDown } from 'lucide-react';

const LeetCodeHeatmap = ({ submissionCalendar }) => {
    const [selectedYear, setSelectedYear] = useState('Current');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // 1. Process History
    const fullHistory = useMemo(() => {
        const history = [];
        if (submissionCalendar) {
            Object.entries(submissionCalendar).forEach(([timestamp, count]) => {
                const date = new Date(parseInt(timestamp) * 1000);
                // Explicitly filter out 2023 and earlier
                if (date.getFullYear() < 2024) return;

                const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                history.push({ date: dateStr, count });
            });
        }
        return history;
    }, [submissionCalendar]);

    // 2. Generate Data for Months
    const monthBlocks = useMemo(() => {
        const blocks = [];
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        let startReference;
        const today = new Date();

        if (selectedYear === 'Current') {
            // Start 11 months ago to show full year window
            startReference = new Date(today.getFullYear(), today.getMonth() - 11, 1);
        } else {
            const y = parseInt(selectedYear);
            startReference = new Date(y, 0, 1);
        }

        for (let i = 0; i < 12; i++) {
            const currentMonth = new Date(startReference.getFullYear(), startReference.getMonth() + i, 1);
            const m = currentMonth.getMonth();
            const y = currentMonth.getFullYear();

            const monthStart = new Date(y, m, 1);
            const monthEnd = new Date(y, m + 1, 0); // Last day of month

            const startDay = monthStart.getDay(); // 0-6
            const daysInMonth = monthEnd.getDate(); // 28-31

            const weeks = [];
            let currentWeek = new Array(7).fill(null);

            let dayCounter = 1;

            // First Week
            for (let d = 0; d < 7; d++) {
                if (d >= startDay) {
                    currentWeek[d] = { day: dayCounter++, month: m, year: y };
                }
            }
            weeks.push(currentWeek);

            // Subsequent Weeks
            while (dayCounter <= daysInMonth) {
                currentWeek = new Array(7).fill(null);
                for (let d = 0; d < 7; d++) {
                    if (dayCounter <= daysInMonth) {
                        currentWeek[d] = { day: dayCounter++, month: m, year: y };
                    }
                }
                weeks.push(currentWeek);
            }

            blocks.push({
                label: monthNames[m],
                year: y,
                weeks, // Array of Week Arrays [7 items]
                monthStart
            });
        }
        return blocks;
    }, [selectedYear, fullHistory]);

    // Helper: Get Day Stats (Count & Intensity)
    const getDayStats = (dayObj) => {
        if (!dayObj) return { count: 0, intensity: -1 }; // Invisible

        const { day, month, year } = dayObj;
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        // 1. Check Specific Real Data First
        const found = fullHistory.find(h => h.date === dateStr);
        if (found) {
            return {
                count: found.count,
                intensity: found.count > 4 ? 4 : found.count // Max intensity 4
            };
        }

        return { count: 0, intensity: 0 }; // Empty
    };

    // Calc Total
    const totalSubmissions = useMemo(() => {
        if (!fullHistory || fullHistory.length === 0) return 0;

        let sum = 0;
        const today = new Date();

        if (selectedYear === 'Current') {
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(today.getFullYear() - 1);
            fullHistory.forEach(item => {
                const itemDate = new Date(item.date);
                if (itemDate >= oneYearAgo) sum += item.count;
            });
        } else {
            const targetYear = parseInt(selectedYear);
            fullHistory.forEach(item => {
                const itemYear = new Date(item.date).getFullYear();
                if (itemYear === targetYear) sum += item.count;
            });
        }
        return sum;
    }, [fullHistory, selectedYear]);

    return (
        <div className="w-full relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--text-secondary)]">
                        <span className="text-[var(--text-primary)] font-bold">{totalSubmissions} submissions</span>
                        {selectedYear === 'Current' ? ' in the past one year' : ` in ${selectedYear}`}
                    </span>
                </div>

                {/* Dropdown */}
                <div className="relative z-50">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-1 text-[10px] font-mono bg-[var(--bg-tertiary)] px-2 py-1 rounded text-[var(--text-primary)] border border-transparent hover:border-[var(--border-color)] hover:bg-[var(--bg-secondary)]"
                    >
                        {selectedYear} <ChevronDown size={10} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute left-0 md:left-auto md:right-0 top-full mt-1 w-24 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md shadow-lg z-[60]">
                            {['Current', '2026', '2025'].map(year => (
                                <button
                                    key={year}
                                    onClick={() => { setSelectedYear(year); setIsDropdownOpen(false); }}
                                    className="block w-full text-left px-3 py-2 text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Manual Grid Heatmap */}
            <div className="p-2 rounded-lg border border-[var(--border-color)] dark:border-[#30363d] w-full bg-[var(--bg-secondary)] overflow-x-auto custom-scrollbar">
                {/* Full Width Container - Min width to ensure it doesn't squash */}
                <div className="min-w-[700px] flex justify-start gap-4 items-end">
                    {monthBlocks.map((month, mIdx) => (
                        <div key={mIdx} className="flex flex-col gap-1 items-center">
                            {/* Weeks Grid */}
                            <div className="flex gap-[2px]">
                                {month.weeks.map((week, wIdx) => (
                                    <div key={wIdx} className="flex flex-col gap-[2px]">
                                        {week.map((dayObj, dIdx) => {
                                            const stats = getDayStats(dayObj);
                                            // Check future date
                                            const isFuture = dayObj && (
                                                dayObj.year > new Date().getFullYear() ||
                                                (dayObj.year === new Date().getFullYear() && dayObj.month > new Date().getMonth()) ||
                                                (dayObj.year === new Date().getFullYear() && dayObj.month === new Date().getMonth() && dayObj.day > new Date().getDate())
                                            );

                                            // Render invisible placeholder if null or future
                                            if (stats.intensity === -1 || isFuture) return <div key={dIdx} className="w-[10px] h-[10px]" />;

                                            return (
                                                <div
                                                    key={dIdx}
                                                    className={`w-[10px] h-[10px] rounded-[2px] transition-colors ${stats.intensity === 0 ? 'bg-[var(--heatmap-empty)]' :
                                                        stats.intensity === 1 ? 'bg-[var(--heatmap-1)]' :
                                                            stats.intensity === 2 ? 'bg-[var(--heatmap-2)]' :
                                                                stats.intensity === 3 ? 'bg-[var(--heatmap-3)]' :
                                                                    'bg-[var(--heatmap-4)]'
                                                        }`}

                                                    data-tooltip-id="heatmap-tooltip"
                                                    data-tooltip-content={dayObj ? `${dayObj.year}-${String(dayObj.month + 1).padStart(2, '0')}-${String(dayObj.day).padStart(2, '0')}: ${stats.count} submissions` : ''}
                                                />
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                            <span className="text-[9px] text-[var(--text-secondary)] font-mono">{month.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <Tooltip
                id="heatmap-tooltip"
                style={{
                    backgroundColor: "var(--bg-tertiary)",
                    color: "var(--text-primary)",
                    padding: "4px 8px",
                    fontSize: "10px",
                    borderRadius: "4px"
                }}
                border="1px solid var(--border-color)"
            />

            <div className="flex items-center justify-start gap-1 mt-2 text-[9px] text-[var(--text-secondary)] ml-1">
                <span>Less</span>
                <div className="w-2 h-2 rounded-[1px] bg-[var(--heatmap-empty)]" />
                <div className="w-2 h-2 rounded-[1px] bg-[var(--heatmap-1)]" />
                <div className="w-2 h-2 rounded-[1px] bg-[var(--heatmap-2)]" />
                <div className="w-2 h-2 rounded-[1px] bg-[var(--heatmap-3)]" />
                <div className="w-2 h-2 rounded-[1px] bg-[var(--heatmap-4)]" />
                <span>More</span>
            </div>
        </div>
    );
};
export default LeetCodeHeatmap;
