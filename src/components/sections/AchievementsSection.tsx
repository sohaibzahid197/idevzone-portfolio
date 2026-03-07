'use client';

import { Rocket, Brain, DollarSign, Star, Users, Zap, Coins, GraduationCap } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import TextReveal from '@/components/TextReveal';

const achievementsData = [
  {
    icon: GraduationCap,
    title: 'CS Degree from COMSATS',
    description: 'Strong foundation in software engineering',
    color: '#8b5cf6'
  },
  {
    icon: Rocket,
    title: '15+ Apps Delivered',
    description: 'Across iOS, Android & macOS platforms',
    color: '#3b82f6'
  },
  {
    icon: Brain,
    title: '20+ APIs Integrated',
    description: 'AI services and third-party integrations',
    color: '#ec4899'
  },
  {
    icon: DollarSign,
    title: 'Subscription Systems',
    description: 'Monetization models and payment systems',
    color: '#22c55e'
  },
  {
    icon: Star,
    title: '4.5+ Star Ratings',
    description: 'Across published applications',
    color: '#f59e0b'
  },
  {
    icon: Users,
    title: 'Cross-functional Teams',
    description: 'Agile development environments',
    color: '#6366f1'
  },
  {
    icon: Zap,
    title: '40% Performance Boost',
    description: 'Optimization in load times',
    color: '#ef4444'
  },
  {
    icon: Coins,
    title: 'AI-Integrated Apps',
    description: 'NLP features and capabilities',
    color: '#14b8a6'
  }
];

export default function AchievementsSection() {
  return (
    <section id="achievements" className="section-padding bg-[#0a0a0a] relative">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal className="mb-16">
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Milestones
          </span>
          <TextReveal className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Key Achievements
          </TextReveal>
          <p className="text-neutral-400 text-lg max-w-2xl">
            Highlights from my professional journey.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="scale" stagger={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievementsData.map((item, index) => (
            <div key={index} className="group">
              <div className="bg-[#111] rounded-xl border border-white/[0.06] p-5 hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-1 h-full">
                <div
                  className="inline-flex p-2.5 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${item.color}12` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5 leading-tight">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
