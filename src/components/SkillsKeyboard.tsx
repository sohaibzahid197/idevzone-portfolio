'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '@/lib/data';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import type { Skill, SkillCategory } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES: { id: SkillCategory; label: string }[] = [
  { id: 'mobile', label: 'Mobile' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'tools', label: 'Tools' },
];

// Keycap legends. A cap is ~72px wide, so the full name never fits — these are
// the abbreviations a developer would actually recognise on a keyboard.
const LEGEND: Record<string, string> = {
  'React Native': 'RN',
  iOS: 'iOS',
  Android: 'And',
  macOS: 'mac',
  'React.js': 'Rct',
  'Next.js': 'Nxt',
  TypeScript: 'TS',
  'Tailwind CSS': 'TW',
  GSAP: 'GSAP',
  'Framer Motion': 'FM',
  'Node.js': 'Node',
  'Express.js': 'Exp',
  'REST APIs': 'REST',
  GraphQL: 'GQL',
  Firebase: 'FB',
  'Firebase Firestore': 'Fire',
  MongoDB: 'Mngo',
  MySQL: 'SQL',
  SQLite: 'Lite',
  AWS: 'AWS',
  'Firebase Hosting': 'Host',
  Docker: 'Dckr',
  Git: 'Git',
  'OpenAI API': 'AI',
  NLP: 'NLP',
  'Image Processing': 'IMG',
  Summarization: 'Sum',
  IAP: 'IAP',
  AdMob: 'Ads',
  'Subscription Models': 'Subs',
  Xcode: 'Xc',
  'Android Studio': 'AS',
  'VS Code': 'VS',
  Postman: 'PM',
  Figma: 'Fig',
};

function legendFor(skill: Skill): string {
  const known = LEGEND[skill.label];
  if (known) return known;
  const words = skill.label.split(' ').filter(Boolean);
  if (words.length > 1) return words.map((w) => w[0]).join('').slice(0, 4);
  return skill.label.slice(0, 4);
}

const KEYS_PER_ROW = 7;

function toRows<T>(items: T[], perRow: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += perRow) rows.push(items.slice(i, i + perRow));
  return rows;
}

export default function SkillsKeyboard() {
  const reducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState<Skill | null>(null);
  const [filter, setFilter] = useState<SkillCategory | null>(null);

  const rows = toRows(skills, KEYS_PER_ROW);

  // Entrance: caps drop onto the deck as the section scrolls in.
  useEffect(() => {
    const board = boardRef.current;
    if (!board || reducedMotion) return;

    // Animate the SLOT, never the cap. The cap's own transform carries its
    // translateZ lift, and a GSAP tween on it would overwrite that and
    // flatten the whole board.
    const slots = board.querySelectorAll('.kbd-slot');
    gsap.set(slots, { opacity: 0, y: -40 });

    const anim = gsap.to(slots, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'back.out(1.6)',
      stagger: { each: 0.018, from: 'start' },
      scrollTrigger: { trigger: board, start: 'top 80%', toggleActions: 'play none none none' },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [reducedMotion]);

  // Board follows the pointer a little, so it reads as a physical object.
  // Written straight to custom properties — no React state per mouse event.
  useEffect(() => {
    const stage = stageRef.current;
    const board = boardRef.current;
    if (!stage || !board || reducedMotion) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let frame = 0;
    let pending: { x: number; y: number } | null = null;

    const apply = () => {
      frame = 0;
      if (!pending) return;
      const rect = stage.getBoundingClientRect();
      const dx = (pending.x - rect.left) / rect.width - 0.5;
      const dy = (pending.y - rect.top) / rect.height - 0.5;
      board.style.setProperty('--board-rx', `${(-dy * 9).toFixed(2)}deg`);
      board.style.setProperty('--board-rz', `${(dx * 9).toFixed(2)}deg`);
    };

    const onMove = (e: PointerEvent) => {
      pending = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      board.style.setProperty('--board-rx', '0deg');
      board.style.setProperty('--board-rz', '0deg');
    };

    stage.addEventListener('pointermove', onMove, { passive: true });
    stage.addEventListener('pointerleave', onLeave);

    return () => {
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  const readout = active ?? null;

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <button
          type="button"
          onClick={() => setFilter(null)}
          aria-pressed={filter === null}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
            filter === null
              ? 'bg-white text-black border-white'
              : 'bg-white/[0.04] text-neutral-400 border-white/[0.08] hover:text-white hover:border-white/20'
          }`}
        >
          All {skills.length}
        </button>
        {CATEGORIES.map((cat) => {
          const count = skills.filter((s) => s.category === cat.id).length;
          const on = filter === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(on ? null : cat.id)}
              aria-pressed={on}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                on
                  ? 'bg-white text-black border-white'
                  : 'bg-white/[0.04] text-neutral-400 border-white/[0.08] hover:text-white hover:border-white/20'
              }`}
            >
              {cat.label} {count}
            </button>
          );
        })}
      </div>

      {/* ---- The board. Decorative duplicate of the list below, so it is
              hidden from assistive tech and unreachable by keyboard. ---- */}
      <div
        ref={stageRef}
        aria-hidden="true"
        className="hidden md:block kbd-stage select-none py-10"
      >
        <div ref={boardRef} className="kbd-board mx-auto w-fit">
          <div className="kbd-deck relative p-5">
            <div className="flex flex-col gap-2">
              {rows.map((row, r) => (
                <div
                  key={r}
                  className="flex gap-2"
                  // Real keyboards stagger their rows; this reads as one.
                  style={{ marginLeft: `${r * 9}px` }}
                >
                  {row.map((skill) => {
                    const dimmed = filter !== null && skill.category !== filter;
                    return (
                      <span key={skill.name} className="kbd-slot">
                        <button
                          type="button"
                          tabIndex={-1}
                          data-dimmed={dimmed}
                          onPointerEnter={() => setActive(skill)}
                          onPointerLeave={() => setActive((cur) => (cur === skill ? null : cur))}
                          className="kbd-key h-[68px] w-[68px]"
                          style={{ ['--k' as string]: skill.color }}
                        >
                          <span className="kbd-legend text-[13px]">{legendFor(skill)}</span>
                        </button>
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Readout. Fixed height so hovering never shifts the layout. */}
      <div className="hidden md:flex h-16 items-center justify-center" aria-hidden="true">
        {readout ? (
          <div className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: readout.color }}
            />
            <span className="text-white font-semibold">{readout.label}</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-500 text-sm capitalize">{readout.category}</span>
          </div>
        ) : (
          <span className="text-neutral-600 text-sm">
            Hover a key — {skills.length} technologies
          </span>
        )}
      </div>

      {/* ---- The real, accessible content. Always in the DOM; the only
              version on mobile and under reduced motion. ---- */}
      <div className={reducedMotion ? '' : 'md:sr-only'}>
        <h3 className="sr-only">All technologies</h3>
        <ul className="flex flex-wrap gap-2">
          {skills.map((skill) => {
            const dimmed = filter !== null && skill.category !== filter;
            return (
              <li key={skill.name}>
                <span
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-opacity ${
                    dimmed
                      ? 'opacity-30 bg-white/[0.02] border-white/[0.04] text-neutral-500'
                      : 'bg-white/[0.04] border-white/[0.08] text-neutral-200'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: skill.color }}
                  />
                  {skill.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
