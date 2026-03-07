'use client';

import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import TextReveal from '@/components/TextReveal';

export default function EducationSection() {
  const focusAreas = [
    'Mobile App Development',
    'Web Technologies',
    'Database Design',
    'Software Engineering'
  ];

  return (
    <section id="education" className="section-padding bg-[#0f0f0f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal className="mb-16">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Background
          </span>
          <TextReveal className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Education
          </TextReveal>
        </ScrollReveal>

        <ScrollReveal variant="blur-in" className="max-w-3xl">
          <div className="bg-[#111] rounded-xl border border-white/[0.06] p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-blue-500/10 rounded-lg flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  BS Software Engineering
                </h3>
                <h4 className="text-blue-400 font-medium mb-3">
                  COMSATS University Islamabad
                </h4>
                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    2020 – 2024
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    Islamabad, Pakistan
                  </span>
                </div>
              </div>
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Comprehensive study of software engineering principles, algorithms, data structures, and modern development practices with focus on full-stack and mobile development.
            </p>

            <div className="flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] text-neutral-300 text-xs font-medium rounded-md"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
