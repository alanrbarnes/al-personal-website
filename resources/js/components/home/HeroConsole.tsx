import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

const BOOT_LINES = [
  { kind: 'cmd' as const, text: 'whoami' },
  { kind: 'out' as const, text: 'alan_barnes // full-stack engineer' },
  { kind: 'cmd' as const, text: './load_portfolio.sh' },
  { kind: 'out' as const, text: '[OK] profile loaded' },
  { kind: 'out' as const, text: '[OK] powering console_' },
];

const LIGHT_PALETTE = ['#2563EB', '#3b82f6', '#0d9488', '#14b8a6', '#f59e0b'];
const CHAR_MS = 28;
const CMD_MS = 80;
const OUT_MS = 70;
const SCRBL_MS = 720;
const NAME = 'Alan Barnes';
const POOL = 'ABCDEFGHJKLMNPQRSTUVWXabcdefghjklmnpqrstuvwx0123456789!#$@&';

const LIGHTS = Array.from({ length: 380 }, (_, i) => ({
  color: LIGHT_PALETTE[(i * 3 + Math.floor(i / 7)) % LIGHT_PALETTE.length],
  delay: (i * 131) % 3200,
  duration: 1400 + (i * 79) % 2800,
  wide: i % 7 === 0,
  tall: i % 13 === 0,
  glow: i % 11 === 0,
}));

type Phase = 'boot' | 'reveal' | 'done';

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

export default function HeroConsole() {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>(() => (reduced ? 'done' : 'boot'));
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [bootLines, setBootLines] = useState<typeof BOOT_LINES>([]);
  const [typing, setTyping] = useState('');
  const [terminalOpacity, setTerminalOpacity] = useState(reduced ? 0 : 1);
  const [lightsOn, setLightsOn] = useState(reduced);
  const [scrambledName, setScrambledName] = useState(reduced ? NAME : '');
  const [subtitleIn, setSubtitleIn] = useState(reduced);

  const jumpToEnd = useCallback(() => {
    setPhase('done');
    setTerminalOpacity(0);
    setLightsOn(true);
    setBootLines(BOOT_LINES);
    setSequenceIndex(BOOT_LINES.length);
    setScrambledName(NAME);
    setSubtitleIn(true);
  }, []);

  useEffect(() => {
    if (phase === 'done') {
      return;
    }

    const handleKeyDown = () => jumpToEnd();
    window.addEventListener('keydown', handleKeyDown);
    
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, jumpToEnd]);

  useEffect(() => {
    if (phase !== 'boot') {
      return;
    }

    if (sequenceIndex >= BOOT_LINES.length) {
      const transitionTimer = window.setTimeout(() => {
        setTerminalOpacity(0);
        setLightsOn(true);
        window.setTimeout(() => setPhase('reveal'), 260);
      }, 160);
      
      return () => window.clearTimeout(transitionTimer);
    }

    const line = BOOT_LINES[sequenceIndex];

    if (line.kind === 'cmd') {
      let characterIndex = 0;
      const typingTimer = window.setInterval(() => {
        characterIndex += 1;
        setTyping(line.text.slice(0, characterIndex));
        
        if (characterIndex >= line.text.length) {
          window.clearInterval(typingTimer);
          window.setTimeout(() => {
            setBootLines((current) => [...current, line]);
            setTyping('');
            setSequenceIndex((current) => current + 1);
          }, CMD_MS);
        }
      }, CHAR_MS);

      return () => window.clearInterval(typingTimer);
    }

    const outputTimer = window.setTimeout(() => {
      setBootLines((current) => [...current, line]);
      setSequenceIndex((current) => current + 1);
    }, OUT_MS);

    return () => window.clearTimeout(outputTimer);
  }, [phase, sequenceIndex]);

  useEffect(() => {
    if (phase !== 'reveal') {
      return;
    }

    if (reduced) {
      const timer = window.setTimeout(() => {
        setScrambledName(NAME);
        setSubtitleIn(true);
        setPhase('done');
      }, 0);

      return () => window.clearTimeout(timer);
    }

    const characterMs = SCRBL_MS / NAME.length;
    let elapsed = 0;
    const scrambleTimer = window.setInterval(() => {
      elapsed += 40;
      const resolved = Math.min(Math.floor(elapsed / characterMs), NAME.length);
      let output = NAME.slice(0, resolved);
      
      for (let index = resolved; index < NAME.length; index += 1) {
        output += NAME[index] === ' ' ? ' ' : POOL[Math.floor(Math.random() * POOL.length)];
      }
      
      setScrambledName(output);

      if (resolved >= NAME.length) {
        window.clearInterval(scrambleTimer);
        setScrambledName(NAME);
        window.setTimeout(() => {
          setSubtitleIn(true);
          setPhase('done');
        }, 130);
      }
    }, 40);

    return () => window.clearInterval(scrambleTimer);
  }, [phase, reduced]);

  return (
    <section
      className="relative min-h-[calc(100dvh-4rem)] flex flex-col justify-end overflow-hidden bg-slate-950 hero-console-grid"
      style={{ cursor: phase !== 'done' ? 'pointer' : 'default', userSelect: 'none' }}
      onClick={phase !== 'done' ? jumpToEnd : undefined}
      aria-label="Hero introduction — click or press any key to skip animation"
    >
      <style>{`
        @keyframes hero-console-pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.82; }
        }
        @keyframes hero-console-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-console-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .hero-console-grid {
          background-size: 40px 40px;
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
        }
      `}</style>

      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ opacity: lightsOn ? 1 : 0, transition: 'opacity 0.55s ease' }}
        aria-hidden
      >
        <div
          className="grid h-full content-start gap-[10px] overflow-hidden p-4"
          style={{ gridTemplateColumns: 'repeat(auto-fill, 36px)', gridAutoRows: '18px' }}
        >
          {LIGHTS.map((light, index) => (
            <div
              key={index}
              style={{
                width: light.wide ? 82 : 28,
                height: light.tall ? 28 : 13,
                borderRadius: 4,
                gridColumn: light.wide ? 'span 2' : undefined,
                gridRow: light.tall ? 'span 2' : undefined,
                backgroundColor: light.color,
                opacity: 0.1,
                boxShadow: light.glow
                  ? `0 0 10px 3px ${light.color}cc, 0 0 4px 1px ${light.color}`
                  : `0 0 5px 1px ${light.color}80`,
                animationName: 'hero-console-pulse',
                animationDuration: `${light.duration}ms`,
                animationDelay: `${light.delay}ms`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
              }}
            />
          ))}
        </div>
      </div>

      <div
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        style={{ opacity: terminalOpacity, transition: 'opacity 0.4s ease' }}
        aria-hidden
      >
        <div className="w-full max-w-lg px-4 font-mono">
          <div className="overflow-hidden rounded-lg border border-slate-700/50 bg-slate-900 shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-slate-700/50 bg-slate-800 px-4 py-2.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-auto text-[11px] tracking-wide text-slate-500">alan_barnes @ console</span>
            </div>
            <div className="min-h-[130px] space-y-0.5 p-5 text-[13px] leading-relaxed">
              {bootLines.map((line, index) => (
                <div key={`${line.text}-${index}`}>
                  {line.kind === 'cmd' ? (
                    <>
                      <span className="mr-2 text-blue-400">$</span>
                      <span className="text-slate-200">{line.text}</span>
                    </>
                  ) : (
                    <span className="text-teal-400">{line.text}</span>
                  )}
                </div>
              ))}
              {phase === 'boot' && sequenceIndex < BOOT_LINES.length && BOOT_LINES[sequenceIndex].kind === 'cmd' && (
                <div>
                  <span className="mr-2 text-blue-400">$</span>
                  <span className="text-slate-200">{typing}</span>
                  <span
                    className="ml-px inline-block h-[13px] w-[7px] bg-teal-400 align-middle"
                    style={{ animation: 'hero-console-blink 0.75s step-end infinite' }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="hero-content relative z-20 mx-auto w-full max-w-4xl px-6 pb-16 pt-8 text-center"
        style={{
          opacity: phase === 'boot' ? 0 : 1,
          transition: 'opacity 0.15s ease',
          pointerEvents: phase === 'done' ? 'auto' : 'none',
        }}
      >
        <h1 className="mb-6 font-mono text-6xl font-extrabold leading-none tracking-tight text-white sm:text-7xl lg:text-[5.25rem]">
          {scrambledName || (phase !== 'boot' ? NAME : '')}
        </h1>
        <div
          style={{
            opacity: subtitleIn ? 1 : 0,
            transform: subtitleIn ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          <p className="mb-3 text-xl font-semibold text-blue-300 sm:text-2xl">Full-Stack Software Engineer</p>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            .NET Core · C# · Angular · React — building robust web apps &amp; APIs from Chicago, IL
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/portfolio"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-blue-900/50 transition-colors hover:bg-blue-500 active:scale-95"
            >
              View My Work <ArrowRight size={18} />
            </Link>
            <Link
              href="/services"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-8 py-3.5 font-semibold text-slate-300 transition-colors hover:bg-slate-800 active:scale-95"
            >
              Hire Me for a Project
            </Link>
          </div>
        </div>
      </div>

      {phase !== 'done' && !reduced && (
        <div className="absolute inset-x-0 bottom-6 z-30 flex justify-center pointer-events-none" aria-hidden>
          <span
            className="font-mono text-[11px] tracking-widest text-slate-600"
            style={{ animation: 'hero-console-fade-up 0.5s 0.4s both' }}
          >
            press any key or click to skip
          </span>
        </div>
      )}
    </section>
  );
}