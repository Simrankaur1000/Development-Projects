'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // Fallback for browsers that do not support the Document View Transitions API
    if (
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      updateTheme(nextTheme);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      updateTheme(nextTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: nextTheme === 'dark' ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 500,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement:
            nextTheme === 'dark'
              ? '::view-transition-new(root)'
              : '::view-transition-old(root)',
        }
      );
    });
  };

  const updateTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return (
      <button
        aria-label="Toggle Theme"
        className="relative flex items-center justify-center w-10 h-10 rounded-full border border-border/40 glass-panel bg-transparent opacity-0"
      >
        <span className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-border/30 glass-panel bg-transparent text-foreground hover:text-primary transition-all duration-300 hover:border-primary/40 hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        {/* Sun Icon */}
        <span
          className={`absolute inset-0 flex items-center justify-center transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            theme === 'dark'
              ? 'translate-y-8 rotate-45 opacity-0'
              : 'translate-y-0 rotate-0 opacity-100'
          }`}
        >
          <Sun className="w-5 h-5 stroke-[1.5]" />
        </span>
        {/* Moon Icon */}
        <span
          className={`absolute inset-0 flex items-center justify-center transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            theme === 'dark'
              ? 'translate-y-0 rotate-0 opacity-100'
              : '-translate-y-8 -rotate-45 opacity-0'
          }`}
        >
          <Moon className="w-5 h-5 stroke-[1.5]" />
        </span>
      </div>
      {/* Decorative Glow */}
      <span className="absolute inset-0 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />
    </button>
  );
}
