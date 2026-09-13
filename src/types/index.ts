export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export type SkillCategory = 'frontend' | 'mobile' | 'backend' | 'database' | 'tools';

export interface Skill {
  // `name` is the stable identifier (React keys, lookups); `label` is what the UI prints.
  name: string;
  label: string;
  category: SkillCategory;
  // Brand hex, used for chips, dots and marquee accents on the dark background.
  color: string;
  icon?: string;
}
