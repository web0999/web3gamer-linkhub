import { useEffect, useState } from 'react';
import { FeaturedLinks } from './components/FeaturedLinks';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ProfileHero } from './components/ProfileHero';
import { ProjectGrid } from './components/ProjectGrid';
import { QRCodeModal } from './components/QRCodeModal';
import { ShareControls } from './components/ShareControls';
import { SocialLinks } from './components/SocialLinks';
import { siteConfig } from './config/site.config';

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('web3gamer-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return siteConfig.theme.defaultMode;
  });

  const [shareOpen, setShareOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('web3gamer-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.title = siteConfig.seo.title;
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Ambient top gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,var(--accent-glow),transparent_70%)]"
      />

      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenShare={() => setShareOpen(true)}
        onOpenQR={() => setQrOpen(true)}
      />

      <main className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ProfileHero />
        <SocialLinks />
        <FeaturedLinks />
        <ProjectGrid />
        <Footer />
      </main>

      <ShareControls isOpen={shareOpen} onClose={() => setShareOpen(false)} />
      <QRCodeModal isOpen={qrOpen} onClose={() => setQrOpen(false)} />
    </div>
  );
}

export default App;
