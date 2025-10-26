import { Project, Skill, SocialLink } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Second Phone Number App',
    description: 'A comprehensive mobile application featuring Twilio API integration for virtual numbers, voice calling, SMS messaging, and subscription billing system.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    techStack: ['React Native', 'Twilio API', 'Firebase', 'Subscription Billing'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/sohaibzahid197'
  },
  {
    id: '2',
    title: 'AI-Powered App Suite',
    description: 'Complete AI application suite including Plagiarism Remover, Maya AI chatbot, Text Summarizer, Humanizer, and Essay Generator with advanced NLP capabilities.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    techStack: ['React Native', 'Next.js', 'OpenAI API', 'NLP', 'Firebase'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/sohaibzahid197'
  },
  {
    id: '3',
    title: 'Health & Fitness iOS App',
    description: 'iOS health application with Apple HealthKit integration, real-time step tracking, serving 10K+ users with comprehensive fitness tracking and 4.8⭐ rating.',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
    techStack: ['React Native', 'iOS', 'HealthKit', 'Firebase'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/sohaibzahid197'
  },
  {
    id: '4',
    title: 'AI Outfit Visualization App',
    description: 'Innovative mobile and web application featuring AI photo overlay technology for virtual clothing try-on with social sharing capabilities.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    techStack: ['React Native', 'Next.js', 'AI Image Processing', 'OpenAI API', 'Firebase'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/sohaibzahid197'
  }
];

export const skills: Skill[] = [
  // Mobile Development
  { name: 'React Native', category: 'mobile' },
  { name: 'iOS', category: 'mobile' },
  { name: 'Android', category: 'mobile' },
  { name: 'macOS', category: 'mobile' },
  
  // Frontend
  { name: 'React.js', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  
  // Backend
  { name: 'Node.js', category: 'backend' },
  { name: 'Express.js', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'Firebase', category: 'backend' },
  
  // Database
  { name: 'Firebase Firestore', category: 'database' },
  { name: 'MongoDB', category: 'database' },
  { name: 'MySQL', category: 'database' },
  { name: 'SQLite', category: 'database' },
  
  // Cloud & DevOps
  { name: 'AWS', category: 'tools' },
  { name: 'GCP', category: 'tools' },
  { name: 'Firebase Hosting', category: 'tools' },
  { name: 'Git', category: 'tools' },
  
  // AI/ML
  { name: 'OpenAI API', category: 'tools' },
  { name: 'NLP', category: 'tools' },
  { name: 'Image Processing', category: 'tools' },
  { name: 'Summarization', category: 'tools' },
  
  // Payment & Monetization
  { name: 'IAP', category: 'tools' },
  { name: 'AdMob', category: 'tools' },
  { name: 'Subscription Models', category: 'tools' },
  
  // Tools
  { name: 'Xcode', category: 'tools' },
  { name: 'Android Studio', category: 'tools' },
  { name: 'VS Code', category: 'tools' },
  { name: 'Postman', category: 'tools' },
  { name: 'Figma', category: 'tools' }
];

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/sohaibzahid197', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/isohaibzahid/', icon: 'linkedin' },
  { name: 'Website', url: 'https://idevzone.com', icon: 'mail' },
  { name: 'Email', url: 'mailto:letsdev.sohaib@gmail.com', icon: 'mail' }
];
