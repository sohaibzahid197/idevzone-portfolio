'use client';

import { useEffect, useRef, useState } from 'react';
import { skills } from '@/lib/data';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import type { Skill, SkillCategory } from '@/types';

const CATEGORIES: { id: SkillCategory; label: string; accent: string }[] = [
  { id: 'mobile', label: 'Mobile', accent: '#61dafb' },
  { id: 'frontend', label: 'Frontend', accent: '#3b82f6' },
  { id: 'backend', label: 'Backend', accent: '#5fa04e' },
  { id: 'database', label: 'Database', accent: '#ffa000' },
  { id: 'ai', label: 'AI & ML', accent: '#a855f7' },
  { id: 'cloud', label: 'Cloud', accent: '#ff9900' },
  { id: 'payments', label: 'Payments', accent: '#22c55e' },
  { id: 'tools', label: 'Tools', accent: '#f24e1e' },
];

const AUTO_SPIN = 0.0035; // radians per frame around the vertical axis
const DRAG_SPEED = 0.006;

// Even spread over a sphere (Fibonacci lattice), so no two logos bunch up.
function spherePoints(n: number) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
  });
}

function Logo({ skill, size }: { skill: Skill; size: number }) {
  if (!skill.icon) {
    return (
      <span
        className="grid place-items-center rounded-full text-[10px] font-bold text-white"
        style={{ width: size, height: size, backgroundColor: skill.color }}
        aria-hidden="true"
      >
        {skill.label.slice(0, 2)}
      </span>
    );
  }
  return (
    // Plain <img>: tiny SVGs from a CDN gain nothing from next/image.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.simpleicons.org/${skill.icon}/${skill.color.replace('#', '')}`}
      alt=""
      width={size}
      height={size}
      draggable={false}
      style={{ width: size, height: size }}
    />
  );
}

export default function SkillsGlobe() {
  const reducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState<Skill | null>(null);
  const [filter, setFilter] = useState<SkillCategory | null>(null);

  // Rotation state lives in refs: the globe animates every frame without
  // re-rendering React.
  const rot = useRef({ x: -0.3, y: 0, vx: 0, vy: AUTO_SPIN });
  const hovering = useRef(false);
  const filterRef = useRef(filter);
  useEffect(() => {
    filterRef.current = filter;
  }, [filter]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const points = spherePoints(skills.length);
    let frame = 0;
    let dragging = false;
    let last = { x: 0, y: 0 };

    const render = () => {
      const radius = stage.clientWidth * 0.38;
      const { x: ax, y: ay } = rot.current;
      const cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay);

      points.forEach((p, i) => {
        const el = nodeRefs.current[i];
        if (!el) return;
        // Rotate around Y, then X
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;

        const depth = (z2 + 1) / 2; // 0 back .. 1 front
        const scale = 0.55 + depth * 0.65;
        const dimmed = filterRef.current !== null && skills[i].category !== filterRef.current;
        el.style.transform = `translate(-50%, -50%) translate3d(${x1 * radius}px, ${y2 * radius}px, 0) scale(${scale})`;
        el.style.opacity = String(dimmed ? 0.12 : 0.25 + depth * 0.75);
        el.style.zIndex = String(Math.round(depth * 100));
        el.style.filter = depth < 0.35 ? 'blur(1px)' : 'none';
      });
    };

    const tick = () => {
      const r = rot.current;
      if (!dragging) {
        // Ease any fling back toward the steady auto-spin.
        const target = hovering.current || reducedMotion ? 0 : AUTO_SPIN;
        r.vy += (target - r.vy) * 0.03;
        r.vx *= 0.94;
      }
      r.y += r.vy;
      r.x = Math.max(-1.2, Math.min(1.2, r.x + r.vx));
      render();
      frame = requestAnimationFrame(tick);
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      last = { x: e.clientX, y: e.clientY };
      stage.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      last = { x: e.clientX, y: e.clientY };
      rot.current.vy = dx * DRAG_SPEED;
      rot.current.vx = -dy * DRAG_SPEED;
    };
    const onUp = () => {
      dragging = false;
    };

    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerup', onUp);
    stage.addEventListener('pointercancel', onUp);

    render();
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener('pointerdown', onDown);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerup', onUp);
      stage.removeEventListener('pointercancel', onUp);
    };
  }, [reducedMotion]);

  const chip = (on: boolean) =>
    `px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
      on
        ? 'bg-white text-black border-white'
        : 'bg-white/[0.04] text-neutral-400 border-white/[0.08] hover:text-white hover:border-white/20'
    }`;

  const shown = filter ? skills.filter((s) => s.category === filter) : skills;

  return (
    <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
      {/* Left: filters and the full, readable list */}
      <div>
        <div className="flex flex-wrap gap-2 mb-6">
          <button type="button" onClick={() => setFilter(null)} aria-pressed={filter === null} className={chip(filter === null)}>
            All {skills.length}
          </button>
          {CATEGORIES.map((c) => {
            const on = filter === c.id;
            return (
              <button key={c.id} type="button" onClick={() => setFilter(on ? null : c.id)} aria-pressed={on} className={chip(on)}>
                {c.label} {skills.filter((s) => s.category === c.id).length}
              </button>
            );
          })}
        </div>

        <ul className="flex flex-wrap gap-2">
          {shown.map((skill) => (
            <li key={skill.name}>
              <span
                onPointerEnter={() => setActive(skill)}
                onPointerLeave={() => setActive((cur) => (cur === skill ? null : cur))}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
                  active?.name === skill.name
                    ? 'bg-white/[0.1] border-white/25 text-white'
                    : 'bg-white/[0.04] border-white/[0.08] text-neutral-200'
                }`}
              >
                <Logo skill={skill} size={16} />
                {skill.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: the globe. Decorative duplicate of the list, so hidden from
          assistive tech. */}
      <div className="relative" aria-hidden="true">
        <div
          ref={stageRef}
          onPointerEnter={() => (hovering.current = true)}
          onPointerLeave={() => {
            hovering.current = false;
            setActive(null);
          }}
          className="relative mx-auto aspect-square w-full max-w-[520px] cursor-grab active:cursor-grabbing select-none touch-none"
        >
          {/* Glow and orbit rings */}
          <div className="absolute inset-[12%] rounded-full bg-blue-500/[0.08] blur-3xl" />
          <div className="absolute inset-[11%] rounded-full border border-white/[0.06]" />
          <div className="absolute inset-[11%] rounded-full border border-white/[0.05] [transform:rotateX(72deg)]" />

          <div className="absolute left-1/2 top-1/2">
            {skills.map((skill, i) => (
              <div
                key={skill.name}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                onPointerEnter={() => setActive(skill)}
                className="absolute left-0 top-0 will-change-transform"
              >
                <div
                  className={`grid place-items-center w-14 h-14 rounded-2xl border backdrop-blur-sm transition-colors ${
                    active?.name === skill.name ? 'bg-white/[0.14] border-white/30' : 'bg-[#141414]/80 border-white/[0.08]'
                  }`}
                  style={active?.name === skill.name ? { boxShadow: `0 0 30px -4px ${skill.color}` } : undefined}
                >
                  <Logo skill={skill} size={26} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Readout */}
        <div className="h-10 mt-2 flex items-center justify-center">
          {active ? (
            <span className="inline-flex items-center gap-2 text-white font-semibold">
              <Logo skill={active} size={18} />
              {active.label}
              <span className="text-neutral-500 font-normal text-sm">
                · {CATEGORIES.find((c) => c.id === active.category)?.label}
              </span>
            </span>
          ) : (
            <span className="text-neutral-600 text-sm">Drag to spin · hover a logo</span>
          )}
        </div>
      </div>
    </div>
  );
}
