import { NavItem, Service } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: '01. SERVICES', href: '#services' },
  { label: '02. ORACLE', href: '#system' },
  { label: '03. CONTACT', href: '#footer' },
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'SAAS & APP DEV',
    description: 'Full-cycle engineering for scalable cloud architectures and mobile ecosystems.',
    icon: 'Database',
    image: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=1600&auto=format&fit=crop&sat=-100' // Servers
  },
  {
    id: 's2',
    title: 'FRONTEND ENG.',
    description: 'Pixel-perfect React & Next.js implementations with fluid motion physics.',
    icon: 'Code',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1600&auto=format&fit=crop&sat=-100' // Code screen
  },
  {
    id: 's3',
    title: 'UX/UI & DESIGN',
    description: 'Human-centric interfaces backed by rigorous behavioral research systems.',
    icon: 'PenTool',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1600&auto=format&fit=crop&sat=-100' // Wireframes
  },
  {
    id: 's4',
    title: 'CREATIVE STUDIO',
    description: 'High-fidelity branding, motion graphics, and 3D visual assets.',
    icon: 'Aperture',
    isComingSoon: true,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop&sat=-100' // Abstract
  },
  {
    id: 's5',
    title: 'ENTERPRISE SOL.',
    description: 'Custom ERPs and automation pipelines for large-scale operations.',
    icon: 'Briefcase',
    isComingSoon: true,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop&sat=-100' // Building
  },
  {
    id: 's6',
    title: 'CUSTOM STRATEGY',
    description: 'Bespoke technical consultation and digital transformation roadmaps.',
    icon: 'Zap',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop&sat=-100' // Network
  }
];

export const SYSTEM_INSTRUCTION = `
You are CLEVRON [SYSTEM_V.25], the digital oracle for Clevron Tech.
Clevron Tech is a premium software consultancy specializing in high-velocity engineering and aesthetic precision.
Your tone is sharp, professional, and slightly futuristic.
You assist users with inquiries about Web Development, UI/UX, and Enterprise Software.
Do not hallucinate services we do not provide.
Theme: Industrial, Precision, High-Tech.
`;