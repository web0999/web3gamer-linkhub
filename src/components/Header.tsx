import React, { useState } from 'react';
import { Menu, Moon, QrCode, Share2, Sun, X } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Identity', href: '#top' },
    { label: 'Universe', href: '#socials' },
    { label: 'Showcase', href: '#links' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed inset-x-0 top-4 z-40 px-4 sm:px-6">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 px-4 sm:px-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <a
          href="#top"
          className="font-display flex items-center gap-2.5 text-xs sm:text-sm font-extrabold tracking-widest uppercase text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 rounded-full"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-violet-600 text-[10px] font-black text-white shadow-[0_0_14px_rgba(34,211,238,0.45)]">
            W3
          </span>
          <span>WEB3GAMER</span>
        </a>

        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 rounded"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onOpenQR}
            aria-label="Show QR code"
            title="Show QR code"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)]/70 text-[var(--text-secondary)] transition-colors hover:border-cyan-400/50 hover:text-cyan-400 cursor-pointer"
          >
            <QrCode className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)]/70 text-[var(--text-secondary)] transition-colors hover:border-cyan-400/50 hover:text-cyan-400 cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>

          <button
            type="button"
            onClick={onOpenShare}
            aria-label="Share this page"
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-3.5 text-xs font-semibold text-white shadow-[0_0_16px_rgba(34,211,238,0.3)] transition-all hover:brightness-110 active:scale-[0.97] cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-5xl rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/95 p-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-semibold text-[var(--text-primary)]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-[var(--bg-surface-hover)] hover:text-cyan-400"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
