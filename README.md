# Web3Gamer — Personal Link Hub

**Live Website**: https://web3gamer-linkhub.froukkkje.workers.dev/  
**GitHub Repository**: https://github.com/web0999/web3gamer-linkhub

A modern, high-craft personal link hub for **Web3Gamer** (`Creator | Gamer | Developer`), built with React, TypeScript, Vite, and Tailwind CSS v4.

## Features

- **Centralized Configuration**: Edit `src/config/site.config.ts` to update profile details, social links, featured cards, projects, and SEO metadata without touching React components.
- **Smart Link Validation**: Unconfigured (`null`) or invalid URLs and WhatsApp numbers are automatically hidden rather than rendered as broken links.
- **Theme Toggle**: Dark-first graphite UI with a light mode toggle persisted in `localStorage`.
- **Share & QR Code**: Native Web Share API support, Clipboard API copy with fallback, and an instant QR code modal for mobile sharing.
- **Accessible & Responsive**: Keyboard-navigable, reduced-motion aware (`prefers-reduced-motion`), and optimized for mobile and desktop viewports.

## Local Development

```bash
npm install
npm run dev
```

## Build & Verification

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Documentation

- [Project Architecture](./PROJECT_ARCHITECTURE.md)
- [Social Configuration Guide](./SOCIAL_CONFIGURATION_GUIDE.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Test Report](./TEST_REPORT.md)
