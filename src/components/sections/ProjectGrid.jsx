import React from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, GitBranch, AlertCircle, Copy, FileJson } from 'lucide-react';
import { PROJECTS } from '../../constants';

const projects = PROJECTS;

const CodeCard = ({ project, index }) => {
    // ... jsonString logic ...

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg overflow-hidden group hover:border-[var(--accent-color)] transition-all shadow-lg w-full flex flex-col h-full"
        >
            {/* Tab Bar */}
            <div className="bg-[var(--bg-tertiary)] px-3 py-2 flex items-center justify-between border-b border-[var(--border-color)] shrink-0">
                <div className="flex items-center gap-2">
                    <FileJson size={14} className="text-yellow-400" />
                    <span className="text-[10px] md:text-xs font-mono text-[var(--text-secondary)] truncate max-w-[150px]">config.json</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--border-color)] group-hover:bg-[var(--text-secondary)]" />
                </div>
            </div>

            {/* Code Area */}
            <div className="p-3 md:p-4 overflow-x-auto custom-scrollbar font-mono text-[10px] md:text-sm leading-relaxed flex-1">
                <pre className="text-[var(--text-primary)]">
                    <span className="text-blue-400">{"{"}</span>
                    <br />
                    <span className="text-pink-400">  "name"</span>: <span className="text-[var(--success-color)] text-wrap break-words">"{project.title || project.name}"</span>,
                    <br />
                    <span className="text-pink-400">  "status"</span>: <span className="text-yellow-400">"stable"</span>,
                    <br />
                    <span className="text-pink-400">  "stack"</span>: [
                    <br />
                    {(project.technologies || project.stack).map((tech, i) => (
                        <React.Fragment key={i}>
                            <span className="text-[var(--text-secondary)]">    "{tech}"</span>{i < (project.technologies?.length || project.stack?.length) - 1 ? ',' : ''}
                            <br />
                        </React.Fragment>
                    ))}
                    <span className="text-[var(--text-primary)]">  ]</span>,
                    <br />
                    <span className="text-pink-400">  "desc"</span>: <span className="text-[var(--text-secondary)] whitespace-pre-wrap break-words">"{project.description}"</span>
                    <br />
                    <span className="text-blue-400">{"}"}</span>
                </pre>
            </div>

            {/* Footer Actions */}
            <div className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] px-4 py-2 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-[10px] md:text-xs text-[var(--text-secondary)] font-mono">
                    <GitBranch size={12} />
                    <span>main</span>
                </div>
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] md:text-xs text-blue-400 hover:text-blue-300 font-mono flex items-center gap-1 cursor-pointer transition-colors"
                >
                    <Terminal size={12} /> git checkout
                </a>
            </div>
        </motion.div>
    );
};

const ProjectGrid = () => {
    const [expanded, setExpanded] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) setExpanded(true); // Auto expand on desktop
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const visibleProjects = expanded ? projects : projects.slice(0, 2);

    return (
        <div className="p-0 md:p-8 max-w-7xl mx-auto">
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8 border-b border-[var(--border-color)] pb-2 md:pb-4 px-2 md:px-0">
                <Code size={18} md:size={24} className="text-blue-500" />
                <div>
                    <h2 className="text-lg md:text-2xl font-bold text-[var(--text-primary)] font-mono">Service Configurations</h2>
                    <p className="text-[10px] md:text-sm text-[var(--text-secondary)] font-mono">Displaying {visibleProjects.length} of {projects.length} modules</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-6 px-2 md:px-0">
                {visibleProjects.map((project, index) => (
                    <CodeCard key={index} project={project} index={index} />
                ))}
            </div>

            {/* Expand / Collapse Button (Mobile Only) */}
            {isMobile && (
                <div className="mt-6 md:mt-8 flex justify-center">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="flex items-center gap-2 px-6 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-xs rounded hover:bg-[var(--bg-tertiary)] transition-colors"
                    >
                        <Terminal size={14} />
                        {expanded ? './collapse_view.sh' : './load_more_modules.sh'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProjectGrid;
