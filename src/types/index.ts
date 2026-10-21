export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  appStoreUrl?: string;
  playStoreUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export type SkillCategory = 'mobile' | 'frontend' | 'backend' | 'database' | 'cloud' | 'ai' | 'payments' | 'tools';

export interface Skill {
  // `name` is the stable identifier (React keys, lookups); `label` is what the UI prints.
  name: string;
  label: string;
  category: SkillCategory;
  // Brand hex, used for chips, dots and marquee accents on the dark background.
  color: string;
  // simple-icons slug for the logo; skills without one show a coloured dot.
  icon?: string;
}
