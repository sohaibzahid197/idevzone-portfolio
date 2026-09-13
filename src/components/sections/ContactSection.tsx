'use client';

import { Mail, Send, Phone, MapPin, Clock, MessageCircle, Github, Linkedin, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import TextReveal from '@/components/TextReveal';
import MagneticButton from '@/components/MagneticButton';
import { siteConfig } from '@/lib/site-config';

const contactInfo = [
  { icon: Mail, label: 'Email', value: siteConfig.email, color: '#3b82f6' },
  { icon: Phone, label: 'Phone', value: siteConfig.phone, color: '#22c55e' },
  { icon: MapPin, label: 'Location', value: siteConfig.location, color: '#a855f7' },
  { icon: Clock, label: 'Response', value: 'Within 24 hours', color: '#f59e0b' }
];

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error';

// 16px on touch devices stops iOS Safari force-zooming the viewport on focus;
// pointer-driven browsers keep the original 14px.
const fieldClasses =
  'w-full px-4 py-3 bg-[#111] border border-white/[0.06] rounded-lg text-white placeholder-neutral-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all outline-none text-base pointer-fine:text-sm';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear a finished outcome once the visitor starts editing again, but never
    // interrupt an in-flight send.
    if (status === 'sent' || status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data: { error?: string } | null = await res.json().catch(() => null);

      if (!res.ok) {
        setErrorMessage(
          typeof data?.error === 'string' && data.error
            ? data.error
            : 'Something went wrong while sending your message.'
        );
        setStatus('error');
        return;
      }

      // Only clear on success — a failed send must never destroy what was typed.
      setFormData({ name: '', email: '', message: '' });
      setStatus('sent');
    } catch {
      setErrorMessage('Could not reach the server. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-padding bg-[#0a0a0a] relative">
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal className="mb-16">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Get In Touch
          </span>
          <TextReveal className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Let&apos;s Work Together
          </TextReveal>
          <p className="text-neutral-400 text-lg max-w-2xl">
            Have a project in mind? I&apos;d love to hear from you.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <ScrollReveal variant="slide-left" className="lg:col-span-3">
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
                    autoComplete="name"
                    className={fieldClasses}
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
                    autoComplete="email"
                    className={fieldClasses}
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
                  data-lenis-prevent
                  className={`${fieldClasses} resize-none`}
                  placeholder="Tell me about your project..."
                />
              </div>

              <MagneticButton>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              </MagneticButton>

              {status === 'sent' && (
                <p role="status" aria-live="polite" className="flex items-start gap-2 text-sm text-green-400">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Thanks — your message is on its way. I&apos;ll reply within 24 hours.</span>
                </p>
              )}
              {status === 'error' && (
                <p role="alert" className="flex items-start gap-2 text-sm text-red-400">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    {errorMessage} Your message is still here — you can also email{' '}
                    <a href={`mailto:${siteConfig.email}`} className="underline hover:text-red-300">
                      {siteConfig.email}
                    </a>{' '}
                    directly.
                  </span>
                </p>
              )}
            </form>
          </ScrollReveal>

          {/* Info */}
          <ScrollReveal variant="slide-right" className="lg:col-span-2 space-y-4">
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
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteConfig.name} on GitHub`}
                  className="p-3 bg-[#111] border border-white/[0.06] rounded-lg hover:border-white/[0.12] transition-all text-neutral-400 hover:text-white"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${siteConfig.name} on LinkedIn`}
                  className="p-3 bg-[#111] border border-white/[0.06] rounded-lg hover:border-white/[0.12] transition-all text-neutral-400 hover:text-white"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  aria-label={`Email ${siteConfig.email}`}
                  className="p-3 bg-[#111] border border-white/[0.06] rounded-lg hover:border-white/[0.12] transition-all text-neutral-400 hover:text-white"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Message ${siteConfig.name} on WhatsApp`}
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
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
