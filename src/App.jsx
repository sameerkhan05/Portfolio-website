import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import Hero from './components/sections/Hero';
import TechStack from './components/sections/TechStack';
import ProjectGrid from './components/sections/ProjectGrid';
import LeetCodeDashboard from './components/sections/LeetCodeDashboard';
import ContactForm from './components/sections/ContactForm';
import Preloader from './components/layout/Preloader';
import { incrementViewCount } from './utils/viewCounter';

import MobileNav from './components/layout/MobileNav';
import MobileStatusBanner from './components/layout/MobileStatusBanner';

const App = () => {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setLoading(false);
    // Track visitor after preloader completes
    incrementViewCount();
  };

  return (
    <>
      {loading ? (
        <Preloader onComplete={handlePreloaderComplete} />
      ) : (
        <Router>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              className: '',
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-text)',
                border: '1px solid var(--toast-border)',
                padding: '8px 12px',
                fontSize: '0.75rem', // Smaller font for mobile by default
                maxWidth: '90vw',    // Ensure it doesn't overflow small screens
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                fontFamily: 'var(--font-mono)',
              },
              success: {
                iconTheme: {
                  primary: 'var(--success-color)',
                  secondary: 'var(--toast-bg)',
                },
              },
              error: {
                iconTheme: {
                  primary: 'var(--error-color)',
                  secondary: 'var(--toast-bg)',
                },
              },
            }}
          />
          <div className="flex h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans overflow-hidden transition-colors duration-300">
            <Sidebar />

            {/* Mobile Navigation (Bottom Bar) */}
            <MobileNav />

            <div className="flex flex-col flex-1 min-w-0 relative">
              <TopBar />
              {/* Main Content Area - Scrollable */}
              <div className="flex-1 overflow-y-auto p-0 scroll-smooth pb-16 md:pb-0 no-scrollbar md:custom-scrollbar" id="main-scroll-container">
                <div className="max-w-7xl mx-auto w-full">
                  <MobileStatusBanner />
                  <section id="root-interface" className="min-h-[80vh] md:min-h-screen flex flex-col justify-start pt-0 md:justify-center ">
                    <Hero />
                  </section>

                  <section id="system-logs" className="py-2 md:py-8 px-3 md:px-8">
                    <TechStack />
                  </section>

                  <section id="active-services" className="py-2 md:py-8 px-3 md:px-8">
                    <ProjectGrid />
                  </section>

                  <section id="performance" className="py-2 md:py-8 px-3 md:px-8">
                    <LeetCodeDashboard />
                  </section>

                  <section id="network-gate" className="py-2 md:py-8 px-3 md:px-8">
                    <ContactForm />
                  </section>

                  <footer className="py-8 text-center text-[var(--text-secondary)] text-sm font-mono border-t border-[var(--border-color)] mb-16 md:mb-0">
                    <p>System Status: ONLINE | 2.01</p>
                    <p className="mt-2 opacity-50">&copy; {new Date().getFullYear()} Sameer Khan. All rights reserved.</p>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </Router>
      )}
    </>
  );
};

export default App;
