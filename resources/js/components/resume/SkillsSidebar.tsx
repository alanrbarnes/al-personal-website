import { motion } from 'framer-motion';

const sidebarReference = '/images/image_1786827035399.png';

export type SkillGroups = {
  languages: string[];
  frameworks: string[];
  tools: string[];
};

type SkillsSidebarProps = {
  skills: SkillGroups;
  title?: string;
  className?: string;
};

const BACKDROP_CELLS = Array.from({ length: 72 }, (_, index) => ({
  index,
  active: index % 9 === 0 || index % 17 === 0 || index % 23 === 0,
  wide: index % 13 === 0,
}));

const groups: Array<{ key: keyof SkillGroups; label: string; featured?: boolean }> = [
  { key: 'languages', label: 'Languages', featured: true },
  { key: 'frameworks', label: 'Frameworks' },
  { key: 'tools', label: 'Tools & Cloud' },
];

export default function SkillsSidebar({ skills, title = 'Skills', className = '' }: SkillsSidebarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`relative isolate overflow-hidden rounded-xl border border-border bg-card ${className}`}
      aria-labelledby="skills-sidebar-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-right opacity-20 mix-blend-multiply"
        style={{
          backgroundImage: `url(${sidebarReference})`,
          backgroundPosition: 'right center',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(37,99,235,0.09) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(37,99,235,0.09) 1px, transparent 1px),
            radial-gradient(circle at 20% 20%, rgba(37,99,235,0.14), transparent 35%),
            radial-gradient(circle at 85% 70%, rgba(20,184,166,0.11), transparent 32%)`,
          backgroundSize: '28px 28px, 28px 28px, 100% 100%, 100% 100%',
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-0 grid grid-cols-12 grid-rows-6 gap-2 p-4 opacity-45" aria-hidden>
        {BACKDROP_CELLS.map((cell) => (
          <span
            key={cell.index}
            className={`rounded-full ${cell.wide ? 'col-span-2' : ''} ${cell.active ? 'skills-grid-cell-active' : ''}`}
            style={{
              backgroundColor: cell.active ? '#2563eb' : '#94a3b8',
              opacity: cell.active ? 0.34 : 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 bg-card/85 p-6 backdrop-blur-[3px] sm:p-7">
        <div className="mb-6 flex items-start justify-between gap-4 border-b border-border pb-3">
          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-primary/70">tech_stack</p>
            <h2 id="skills-sidebar-heading" className="text-xl font-bold text-foreground">{title}</h2>
          </div>
          <span className="mt-1 rounded-full border border-primary/20 bg-primary/10 px-2 py-1 font-mono text-[10px] text-primary">
            {Object.values(skills).flat().length} tools
          </span>
        </div>

        {groups.map(({ key, label, featured }) => (
          <div key={key} className={key === 'tools' ? '' : 'mb-6'}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{label}</h3>
            <div className="flex flex-wrap gap-2">
              {skills[key].map((skill) => (
                <span
                  key={skill}
                  className={
                    featured
                      ? 'rounded border border-primary/20 bg-primary/10 px-2.5 py-1 text-sm font-medium text-primary'
                      : 'rounded border border-border bg-muted/90 px-2.5 py-1 text-sm font-medium text-foreground'
                  }
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes skills-grid-pulse {
          0%, 100% { opacity: 0.25; transform: scale(0.92); }
          50% { opacity: 0.8; transform: scale(1); }
        }
        .skills-grid-cell-active {
          animation: skills-grid-pulse 3.2s ease-in-out infinite;
        }
        .skills-grid-cell-active:nth-child(3n) {
          animation-delay: 0.8s;
        }
        .skills-grid-cell-active:nth-child(5n) {
          animation-delay: 1.6s;
        }
        @media (prefers-reduced-motion: reduce) {
          .skills-grid-cell-active {
            animation: none;
          }
        }
      `}</style>
    </motion.aside>
  );
}