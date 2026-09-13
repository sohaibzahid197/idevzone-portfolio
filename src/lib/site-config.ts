/**
 * Single source of truth for site identity, contact details, social links,
 * stats and hero copy. Anything that appears in more than one place (metadata,
 * Footer, Contact, About, structured data) must be read from here, never
 * hard-coded in a component.
 */

export interface SiteStat {
  number: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  brand: string;
  role: string;
  url: string;
  email: string;
  phone: string;
  location: string;
  social: {
    github: string;
    linkedin: string;
    whatsapp: string;
  };
  stats: SiteStat[];
  tagline: string;
}

export const siteConfig: SiteConfig = {
  name: 'Sohaib Zahid',
  brand: 'iDevZone',
  role: 'Full Stack Web & Mobile Developer',

  // TODO: idevzone.com currently has NO DNS A record (verified against two
  // independent public resolvers). Canonical URLs, Open Graph tags and the
  // sitemap all point here, so before launch either point this domain at the
  // deployment or replace this value with the real origin (e.g. the Vercel URL).
  url: 'https://idevzone.com',

  email: 'letsdev.sohaib@gmail.com',
  phone: '+92 321 3181197',
  location: 'Faisalabad, Pakistan',

  social: {
    github: 'https://github.com/sohaibzahid197',
    linkedin: 'https://www.linkedin.com/in/isohaibzahid/',
    whatsapp: 'https://wa.me/923213181197'
  },

  stats: [
    { number: '15+', label: 'Projects' },
    { number: '2+', label: 'Years' },
    { number: '10+', label: 'Clients' },
    { number: '15+', label: 'Technologies' }
  ],

  tagline: 'I build modern, fast & scalable digital products using React Native, Next.js, and AI.'
};
