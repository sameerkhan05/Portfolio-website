import React from 'react';
import { Terminal, Activity, Server, Database, Cpu, Shield, Wifi } from 'lucide-react';

const NavItem = ({ sectionId, label, icon: Icon, active, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center w-full py-2 transition-all duration-300 gap-1 group relative ${active ? 'text-[var(--accent-color)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
        >
            {/* Active Indicator Glow */}
            {active && (
                <div className="absolute -top-1 w-8 h-1 bg-[var(--accent-color)] rounded-b-full shadow-[0_0_10px_var(--accent-color)] opacity-80" />
            )}

            <Icon size={active ? 24 : 20} className={`transition-all duration-300 ${active ? 'scale-110 drop-shadow-[0_0_5px_rgba(var(--accent-color),0.5)]' : 'group-hover:scale-110'}`} />
            <span className={`text-[10px] font-mono uppercase truncate w-full text-center transition-all ${active ? 'font-bold opacity-100' : 'opacity-70'}`}>
                {label}
            </span>
        </button>
    );
};

const MobileNav = () => {
    const [activeSection, setActiveSection] = React.useState('root-interface');

    React.useEffect(() => {
        const handleScroll = () => {
            const sections = ['root-interface', 'system-logs', 'active-services', 'performance', 'network-gate'];
            const container = document.getElementById('main-scroll-container');

            if (!container) return;

            // Simple intersection check or offset check
            // Using scroll position relative to sections
            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If section is in the middle of the viewport (approx)
                    if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                        setActiveSection(sectionId);
                        break;
                    } else if (rect.top < 0 && rect.bottom > window.innerHeight / 2) {
                        setActiveSection(sectionId); // Still inside the section
                        break;
                    }
                }
            }
        };

        const container = document.getElementById('main-scroll-container');
        if (container) {
            container.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial check
        }
        return () => container && container.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
        }
    };

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--bg-secondary)]/80 backdrop-blur-xl border-t border-[var(--border-color)] z-50 px-2 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-around h-16 relative">
                <NavItem
                    sectionId="root-interface"
                    label="Home"
                    icon={Database}
                    active={activeSection === 'root-interface'}
                    onClick={() => scrollToSection('root-interface')}
                />
                <NavItem
                    sectionId="system-logs"
                    label="Skills"
                    icon={Activity}
                    active={activeSection === 'system-logs'}
                    onClick={() => scrollToSection('system-logs')}
                />
                <NavItem
                    sectionId="active-services"
                    label="Projects"
                    icon={Server}
                    active={activeSection === 'active-services'}
                    onClick={() => scrollToSection('active-services')}
                />
                <NavItem
                    sectionId="performance"
                    label="Stats"
                    icon={Cpu}
                    active={activeSection === 'performance'}
                    onClick={() => scrollToSection('performance')}
                />
                <NavItem
                    sectionId="network-gate"
                    label="Contact"
                    icon={Wifi}
                    active={activeSection === 'network-gate'}
                    onClick={() => scrollToSection('network-gate')}
                />
            </div>
            {/* Safe area padding for iPhones with home indicator */}
            <div className="h-safe-bottom w-full" />
        </div>
    );
};

export default MobileNav;
