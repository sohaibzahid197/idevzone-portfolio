import { Project, Skill } from '../types';

export interface Testimonial {
  id: string;
  job: string;
  period: string;
  headline: string;
  quote: string;
  endorsements: string[];
}

// Verbatim Upwork reviews (5.0 each). The Phase 2 review is trimmed where it
// named the client's product, so no card reads as client work.
export const testimonials: Testimonial[] = [
  {
    id: 'phase-2',
    job: 'Senior Mobile App Developer — Native iOS/Android Phase 2 MVP',
    period: 'Jun – Aug 2026',
    headline: 'There\u2019s no one better for the job.',
    quote: 'Working with Sohaib has been an exceptional experience from start to finish. He is punctual, reliable, highly communicative, and always made sure I understood what was happening throughout the development process. What stood out most was how fair and transparent he was. Any changes, challenges, or additional work were communicated clearly, and he was always extremely reasonable when it came to negotiating scope and cost. I never felt like I was being taken advantage of \u2014 I genuinely felt like he cared about the success of the project. \u2026 I would recommend Sohaib without hesitation to anyone looking for a skilled, trustworthy developer who takes pride in his work. \u2026 As far as I\u2019m concerned, there\u2019s no one better for the job.',
    endorsements: ['Native App', 'iOS Development', 'Mobile App Development', 'Reliable']
  },
  {
    id: 'store-launch',
    job: 'Senior React Native (Expo) Dev — Security Hardening, UI Polish & App Stores Launch',
    period: 'Feb – Jun 2026',
    headline: 'Expertly navigated the submission processes for both the App Store and Google Play.',
    quote: 'Sohaib is an outstanding mobile developer who delivered excellent results on our React Native application. He successfully managed the technical build and expertly navigated the submission processes for both the App Store and Google Play. His communication is consistently clear, and he handles project milestones and administrative details with complete professionalism and integrity. He is highly skilled, reliable, and a valuable asset to any development project. I highly recommend him.',
    endorsements: ['Reliable', 'Clear Communicator', 'Professional']
  },
  {
    id: 'phase-1',
    job: 'Senior Mobile App Developer — Native iOS/Android Phase 1 MVP',
    period: 'May – Jun 2026',
    headline: 'He delivers results quickly, pays attention to detail, and takes pride in his work.',
    quote: 'Sohaib has been an absolute pleasure to work with throughout the development of our app. From day one, he has been highly communicative, responsive, and committed to delivering quality work. What impressed me most was his ability to work efficiently without sacrificing quality. He delivers results quickly, pays attention to detail, and takes pride in his work. Whenever challenges arose, he approached them with a solution-oriented mindset and worked collaboratively to find the best path forward. He has also been very respectful of our budget, helping us prioritize features and identify cost-effective solutions without compromising the overall vision of the project. As a startup founder, that level of flexibility and transparency has been incredibly valuable. I would not hesitate to work with him again (already starting another contract with him) and would confidently recommend him to anyone looking for a skilled developer who delivers high-quality results.',
    endorsements: ['Committed to Quality', 'Solution Oriented', 'Clear Communicator', 'Detail Oriented']
  }
];

// Posters live in /public/projects and are 16:9 (1600x900). Store links are
// only set for apps that are actually published; a card renders a button per
// link that is present, so an unreleased app simply shows its poster.
export const projects: Project[] = [
  {
    id: 'biteset',
    title: 'BiteSet — Meal Plan & Nutrition',
    description: 'Personalised meal plans that balance your macros without calorie counting, with one-tap grocery lists, dish swaps and progress tracking. Backed by a custom API of 195 endpoints and an admin dashboard.',
    image: '/projects/biteset-poster.jpg',
    techStack: ['React Native', 'Node.js', 'Express', 'Prisma', 'PostgreSQL'],
    appStoreUrl: 'https://apps.apple.com/us/app/biteset-meal-plan-nutrition/id6805219049',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.biteset.app'
  },
  {
    id: 'miriver',
    title: 'MiRiver — Live Traffic & Community',
    description: 'Real-time community traffic app with a live map, incident reports that expire automatically, a community feed and a points-and-tiers reward system, managed from a Next.js admin panel.',
    image: '/projects/miriver-poster.jpg',
    techStack: ['React Native', 'Expo', 'Firebase', 'Google Maps', 'Next.js'],
    appStoreUrl: 'https://apps.apple.com/ca/app/miriver/id6768277150',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=ca.miriver.app'
  },
  {
    id: 'stepura',
    title: 'Stepura — Walking Step Tracker',
    description: 'Turns daily walking into virtual expeditions with streaks, challenges and insights. Uses a custom Kotlin native module for hardware step counting and ships in multiple languages.',
    image: '/projects/stepura-poster.jpg',
    techStack: ['React Native', 'Kotlin Native Module', 'TypeScript', 'i18n'],
    appStoreUrl: 'https://apps.apple.com/us/app/stepura-walking-step-tracker/id6806730489',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.stepura'
  },
  {
    id: 'pastlight',
    title: 'PastLight — AI Photo Restoration',
    description: 'Restores old, scratched and faded photos with AI: repairs damage, sharpens faces and colourises, with a before/after slider and a personal gallery.',
    image: '/projects/pastlight-poster.jpg',
    techStack: ['React Native', 'Expo', 'AI Image Processing', 'In-App Purchases'],
    appStoreUrl: 'https://apps.apple.com/us/app/pastlight-photo-restoration/id6813961505',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.idevzone.pastlight'
  },
  {
    id: 'inobill',
    title: 'InoBill — Invoice & Receipt Maker',
    description: 'Create, preview and send professional invoices and estimates, track clients and payments, and see reports at a glance.',
    image: '/projects/inobill-poster.jpg',
    techStack: ['React Native', 'TypeScript', 'Firestore', 'PDF Generation'],
    appStoreUrl: 'https://apps.apple.com/us/app/inobill-invoice-receipt-maker/id6812770338',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.idevzone.inobill'
  },
  {
    id: 'halallenz',
    title: 'HalalLenz — Halal Ingredient Scanner',
    description: 'Scan a barcode or photograph an ingredient list and get a clear verdict — Halal, Doubtful or Not halal — with the ingredient that decided it, following your own school of thought.',
    image: '/projects/halallenz-poster.jpg',
    techStack: ['React Native', 'Expo', 'AI Vision', 'Barcode Scanning']
  },
  {
    id: 'pethealth',
    title: 'PetVera — Pet Vaccine & Health Records',
    description: 'Keeps every pet\'s vaccinations, medications, weight and documents in one place, with reminders and records ready to show the vet or boarding.',
    image: '/projects/pethealth-poster.jpg',
    techStack: ['React Native', 'TypeScript', 'Local Notifications', 'PDF Export']
  },
  {
    id: 'timberlens',
    title: 'TimberLens — Wood & Furniture ID',
    description: 'Point the camera at wood or furniture and AI identifies the species, style and estimated value, with restoration and build guides.',
    image: '/projects/timberlens-poster.jpg',
    techStack: ['React Native', 'TypeScript', 'Firebase', 'AI Vision']
  }
];

export const skills: Skill[] = [
  // Mobile Development
  { name: 'React Native', label: 'React Native', category: 'mobile', color: '#61dafb' },
  { name: 'iOS', label: 'iOS', category: 'mobile', color: '#a3aaae' },
  { name: 'Android', label: 'Android', category: 'mobile', color: '#3ddc84' },
  { name: 'macOS', label: 'macOS', category: 'mobile', color: '#a3aaae' },

  // Frontend
  { name: 'React.js', label: 'React.js', category: 'frontend', color: '#61dafb' },
  { name: 'Next.js', label: 'Next.js', category: 'frontend', color: '#ffffff' },
  { name: 'TypeScript', label: 'TypeScript', category: 'frontend', color: '#3178c6' },
  { name: 'Tailwind CSS', label: 'Tailwind CSS', category: 'frontend', color: '#38bdf8' },
  { name: 'GSAP', label: 'GSAP', category: 'frontend', color: '#0ae448' },
  { name: 'Framer Motion', label: 'Framer Motion', category: 'frontend', color: '#0055ff' },

  // Backend
  { name: 'Node.js', label: 'Node.js', category: 'backend', color: '#5fa04e' },
  { name: 'Express.js', label: 'Express.js', category: 'backend', color: '#9ca3af' },
  { name: 'REST APIs', label: 'REST APIs', category: 'backend', color: '#3b82f6' },
  { name: 'GraphQL', label: 'GraphQL', category: 'backend', color: '#e10098' },
  { name: 'Firebase', label: 'Firebase', category: 'backend', color: '#ffca28' },

  // Database
  { name: 'Firebase Firestore', label: 'Firebase Firestore', category: 'database', color: '#ffa000' },
  { name: 'MongoDB', label: 'MongoDB', category: 'database', color: '#47a248' },
  { name: 'MySQL', label: 'MySQL', category: 'database', color: '#4479a1' },
  { name: 'SQLite', label: 'SQLite', category: 'database', color: '#0f80cc' },

  // Everything below shares the 'tools' category because SkillsSection only
  // configures five cards. The sub-headings are the intended grouping and
  // should become real categories once that section has matching config.

  // Cloud & DevOps
  { name: 'AWS', label: 'AWS', category: 'tools', color: '#ff9900' },
  { name: 'Firebase Hosting', label: 'Firebase Hosting', category: 'tools', color: '#f57c00' },
  { name: 'Docker', label: 'Docker', category: 'tools', color: '#2496ed' },
  { name: 'Git', label: 'Git', category: 'tools', color: '#f05032' },

  // AI/ML
  { name: 'OpenAI API', label: 'OpenAI API', category: 'tools', color: '#10a37f' },
  { name: 'NLP', label: 'NLP', category: 'tools', color: '#8b5cf6' },
  { name: 'Image Processing', label: 'Image Processing', category: 'tools', color: '#ec4899' },
  { name: 'Summarization', label: 'Summarization', category: 'tools', color: '#a855f7' },

  // Payment & Monetization
  { name: 'IAP', label: 'IAP', category: 'tools', color: '#22c55e' },
  { name: 'AdMob', label: 'AdMob', category: 'tools', color: '#ea4335' },
  { name: 'Subscription Models', label: 'Subscription Models', category: 'tools', color: '#14b8a6' },

  // Tools
  { name: 'Xcode', label: 'Xcode', category: 'tools', color: '#1575f9' },
  { name: 'Android Studio', label: 'Android Studio', category: 'tools', color: '#4285f4' },
  { name: 'VS Code', label: 'VS Code', category: 'tools', color: '#007acc' },
  { name: 'Postman', label: 'Postman', category: 'tools', color: '#ff6c37' },
  { name: 'Figma', label: 'Figma', category: 'tools', color: '#f24e1e' }
];

// Single source for the scrolling tech band, so Marquee never drifts from skills.
export const techStackNames: string[] = skills.map((skill) => skill.label);
