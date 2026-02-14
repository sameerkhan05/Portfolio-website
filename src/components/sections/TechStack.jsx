import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Database, Server } from 'lucide-react';
import { EXPERIENCES } from '../../constants'; // Ensure this path is correct

const LogEntry = ({ experience, index }) => {
    const timestamp = new Date().toISOString().split('T')[0]; // Fake date for "log" feel

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="font-mono text-xs md:text-sm mb-3 md:mb-6 border-l-2 border-[var(--border-color)] pl-3 md:pl-4 ml-1 md:ml-2"
        >
            {/* Log Header */}
            <div className="flex flex-wrap items-center gap-x-2 text-[10px] md:text-xs text-[var(--text-secondary)] mb-0.5 md:mb-1">
                <span className="text-blue-400">[{experience.year}]</span>
                <span className="text-yellow-600">WARN</span>
                <span className="hidden sm:inline">kernel: process_started</span>
            </div>

            {/* Role / Company */}
            <h3 className="text-[var(--success-color)] font-bold text-xs md:text-base flex flex-wrap items-center gap-1 md:gap-2">
                <span>{'{'} {experience.role} {'}'}</span>
                <span className="text-[var(--text-secondary)] font-normal text-[10px] md:text-sm">@ {experience.company}</span>
            </h3>

            {/* Description */}
            <p className="text-[var(--text-primary)] mt-1 md:mt-2 leading-tight md:leading-relaxed opacity-80 text-[10px] md:text-sm text-wrap break-words block">
                {'>'} {experience.description}
            </p>

            {/* Tech Added */}
            <div className="flex flex-wrap gap-1 md:gap-2 mt-2 md:mt-3">
                {experience.technologies.slice(0, 5).map((tech, i) => ( /* Limiting tags on mobile if needed, or just standardizing size */
                    <span key={i} className="text-[9px] md:text-[10px] text-[var(--text-primary)] bg-[var(--bg-tertiary)] px-1 md:px-1.5 py-0.5 rounded border border-[var(--border-color)] opacity-80">
                        {tech}
                    </span>
                ))}
                {experience.technologies.length > 5 && (
                    <span className="text-[9px] md:text-[10px] text-[var(--text-secondary)] py-0.5 opacity-60">+{experience.technologies.length - 5} more</span>
                )}
            </div>
        </motion.div>
    );
};

const TechStack = () => {
    if (!EXPERIENCES || EXPERIENCES.length === 0) {
        return (
            <div className="p-8 pb-20 max-w-4xl mx-auto custom-scrollbar text-center text-[var(--text-secondary)] font-mono">
                /var/log/career.log: No entries found.
            </div>
        );
    }

    return (
        <div className="p-0 md:p-8 max-w-4xl mx-auto custom-scrollbar">
            <div className="flex items-center gap-2 mb-4 md:mb-8 border-b border-[var(--border-color)] pb-2 md:pb-4 px-2 md:px-0">
                <Terminal size={18} md:size={20} className="text-[var(--accent-color)]" />
                <h2 className="text-lg md:text-xl font-bold text-[var(--text-primary)] font-mono">
                    /var/log/career.log
                </h2>
            </div>

            <div className="bg-[var(--bg-secondary)] p-3 md:p-6 rounded-lg border border-[var(--border-color)] shadow-inner min-h-[500px]">
                {EXPERIENCES.map((exp, index) => (
                    <LogEntry key={index} experience={exp} index={index} />
                ))}

                <div className="mt-6 md:mt-8 pt-4 border-t border-[var(--border-color)] border-dashed text-[10px] md:text-xs text-[var(--text-secondary)] font-mono animate-pulse">
                    _ cursor_active... waiting for next role...
                </div>
            </div>
        </div>
    );
};

export default TechStack;
