'use client';

import { motion } from 'framer-motion';
import { Mail, Send, Phone, MapPin, Clock, MessageCircle, Github, Linkedin } from 'lucide-react';
import { useState } from 'react';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'letsdev.sohaib@gmail.com', color: '#3b82f6' },
  { icon: Phone, label: 'Phone', value: '+92 321 3181197', color: '#22c55e' },
  { icon: MapPin, label: 'Location', value: 'Faisalabad, Pakistan', color: '#a855f7' },
  { icon: Clock, label: 'Response', value: 'Within 24 hours', color: '#f59e0b' }
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section-padding bg-[#0a0a0a] relative">
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl">
            Have a project in mind? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#111] border border-white/[0.06] rounded-lg text-white placeholder-neutral-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all outline-none text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#111] border border-white/[0.06] rounded-lg text-white placeholder-neutral-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all outline-none text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-[#111] border border-white/[0.06] rounded-lg text-white placeholder-neutral-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all outline-none resize-none text-sm"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 p-4 bg-[#111] rounded-xl border border-white/[0.06]"
              >
                <div
                  className="p-2.5 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: `${item.color}12` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div>
                  <div className="text-xs text-neutral-500 font-medium">{item.label}</div>
                  <div className="text-sm text-white">{item.value}</div>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-neutral-300 mb-3">Connect</h4>
              <div className="flex gap-3">
                <a
                  href="https://github.com/sohaibzahid197"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#111] border border-white/[0.06] rounded-lg hover:border-white/[0.12] transition-all text-neutral-400 hover:text-white"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/isohaibzahid/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#111] border border-white/[0.06] rounded-lg hover:border-white/[0.12] transition-all text-neutral-400 hover:text-white"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:letsdev.sohaib@gmail.com"
                  className="p-3 bg-[#111] border border-white/[0.06] rounded-lg hover:border-white/[0.12] transition-all text-neutral-400 hover:text-white"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/923213181197"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-all text-green-400"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="p-4 bg-green-500/[0.05] border border-green-500/10 rounded-xl mt-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-white">Available for Work</span>
              </div>
              <p className="text-xs text-neutral-400">
                Open for freelance projects and full-time opportunities.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
