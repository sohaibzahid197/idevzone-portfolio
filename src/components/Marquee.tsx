'use client';

const techItems = [
  'React Native', 'Next.js', 'TypeScript', 'Node.js', 'Firebase',
  'React.js', 'Tailwind CSS', 'MongoDB', 'AWS', 'OpenAI',
  'iOS', 'Android', 'Express.js', 'REST APIs', 'Git',
  'GSAP', 'Framer Motion', 'GraphQL', 'Docker', 'Figma',
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...techItems, ...techItems];

  return (
    <div className="flex overflow-hidden py-1 group">
      <div
        className={reverse ? 'animate-marquee-reverse' : 'animate-marquee'}
        style={{ display: 'flex', whiteSpace: 'nowrap' }}
      >
        {items.map((tech, i) => (
          <span key={i} className="flex items-center gap-4 mx-4 text-neutral-600 text-sm font-medium tracking-wide select-none">
            {tech}
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-700 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="py-8 border-y border-white/[0.04] bg-[#0a0a0a] overflow-hidden">
      <MarqueeRow />
      <MarqueeRow reverse />
    </div>
  );
}
