'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import Logo from './Logo';

const quickLinks = ['Projects', 'Skills', 'About', 'Experience', 'Contact'];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                href="https://github.com/sohaibzahid197"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/[0.04] hover:bg-white/[0.08] rounded-lg transition-colors text-neutral-400 hover:text-white"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/isohaibzahid/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/[0.04] hover:bg-white/[0.08] rounded-lg transition-colors text-neutral-400 hover:text-white"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:letsdev.sohaib@gmail.com"
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
              {quickLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    const element = document.getElementById(link.toLowerCase());
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block text-sm text-neutral-500 hover:text-white transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-2.5 text-sm text-neutral-500">
              <p>letsdev.sohaib@gmail.com</p>
              <p>+92 321 3181197</p>
              <p>Faisalabad, Pakistan</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} Sohaib Zahid. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            className="p-2 bg-white/[0.04] hover:bg-white/[0.08] rounded-lg transition-colors text-neutral-500 hover:text-white"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
