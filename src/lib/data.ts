import { Project, Skill } from '../types';

// TODO: `liveUrl` and `githubUrl` were removed from every project because no
// genuine public demo exists and the repositories are private. Both fields are
// still optional on Project and ProjectsSection only renders a button when the
// value is present, so add them back per project once a real App Store / Play
// Store / deployment URL or a real repository URL is available. Never point
// them at a placeholder domain or at the GitHub profile root.
// TODO: the four `image` values below are Unsplash stock photography, not the
// actual products. Replace each with a real screenshot committed to /public
// (e.g. '/projects/second-phone.webp', sized for the ~2:1 card slot). Until
// then next.config.ts must keep the images.unsplash.com remote pattern.
export const projects: Project[] = [
  {
    id: '1',
    title: 'Second Phone Number App',
    description: 'A comprehensive mobile application featuring Twilio API integration for virtual numbers, voice calling, SMS messaging, and subscription billing system.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    techStack: ['React Native', 'Twilio API', 'Firebase', 'Subscription Billing']
  },
  {
    id: '2',
    title: 'AI-Powered App Suite',
    description: 'Complete AI application suite including Plagiarism Remover, Maya AI chatbot, Text Summarizer, Humanizer, and Essay Generator with advanced NLP capabilities.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    techStack: ['React Native', 'Next.js', 'OpenAI API', 'NLP', 'Firebase']
  },
  {
    id: '3',
    title: 'Health & Fitness iOS App',
    description: 'iOS health application with Apple HealthKit integration, real-time step tracking, serving 10K+ users with comprehensive fitness tracking and 4.8⭐ rating.',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
    techStack: ['React Native', 'iOS', 'HealthKit', 'Firebase']
  },
  {
    id: '4',
    title: 'AI Outfit Visualization App',
    description: 'Innovative mobile and web application featuring AI photo overlay technology for virtual clothing try-on with social sharing capabilities.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    techStack: ['React Native', 'Next.js', 'AI Image Processing', 'OpenAI API', 'Firebase']
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
