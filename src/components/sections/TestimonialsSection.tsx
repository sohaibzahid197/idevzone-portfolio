'use client';

import { useState } from 'react';
import { Star, Quote, ExternalLink, ShieldCheck } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import TextReveal from '@/components/TextReveal';
import { testimonials, type Testimonial } from '@/lib/data';
import { siteConfig } from '@/lib/site-config';

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="h-full bg-[#111] rounded-xl border border-white/[0.06] p-6 hover:border-white/[0.12] transition-all duration-300 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <Stars />
        <Quote className="w-6 h-6 text-blue-500/30" aria-hidden="true" />
      </div>

      <p className="text-white text-lg font-semibold leading-snug mb-4">
        &ldquo;{testimonial.headline}&rdquo;
      </p>

      {/* The full review sits behind a toggle so the headline carries the card */}
      {expanded && (
        <p className="text-neutral-400 text-sm leading-relaxed mb-4">{testimonial.quote}</p>
      )}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="self-start text-blue-400 hover:text-blue-300 text-sm font-medium mb-5 transition-colors"
      >
        {expanded ? 'Show less' : 'Read full review'}
      </button>

      <div className="flex flex-wrap gap-2 mb-5">
        {testimonial.endorsements.map((e) => (
          <span
            key={e}
            className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.06] text-neutral-300 text-xs font-medium rounded-md"
          >
            {e}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-5 border-t border-white/[0.06]">
        <p className="text-neutral-300 text-sm font-medium leading-snug">{testimonial.job}</p>
        <p className="text-neutral-500 text-xs mt-1">Upwork client · {testimonial.period}</p>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="section-padding bg-[#0f0f0f] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal className="mb-12">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Client Reviews
          </span>
          <TextReveal className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            What clients say
          </TextReveal>

          {/* Summary of the Upwork profile badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 text-sm font-semibold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              5.0 average rating
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-semibold">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              Top Rated on Upwork
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-300 text-sm font-semibold">
              100% Job Success
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.id} variant="fade-up" delay={i * 0.1} className="h-full">
              <TestimonialCard testimonial={t} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-10">
          <a
            href={siteConfig.social.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-neutral-300 hover:text-white text-sm font-medium transition-colors"
          >
            See all reviews on Upwork
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
