# Social & Content Configuration Guide

All profile information, social links, featured cards, and projects are managed in `src/config/site.config.ts`.

## 1. Profile

Update `siteConfig.profile`:

- `name`: Display name (default: `'Web3Gamer'`)
- `username`: Handle shown under the name
- `tagline`: Role/positioning line
- `bio`: Short introduction
- `avatar`: Path to your local image (e.g. `'/avatar.jpg'` placed in `public/`) or `null` for initials fallback
- `location`: Optional location string or `null`

## 2. Social Connections

Update `siteConfig.socials`:

```ts
socials: {
  telegram: 'https://t.me/yourusername',
  instagram: 'https://instagram.com/yourusername',
  whatsapp: '+1234567890', // or 'https://wa.me/1234567890'
  youtube: 'https://youtube.com/@yourusername',
  github: 'https://github.com/yourusername',
}
```

Any platform set to `null` or an invalid URL is automatically hidden.

## 3. Featured Links

Each item in `siteConfig.featuredLinks` supports:

- `title` & `description`
- `url`: External `https://...` URL, `#anchor`, or `null`
- `icon`: `'youtube' | 'telegram' | 'instagram' | 'whatsapp' | 'folder' | 'gamepad' | 'globe' | 'code'`
- `enabled`: `true` or `false`
- `featured`: Highlights the card with a subtle accent ring and badge
- `order`: Numeric sort order

## 4. Projects

Update `siteConfig.projects` with your real builds. Set `enabled: false` to hide any card.

