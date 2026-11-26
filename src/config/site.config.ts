export type SocialPlatform = 'telegram' | 'instagram' | 'whatsapp' | 'youtube' | 'github';

export type FeaturedIconName =
  | 'youtube'
  | 'telegram'
  | 'instagram'
  | 'whatsapp'
  | 'folder'
  | 'gamepad'
  | 'globe'
  | 'code';

export interface FeaturedLinkItem {
  id: string;
  title: string;
  description: string;
  url: string | null;
  icon: FeaturedIconName;
  enabled: boolean;
  featured: boolean;
  order: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  url: string | null;
  tag?: string;
  enabled: boolean;
}

export interface SiteConfig {
  profile: {
    name: string;
    username: string;
    tagline: string;
    bio: string;
    avatar: string | null;
    location: string | null;
  };
  socials: Record<SocialPlatform, string | null>;
  featuredLinks: FeaturedLinkItem[];
  projects: ProjectItem[];
  contact: {
    emails: string[];
  };
  seo: {
    title: string;
    description: string;
  };
  theme: {
    defaultMode: 'dark' | 'light';
  };
}

/**
 * Centralized configuration for Web3Gamer Link Hub.
 * Update your profile details, social URLs, featured links, and projects here.
 * Leave unknown or unconfigured URLs as `null` — they will be hidden automatically.
 */
export const siteConfig: SiteConfig = {
  profile: {
    name: 'Web3Gamer',
    username: '@web3gamer',
    tagline: 'Creator. Gamer. Developer.',
    bio: 'Building digital experiences, exploring Web3, creating gaming content and developing useful tools.',
    avatar: '/images/web3gamer-avatar.svg',
    location: null, // Optional: e.g., 'Remote'
  },
  socials: {
    telegram: 'https://t.me/Web3xGamer',
    instagram: 'https://www.instagram.com/Live_wale_lode_pe/',
    whatsapp: null, // Keep null until configured
    youtube: 'https://www.youtube.com/@SuNxSlayz',
    github: 'https://github.com/web0999',
  },
  featuredLinks: [
    {
      id: 'youtube-channel',
      title: 'My YouTube Channel',
      description: 'Gameplay, devlogs, and deep dives into gaming & tech.',
      url: 'https://www.youtube.com/@SuNxSlayz',
      icon: 'youtube',
      enabled: true,
      featured: true,
      order: 1,
    },
    {
      id: 'join-telegram',
      title: 'Join My Telegram',
      description: 'Community updates, announcements, and direct discussions.',
      url: 'https://t.me/Web3xGamer',
      icon: 'telegram',
      enabled: true,
      featured: true,
      order: 2,
    },
    {
      id: 'instagram-profile',
      title: 'Instagram Profile',
      description: 'Behind-the-scenes clips, setups, and daily highlights.',
      url: 'https://www.instagram.com/Live_wale_lode_pe/',
      icon: 'instagram',
      enabled: true,
      featured: false,
      order: 3,
    },
    {
      id: 'github-profile',
      title: 'GitHub Profile',
      description: 'Open-source repositories, tools, and active experiments.',
      url: 'https://github.com/web0999',
      icon: 'code',
      enabled: true,
      featured: false,
      order: 4,
    },
    {
      id: 'my-projects',
      title: 'Web3Gamer LinkHub Repo',
      description: 'Source code, NEXUS 3D motion system, and deployment setup on GitHub.',
      url: 'https://github.com/web0999/web3gamer-linkhub',
      icon: 'folder',
      enabled: true,
      featured: false,
      order: 5,
    },
    {
      id: 'gaming-content',
      title: 'Gaming Content',
      description: 'Curated setups, highlights, and Web3 gaming notes.',
      url: '#projects',
      icon: 'gamepad',
      enabled: true,
      featured: false,
      order: 6,
    },
  ],
  projects: [
    {
      id: 'sample-project-1',
      title: 'Project Slot 1',
      description: 'Configure your own development or gaming project in src/config/site.config.ts.',
      image: null,
      url: null,
      tag: 'Editable',
      enabled: false,
    },
    {
      id: 'sample-project-2',
      title: 'Project Slot 2',
      description: 'Configure your own stream overlay, modpack, or Web3 app in src/config/site.config.ts.',
      image: null,
      url: null,
      tag: 'Editable',
      enabled: false,
    },
  ],
  contact: {
    emails: ['froukkkje@gmail.com', 'ucmaker96@gmail.com'],
  },
  seo: {
    title: 'Web3Gamer — Creator | Gamer | Developer',
    description:
      'Official personal link hub for Web3Gamer. Connect across platforms and explore development & gaming projects.',
  },
  theme: {
    defaultMode: 'dark',
  },
};

