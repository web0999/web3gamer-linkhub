import React from 'react';
import { Moon, Sun, Share2, QrCode } from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenShare: () => void;
  onOpenQR: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  onOpenShare,
  onOpenQR,
}) => {
  return (
    <header
      id="top"
      className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="font-display flex items-center gap-2.5 text-sm font-bold tracking-wider uppercase text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500 rounded-md"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600/15 border border-violet-500/30 text-violet-500 font-extrabold text-xs">
            W3
          </span>
          <span>WEB3GAMER</span>
        </a>

        <nav aria-label="Primary navigation" className="hidden sm:flex items-center gap-6 text-sm font-medium text-[var(--text-secondary)]">
          <a
            href="#links"
            className="transition-colors hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500 rounded"
          >
            Links
          </a>
          <a
            href="#projects"
            className="transition-colors hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500 rounded"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="transition-colors hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500 rounded"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenQR}
            aria-label="Show QR code"
            title="Show QR code"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 cursor-pointer"
          >
            <QrCode className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={onOpenShare}
            aria-label="Share this page"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-violet-600 px-3 text-xs font-semibold text-white transition-all hover:bg-violet-500 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </header>
  );
};

