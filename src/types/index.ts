export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'mobile' | 'backend' | 'database' | 'tools';
  icon?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
