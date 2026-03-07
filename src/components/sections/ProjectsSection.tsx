'use client';

import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/lib/data';
import Image from 'next/image';
import { useRef, useState, useEffect, type MouseEvent as ReactMouseEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/ScrollReveal';
import TextReveal from '@/components/TextReveal';

gsap.registerPlugin(ScrollTrigger);

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)');
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}
      {/* Glare overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-xl overflow-hidden"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}

function ProjectCard({ project }: { project: typeof projects[number] }) {
  return (
    <div className="group" data-cursor="View">
      <TiltCard className="relative h-full">
        <div className="bg-[#111] rounded-xl border border-white/[0.06] overflow-hidden hover:border-white/[0.12] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/[0.06] h-full flex flex-col">
          {/* Image */}
          <div className="relative h-52 md:h-64 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

            {/* Overlay Actions */}
            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors border border-white/10"
                >
                  <ExternalLink className="w-5 h-5 text-white" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors border border-white/10"
                >
                  <Github className="w-5 h-5 text-white" />
                </a>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-5 flex-1">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white/[0.04] border border-white/[0.06] text-neutral-300 text-xs font-medium rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || !trackRef.current || !sectionRef.current) return;

    const track = trackRef.current;
    const scrollWidth = track.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollWidth}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [isMobile]);

  return (
    <section id="projects" ref={sectionRef} className="bg-[#0a0a0a] relative overflow-hidden">
      <div className={isMobile ? 'section-padding' : 'py-24'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <ScrollReveal className="mb-16">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
              Featured Work
            </span>
            <TextReveal className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Projects
            </TextReveal>
            <p className="text-neutral-400 text-lg max-w-2xl">
              A selection of projects that showcase my skills in building modern, scalable applications.
            </p>
          </ScrollReveal>
        </div>

        {/* Horizontal scroll track (desktop) / Vertical grid (mobile) */}
        {isMobile ? (
          <div className="px-4 grid grid-cols-1 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div
            ref={trackRef}
            className="flex gap-8 pl-8"
            style={{ width: 'max-content' }}
          >
            {projects.map((project) => (
              <div key={project.id} className="w-[500px] flex-shrink-0">
                <ProjectCard project={project} />
              </div>
            ))}
            {/* Spacer so last card isn't cut off */}
            <div className="w-16 flex-shrink-0" />
          </div>
        )}
      </div>
    </section>
  );
}
