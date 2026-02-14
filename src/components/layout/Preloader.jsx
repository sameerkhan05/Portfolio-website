import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
    "Hello",
    "Namaste",          // Hindi
    "Assalam-o-Alaikum",// Urdu/Muslim
    "Sat Sri Akal",     // Punjabi
    "Vanakkam",         // Tamil
    "Khushamdeed",      // Welcome (Urdu)
    "System Ready"
];

const Preloader = ({ onComplete }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => {
                if (prev === greetings.length - 1) {
                    clearInterval(timer);
                    setTimeout(onComplete, 600);
                    return prev;
                }
                return prev + 1;
            });
        }, 300); // 300ms cycle

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#010409] text-white">
            <AnimatePresence mode='wait'>
                <motion.h1
                    key={greetings[index]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="text-4xl md:text-6xl font-mono font-bold tracking-tighter flex items-center gap-2"
                >
                    <span className="text-[var(--accent-color)]">{'>'}</span>
                    {greetings[index]}
                    <span className="animate-pulse w-3 h-8 bg-[var(--accent-color)] ml-1 inline-block" />
                </motion.h1>
            </AnimatePresence>
        </div>
    );
};

export default Preloader;
