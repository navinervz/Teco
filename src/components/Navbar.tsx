import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show when near the very top of the page
      if (currentScrollY < 50) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 70) {
        // Scrolling down -> fade out
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up -> appear smoothly
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 pointer-events-none transition-all duration-300 ease-out flex justify-center pt-6 sm:pt-8 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
      }`}
    >
      {/* Pure Centerpiece TECO Brand Wordmark in Sapphire Blue (No dots, no background menu, no extra text) */}
      <a 
        href="#hero" 
        className="pointer-events-auto group focus:outline-none select-none inline-block px-4 py-1"
        aria-label="TECO"
      >
        <span className="font-black text-2xl sm:text-3xl font-mono tracking-[0.3em] uppercase text-sapphire-glow transition-all duration-300 group-hover:scale-105 inline-block">
          TECO
        </span>
      </a>
    </header>
  );
};
