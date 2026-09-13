'use client';

import SkillsKeyboard from '@/components/SkillsKeyboard';
import ScrollReveal from '@/components/ScrollReveal';
import TextReveal from '@/components/TextReveal';

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding bg-[#0f0f0f] relative">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal className="mb-16">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            What I Work With
          </span>
          <TextReveal className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Skills & Technologies
          </TextReveal>
          <p className="text-neutral-400 text-lg max-w-2xl">
            Technologies and tools I use to bring ideas to life.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <SkillsKeyboard />
        </ScrollReveal>
      </div>
    </section>
  );
}
