'use client';

import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/lib/data';
import Image from 'next/image';
import { useRef, useState, useEffect, type PointerEvent as ReactPointerEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/ScrollReveal';
import TextReveal from '@/components/TextReveal';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const MAX_TILT_DEG = 8;
const HOVER_SCALE = 1.02;

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // The tilt and the glare are written to the element as custom properties from
  // a single rAF, so a pointer moving across the card never re-renders React.
  const applyTilt = () => {
    frameRef.current = null;
    const card = cardRef.current;
    if (!card) return;

    // Measured every frame rather than cached: the track scrolls horizontally
    // under the pin while the card is hovered, so the rect moves.
    const rect = card.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = pointerRef.current.x - rect.left;
    const y = pointerRef.current.y - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    card.style.setProperty('--tilt-x', `${((y - centerY) / centerY) * -MAX_TILT_DEG}deg`);
    card.style.setProperty('--tilt-y', `${((x - centerX) / centerX) * MAX_TILT_DEG}deg`);
    card.style.setProperty('--tilt-scale', `${HOVER_SCALE}`);
    card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
  };

  const resetTilt = () => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--tilt-scale', '1');
  };

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
  }, []);

  // A tap also fires pointer events, but never a matching leave, which used to
  // strand cards mid-tilt on phones - so only a real mouse drives the effect.
  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || prefersReducedMotion) return;
    pointerRef.current = { x: e.clientX, y: e.clientY };
    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(applyTilt);
    }
  };

  const handlePointerEnter = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    setIsHovered(true);
    // Only hint the compositor for as long as the card is actually moving.
    cardRef.current?.style.setProperty('will-change', 'transform');
  };

  const handlePointerLeave = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    setIsHovered(false);
    resetTilt();
    cardRef.current?.style.setProperty('will-change', 'auto');
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
      style={{
        transform:
          'perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) scale3d(var(--tilt-scale, 1), var(--tilt-scale, 1), var(--tilt-scale, 1))',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
    >
      {children}
      {/* Glare overlay - position comes from the inherited custom properties */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-xl overflow-hidden"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          background:
            'radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.08) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}

function ProjectCard({ project }: { project: typeof projects[number] }) {
  // No project currently ships a public demo or a public repo, so the card has
  // nothing to link to. Both fields are optional and come back per project.
  const hasLinks = Boolean(project.liveUrl || project.githubUrl);

  return (
    <div className="group" {...(hasLinks ? { 'data-cursor': 'View' } : {})}>
      <TiltCard className="relative h-full">
        <div className="bg-[#111] rounded-xl border border-white/[0.06] overflow-hidden hover:border-white/[0.12] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/[0.06] h-full flex flex-col">
          {/* Image */}
          <div className="relative h-52 md:h-64 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

            {/* Overlay Actions - these are the only links to the project, so they
                stay visible where there is no hover (touch) and whenever a link
                inside them is focused. Rendered only when there is something to
                link to, otherwise the scrim would wash out the image for nothing. */}
            {hasLinks && (
            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-100 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 bg-black/40">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} live site (opens in a new tab)`}
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
                  aria-label={`View ${project.title} source on GitHub (opens in a new tab)`}
                  className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors border border-white/10"
                >
                  <Github className="w-5 h-5 text-white" />
                </a>
              )}
            </div>
            )}
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
    // Read fresh on every ScrollTrigger.refresh() (which a resize triggers), so
    // the travel and the pin length stay in step with the viewport. Clamped at
    // 0 because a viewport wider than the track would otherwise push it right.
    const distance = () =>
      Math.max(0, track.scrollWidth - document.documentElement.clientWidth);

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${distance()}`,
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
