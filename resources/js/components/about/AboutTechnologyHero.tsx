import { useEffect, useRef, useState } from 'react';
import {
  ANGULAR_MATRIX,
  ANGULAR_ORIGIN,
  CSHARP_MATRIX,
  CSHARP_ORIGIN,
  GIT_MATRIX,
  GIT_ORIGIN,
  matrixToPoints,
  TYPESCRIPT_MATRIX,
  TYPESCRIPT_ORIGIN,
} from './technologyLogoMatrices';

const COLS = 34;
const ROWS = 18;
const CX = 16;
const CY = 8;
const LOGO_HOLD = 2600;
const LOGO_CLEAR = 280;
type Point = [number, number];

type Logo = {
  name: string;
  color: string;
  cells: Point[];
};

function inBounds(column: number, row: number) {
  return column >= 0 && column < COLS && row >= 0 && row < ROWS;
}

function unique(points: Point[]) {
  const seen = new Set<string>();

  return points.filter(([column, row]) => {
    const key = `${column},${row}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);

    return true;
  });
}

function traceLine(x0: number, y0: number, x1: number, y1: number): Point[] {
  const steps = Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 4);
  const points: Point[] = [];

  for (let index = 0; index <= steps; index += 1) {
    const progress = index / steps;
    const column = Math.round(x0 + progress * (x1 - x0));
    const row = Math.round(y0 + progress * (y1 - y0));
    
    if (inBounds(column, row)) {
        points.push([column, row]);
      }
  }

  return points;
}

function traceEllipse(cx: number, cy: number, a: number, b: number, angle: number): Point[] {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  const points: Point[] = [];

  for (let index = 0; index < 500; index += 1) {
    const theta = (index / 500) * Math.PI * 2;
    const localX = a * Math.cos(theta);
    const localY = b * Math.sin(theta);
    const column = Math.round(cx + localX * cosine - localY * sine);
    const row = Math.round(cy + localX * sine + localY * cosine);
    
    if (inBounds(column, row)) {
      points.push([column, row]);
    }
  }

  return points;
}

function traceHexagon(cx: number, cy: number, radiusX: number, radiusY: number): Point[] {
  const points: Point[] = [];

  for (let side = 0; side < 6; side += 1) {
    const start = (side / 6) * Math.PI * 2;
    const end = ((side + 1) / 6) * Math.PI * 2;
    points.push(
      ...traceLine(
        cx + radiusX * Math.cos(start),
        cy + radiusY * Math.sin(start),
        cx + radiusX * Math.cos(end),
        cy + radiusY * Math.sin(end),
      ),
    );
  }

  return points;
}

function traceDot(cx: number, cy: number, radius: number): Point[] {
  const points: Point[] = [];

  for (let columnOffset = -radius; columnOffset <= radius; columnOffset += 1) {
    for (let rowOffset = -radius; rowOffset <= radius; rowOffset += 1) {
      if (columnOffset * columnOffset + rowOffset * rowOffset <= radius * radius) {
        const column = Math.round(cx + columnOffset);
        const row = Math.round(cy + rowOffset);

        if (inBounds(column, row)) {
          points.push([column, row]);
        }
      }
    }
  }

  return points;
}

function merge(...groups: Point[][]) {
  return unique(groups.flat());
}

const LOGOS: Logo[] = [
  {
    name: 'Node.js',
    color: '#539e43',
    cells: merge(traceHexagon(CX, CY, 8, 8), traceHexagon(CX, CY, 6.3, 6.3)),
  },
  {
    name: 'React',
    color: '#61dafb',
    cells: merge(
      traceEllipse(CX, CY, 8, 3, 0),
      traceEllipse(CX, CY, 8, 3, Math.PI / 3),
      traceEllipse(CX, CY, 8, 3, (2 * Math.PI) / 3),
      traceDot(CX, CY, 2),
    ),
  },
  {
    name: 'TypeScript',
    color: '#3178c6',
    cells: matrixToPoints(TYPESCRIPT_MATRIX, TYPESCRIPT_ORIGIN),
  },
  {
    name: 'Git',
    color: '#f05032',
    cells: matrixToPoints(GIT_MATRIX, GIT_ORIGIN),
  },
  {
    name: 'Angular',
    color: '#dd0031',
    cells: matrixToPoints(ANGULAR_MATRIX, ANGULAR_ORIGIN),
  },
  {
    name: 'C#',
    color: '#9b4f96',
    cells: matrixToPoints(CSHARP_MATRIX, CSHARP_ORIGIN),
  },
];

function seededShuffle(points: Point[], seed: number) {
  const shuffled = [...points];
  let value = seed;

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    value = (Math.imul(value, 1664525) + 1013904223) | 0;
    const swapIndex = Math.abs(value) % (index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reduced;
}

export default function AboutTechnologyHero() {
  const reduced = usePrefersReducedMotion();
  const [litCells, setLitCells] = useState<Map<string, number>>(() => {
    if (reduced) {
      return new Map(LOGOS[0].cells.map((point) => [`${point[0]},${point[1]}`, 0]));
    }

    return new Map();
  });
  const [activeColor, setActiveColor] = useState(LOGOS[0].color);
  const [activeName, setActiveName] = useState(LOGOS[0].name);
  const [labelVisible, setLabelVisible] = useState(reduced);
  const timeouts = useRef<number[]>([]);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (reduced) {
      // Skip on the mount run — initial state already matches this branch.
      // Only a live toggle of the OS reduced-motion setting needs a reset.
      if (hasMounted.current) {
        setLitCells(new Map(LOGOS[0].cells.map((point) => [`${point[0]},${point[1]}`, 0])));
        setActiveColor(LOGOS[0].color);
        setActiveName(LOGOS[0].name);
        setLabelVisible(true);
      }

      hasMounted.current = true;

      return;
    }

    hasMounted.current = true;
    let alive = true;
    const schedule = (callback: () => void, delay: number) => {
      const timeout = window.setTimeout(callback, delay);
      timeouts.current.push(timeout);
    };

    const activate = (index: number) => {
      if (!alive) {
        return;
      }

      const logo = LOGOS[index % LOGOS.length];
      const shuffled = seededShuffle(logo.cells, index * 7919 + 1234);
      setLitCells(new Map());
      setLabelVisible(false);

      schedule(() => {
        if (!alive) {
          return;
        }

        const nextCells = new Map<string, number>();
        shuffled.forEach(([column, row], cellIndex) => {
          nextCells.set(`${column},${row}`, cellIndex * 5);
        });
        setLitCells(nextCells);
        setActiveColor(logo.color);
        setActiveName(logo.name);
        schedule(() => {
          if (alive) {
            setLabelVisible(true);
          }
        }, 300);
      }, LOGO_CLEAR);

      schedule(() => activate(index + 1), LOGO_CLEAR + shuffled.length * 5 + 300 + LOGO_HOLD);
    };

    activate(0);

    return () => {
      alive = false;
      timeouts.current.forEach((timeout) => window.clearTimeout(timeout));
      timeouts.current = [];
    };
  }, [reduced]);

  const cells = Array.from({ length: COLS * ROWS }, (_, index) => {
    const column = index % COLS;
    const row = Math.floor(index / COLS);

    return { column, row, key: `${column},${row}` };
  });

  return (
    <section
      className="relative isolate overflow-hidden bg-slate-950 text-white"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }}
      aria-labelledby="about-hero-heading"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_50%,rgba(37,99,235,0.16),transparent_36%)]" />
      <div className="mx-auto grid min-h-[30rem] max-w-7xl grid-cols-1 items-center gap-8 px-6 py-14 sm:px-8 sm:py-16 md:min-h-[34rem] md:grid-cols-2 md:gap-12 lg:px-12">
        <div className="order-2 max-w-xl md:order-1">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-blue-300">/ about-alan_barnes</p>
          <h1 id="about-hero-heading" className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            About Me
          </h1>
          <div className="mb-7 h-1 w-20 bg-blue-500" />
          <p className="max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
            From the factory floor to full-stack software — I bring practical problem-solving, technical precision, and a builder&apos;s mindset to every system I create.
          </p>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-slate-500">
            Full-stack engineer · Chicago, IL
          </p>
        </div>

        <div className="order-1 flex min-h-[15rem] items-center justify-center md:order-2 md:min-h-[24rem]" aria-label={`Animated technology logo: ${activeName}`}>
          <div className="relative aspect-[34/18] w-full max-w-xl">
            <div className="absolute inset-0 grid grid-cols-[repeat(34,minmax(0,1fr))] grid-rows-[repeat(18,minmax(0,1fr))] gap-1.5 p-2 sm:gap-2">
              {cells.map(({ column, row, key }) => {
                const delay = litCells.get(key);
                const lit = delay !== undefined;
                
                return (
                  <div
                    key={key}
                    className="rounded-full"
                    style={{
                      backgroundColor: lit ? activeColor : '#162033',
                      opacity: lit ? 0.9 : 0.2,
                      boxShadow: lit ? `0 0 12px 3px ${activeColor}55` : 'none',
                      transition: 'background-color 0.22s ease, opacity 0.22s ease, box-shadow 0.22s ease',
                      transitionDelay: lit ? `${delay}ms` : '0ms',
                    }}
                  />
                );
              })}
            </div>
            <div
              className="absolute right-3 top-0 font-mono text-[11px] uppercase tracking-[0.2em] transition-opacity duration-500 sm:right-4"
              style={{ color: activeColor, opacity: labelVisible ? 1 : 0 }}
              aria-hidden
            >
              {activeName}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}