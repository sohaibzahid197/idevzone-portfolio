'use client';

import { motion } from 'framer-motion';
import { Code, Calendar, Users, Award, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/ScrollReveal';
import TextReveal from '@/components/TextReveal';
import { scrollToSection } from '@/components/SmoothScroll';
import { siteConfig } from '@/lib/site-config';
import { prefersReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

// text-neutral-400 at 0.75 over #0a0a0a is ~4.7:1, so the copy already clears
// the WCAG AA 4.5:1 minimum before the scrub lifts it to full opacity.
const RESTING_WORD_OPACITY = 0.75;

function ScrollHighlightText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Reduced motion: no dimming and no scrub, the paragraph just reads.
    if (prefersReducedMotion()) return;

    const words = el.querySelectorAll('.highlight-word');
    gsap.set(words, { opacity: RESTING_WORD_OPACITY });

    const anim = gsap.to(words, {
      opacity: 1,
      stagger: 0.02,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: 1,
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  const words = text.split(' ').map((word, i) => (
    <span key={i} className="highlight-word inline">
      {word}{' '}
    </span>
  ));

  return (
    <p ref={containerRef} className="leading-relaxed">
      {words}
    </p>
  );
}

const statIcons: Record<string, LucideIcon | undefined> = {
  Projects: Code,
  Years: Calendar,
  Clients: Users,
  Technologies: Award
};

function AnimatedCounter({ number }: { number: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // The real figure is already in the DOM for SSR, crawlers and no-JS
    // visitors, so reduced motion simply leaves it alone.
    if (prefersReducedMotion()) return;

    const match = number.match(/^(\d+)(.*)$/);
    if (!match) return;

    const targetValue = parseInt(match[1]);
    const suffix = match[2];
    let tween: gsap.core.Tween | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          element.textContent = `0${suffix}`;
          const obj = { val: 0 };
          tween = gsap.to(obj, {
            val: targetValue,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              if (ref.current) ref.current.textContent = `${Math.round(obj.val)}${suffix}`;
            },
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      tween?.kill();
    };
  }, [number]);

  return <div ref={ref} className="text-2xl font-bold text-white">{number}</div>;
}

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/[0.04] rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <ScrollReveal variant="slide-left" className="relative">
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden">
              {/* max-w-md caps the frame at 448px on every breakpoint */}
              <Image
                src="/profile-photo.jpeg"
                alt="Sohaib Zahid"
                fill
                sizes="(max-width: 480px) 100vw, 448px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 rounded-2xl -z-10 blur-sm" />
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal variant="slide-right">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
              About Me
            </span>
            <TextReveal className="text-3xl md:text-4xl font-bold text-white mb-6">
              Passionate about building great products
            </TextReveal>

            <div className="space-y-4 text-neutral-400 mb-10">
              <ScrollHighlightText text="I'm a Full Stack Developer with 2+ years of experience building cross-platform mobile and web applications using React Native, Next.js, and AI integrations. I've delivered 15+ applications with advanced features like subscriptions, real-time communication, and NLP-powered AI systems." />
              <ScrollHighlightText text="I focus on building smooth user experiences and scalable solutions. My expertise spans mobile app development, web applications, AI integration, and modern development practices." />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {siteConfig.stats.map((stat, index) => {
                const Icon = statIcons[stat.label] ?? Award;

                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-4 bg-[#111] rounded-xl border border-white/[0.06]"
                  >
                    <Icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                    <AnimatedCounter number={stat.number} />
                    <div className="text-xs text-neutral-500 mt-1">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            <button
              onClick={() => scrollToSection('#contact')}
              className="px-7 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Let&apos;s Connect
            </button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
