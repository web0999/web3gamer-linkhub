# Project Architecture

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons**: `lucide-react` + custom SVG platform icons (`src/components/PlatformIcons.tsx`)
- **QR Generation**: `qrcode.react`

## Directory Structure

```text
├── public/
│   ├── 404.html          # Static 404 fallback
│   ├── favicon.svg       # Brand favicon
│   ├── og-image.svg      # Open Graph social preview image
│   ├── robots.txt        # Crawler rules
│   └── sitemap.xml       # Sitemap
├── src/
│   ├── components/
│   │   ├── FeaturedLinks.tsx   # Ordered, toggleable featured link cards
│   │   ├── Footer.tsx          # Direct contact (WhatsApp/Telegram/Email) & copyright
│   │   ├── Header.tsx          # Brand mark, nav, QR, theme toggle, share
│   │   ├── PlatformIcons.tsx   # Telegram, Instagram, WhatsApp, YouTube, GitHub SVGs
│   │   ├── ProfileHero.tsx     # Avatar with initials fallback, name, tagline, bio
│   │   ├── ProjectGrid.tsx     # Bento-style project showcase
│   │   ├── QRCodeModal.tsx     # Modal rendering QRCodeSVG for current URL
│   │   └── ShareControls.tsx   # Web Share API + Clipboard copy modal
│   ├── config/
│   │   └── site.config.ts      # Single source of truth for all site content
│   ├── utils/
│   │   └── validation.ts       # URL, WhatsApp, and email validation helpers
│   ├── App.tsx                 # Root layout and theme state
│   ├── index.css               # Tailwind v4 import, CSS variables, animations
│   └── main.tsx                # React entry point
└── .github/workflows/
    └── deploy.yml              # GitHub Pages deployment workflow (fallback)
```

