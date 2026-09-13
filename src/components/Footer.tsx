'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import Logo from './Logo';
import { scrollToSection } from './SmoothScroll';
import { siteConfig } from '@/lib/site-config';

const quickLinks = ['Projects', 'Skills', 'About', 'Experience', 'Contact'];

export default function Footer() {
  // Same deal as the navbar: real anchors for crawlers and middle-clicks, with
  // a plain click handed to the shared Lenis-aware helper.
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo size="md" />
            <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
              Full Stack Web & Mobile App Developer building modern digital products with React Native, Next.js, and AI.
            </p>
            <div className="flex gap-3">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
                className="p-2 bg-white/[0.04] hover:bg-white/[0.08] rounded-lg transition-colors text-neutral-400 hover:text-white"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in a new tab)"
                className="p-2 bg-white/[0.04] hover:bg-white/[0.08] rounded-lg transition-colors text-neutral-400 hover:text-white"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label={`Email ${siteConfig.name}`}
                className="p-2 bg-white/[0.04] hover:bg-white/[0.08] rounded-lg transition-colors text-neutral-400 hover:text-white"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-2.5">
              {quickLinks.map((link) => {
                const href = `#${link.toLowerCase()}`;
                return (
                  <a
                    key={link}
                    href={href}
                    onClick={(e) => handleLinkClick(e, href)}
                    className="block text-sm text-neutral-500 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-2.5 text-sm text-neutral-500">
              <p>{siteConfig.email}</p>
              <p>{siteConfig.phone}</p>
              <p>{siteConfig.location}</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-white/[0.06] flex items-center justify-center">
          <p className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
